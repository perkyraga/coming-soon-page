import React, { useState } from 'react';
import styles from './EmailForm.module.css';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/.netlify/functions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className={styles.thanks}>Thank you for subscribing!</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="email" className={styles.label}>
        Stay in the loop
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
        <input
        type="text"
        name="honeypot"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        />
      <button
        type="submit"
        className={styles.button}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Submitting…' : 'Notify Me'}
      </button>
      {status === 'error' && (
        <p className={styles.error}>{errorMsg}</p>
      )}
    </form>
  );
}
