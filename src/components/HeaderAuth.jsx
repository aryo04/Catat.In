import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LocaleContext } from '../contexts/LocaleContext';

function HeaderAuth() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <header className="auth-header">
      <h1>
        {locale === 'id' ? 'Catat.in' : 'Note.it'}
      </h1>
      <div className="auth-header-actions">
        <button className="toggle-theme" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="toggle-locale" onClick={toggleLocale}>
          {locale === 'id' ? 'EN' : 'ID'}
        </button>
      </div>
    </header>
  );
}

export default HeaderAuth;
