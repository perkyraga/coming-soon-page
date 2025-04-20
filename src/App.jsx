import React, { useState, useEffect } from 'react';
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import EmailForm from './components/EmailForm';
import styles from './App.module.css';

export default function App() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.body.setAttribute('data-theme', saved);
  }, []);
  
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className={styles.slider}></span>
      </label>

      <h1 className={styles.title}>Coming Soon</h1>
      <p>We’re working hard to launch. Stay tuned!</p>

      <EmailForm />

      <nav className={styles.socials}>
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </nav>
    </div>
  );
}
