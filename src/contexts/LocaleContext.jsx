import React, { createContext, useState } from 'react';

export const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

  const toggleLocale = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
