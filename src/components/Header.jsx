import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { LocaleContext } from '../contexts/LocaleContext';
import { putAccessToken, getUserLogged } from '../utils/network-data';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const { error, data } = await getUserLogged();
      if (!error) setUser(data);
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    putAccessToken('');
    navigate('/login');
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <h1>
          <Link to="/">
            {locale === 'id' ? 'Catat.in' : 'Note.it'}
          </Link>
        </h1>
      </div>

      <div className="header-right">
        <Link to="/archived" className="header-btn">
          {locale === 'id' ? '📦 Terarsip' : '📦 Archived'}
        </Link>

        <button onClick={toggleLocale} className="header-btn">
          {locale === 'id' ? 'EN' : 'ID'}
        </button>

        <button onClick={toggleTheme} className="header-btn">
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>

        {user && (
          <button onClick={handleLogout} className="user-logout-btn">
            <svg
              fill="none"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H15"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M19 12L15 8M19 12L15 16M19 12H9"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>{user.name}</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
