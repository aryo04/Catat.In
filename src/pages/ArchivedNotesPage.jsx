import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';

function ArchivedNotesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const keyword = searchParams.get('keyword') || '';
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    async function fetchArchived() {
      const { error, data } = await getArchivedNotes();
      if (!error && Array.isArray(data)) setNotes(data);
      else setNotes([]);
      setLoading(false);
    }
    fetchArchived();
  }, []);

  const handleKeywordChange = (newKeyword) => setSearchParams({ keyword: newKeyword });

  const handleDelete = async (id) => {
    await deleteNote(id);
    const { error, data } = await getArchivedNotes();
    if (!error && Array.isArray(data)) setNotes(data);
  };

  const handleArchiveToggle = async (id) => {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    if (note.archived) await unarchiveNote(id);
    else await archiveNote(id);

    const { error, data } = await getArchivedNotes();
    if (!error && Array.isArray(data)) setNotes(data);
  };

  const filteredNotes = Array.isArray(notes)
    ? notes.filter(n => n.title.toLowerCase().includes(keyword.toLowerCase()))
    : [];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app-container">
      <Header />
      <main>
        <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Note'}</h2>
        <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
        <NoteList
          notes={filteredNotes}
          onDelete={handleDelete}
          onArchiveToggle={handleArchiveToggle}
        />
      </main>
    </div>
  );
}

export default ArchivedNotesPage;
