const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

const SERVICE_ACCOUNT = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');
const SHEET_ID = process.env.SHEET_ID;

const auth = new GoogleAuth({
  credentials: SERVICE_ACCOUNT,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

exports.handler = async (event) => {
  try {
    const { email, honeypot } = JSON.parse(event.body);
    if (honeypot) return { statusCode: 400, body: 'Spam detected' };

    console.log('📨 New signup:', email);
    console.log('📋 SHEET_ID:', SHEET_ID);
    console.log('👤 Service email:', SERVICE_ACCOUNT?.client_email);

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toISOString(), email]],
      },
    });

    console.log('✅ Appended to sheet:', response.data.updates?.updatedRange);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (err) {
    console.error('❌ Function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        stack: err.stack,
        details: err?.errors || null,
      }),
    };
  }
};
