import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';    // ← note the .jsx
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);