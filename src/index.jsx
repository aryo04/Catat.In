import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>
);
