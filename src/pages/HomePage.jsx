import React, { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    async function fetchNotes() {
      const { error, data } = await getActiveNotes();
      if (!error && Array.isArray(data)) setNotes(data);
      setLoading(false);
    }
    fetchNotes();
  }, []);

  const handleKeywordChange = (keyword) => setSearchParams({ keyword });

  const filtered = Array.isArray(notes)
    ? notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()))
    : [];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app-container">
      <Header />
      <main>
        <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
        <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
        <NoteList notes={filtered} />
      </main>
      <Link to="/notes/new" className="floating-add-button">➕</Link>
    </div>
  );
}

export default HomePage;
