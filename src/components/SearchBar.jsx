import React, { useContext } from 'react';
import { LocaleContext } from '../contexts/LocaleContext';

function SearchBar({ keyword, onKeywordChange }) {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={locale === 'id' ? 'Cari catatan...' : 'Search notes...'}
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
