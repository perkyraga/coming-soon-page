import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './EmailForm.module.css';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    setShowConfetti(false); // reset

    try {
      const res = await fetch('/.netlify/functions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot }),
      });
      if (!res.ok) throw new Error('Network response was not ok');

      setStatus('success');
      setEmail('');
      setShowConfetti(true);
      toast.success('🎉 You’re on the list!');

      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
      toast.error('🚫 Something went wrong.');
    }
  };

  return (
    <>
      <ToastContainer />
      {showConfetti && <Confetti />}

      {status === 'success' ? (
        <p className={styles.thanks}>Thank you for subscribing!</p>
      ) : (
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
      )}
    </>
  );
}
