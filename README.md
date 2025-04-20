# ⚡ Coming Soon Landing Page – React + Vite + Netlify + Google Sheets + Twilio

A fully functional “Coming Soon” website that collects user emails, stores them in Google Sheets, and sends WhatsApp/SMS notifications using Twilio — all deployed via Netlify.

---

## 🚀 Features

- 🎨 Responsive design with dark mode toggle
- 📬 Email submission form with honeypot spam filter
- 📊 Emails stored in Google Sheets via Netlify Functions
- 📲 WhatsApp / SMS notifications using Twilio
- 🎉 Confetti animation and toast notification on success
- ⚡ Deployed with Netlify
- 🧪 Easy to extend with marketing tools or CRM integrations

---

## 🔧 Tech Stack

- React + Vite
- CSS Modules
- Netlify Functions
- Google Sheets API (via service account)
- Twilio API (for WhatsApp/SMS)
- react-toastify
- react-confetti

---

## 🛠 Project Structure

📁 src/ 
├── App.jsx # Main UI structure and toggle logic 
├── index.js # Entry point 
├── components/ │ └── EmailForm.jsx # Email input, submission, confetti + toast │ 
📁 netlify/functions/
    └── submit.js # Handles form data → Google Sheets → Twilio


---

## 🧪 Local Setup

bash
# Install dependencies
npm install

# Start dev server
npm run dev

🌐 Deploy Instructions
Connect repo to Netlify

Add Environment Variables in Netlify:

ini
Copy
Edit
GOOGLE_SERVICE_ACCOUNT  = {...minified JSON key with escaped \n...}
SHEET_ID                = your-google-sheet-id
TWILIO_ACCOUNT_SID      = ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN       = your-token
TWILIO_PHONE_FROM       = whatsapp:+14155xxx  # Twilio sandbox
TWILIO_PHONE_TO         = whatsapp:+91xxxxxxxxxx # your verified number
Trigger Deploy Site

✅ Credit / Acknowledgements
Built with ❤️ by PerkyRaga
Mentored by ChatGPT 🤖
Twilio sandbox setup: twilio.com/console/sms/whatsapp/learn

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
