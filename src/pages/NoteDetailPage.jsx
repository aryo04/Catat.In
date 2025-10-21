import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import Header from '../components/Header';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils';
import { LocaleContext } from '../contexts/LocaleContext';

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    async function fetchNote() {
      const { error, data } = await getNote(id);
      if (!error) setNote(data);
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const handleArchiveToggle = async () => {
    if (!note) return;
    if (note.archived) await unarchiveNote(id);
    else await archiveNote(id);
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (!note) return <p>{locale === 'id' ? 'Catatan tidak ditemukan' : 'No notes found'}</p>;

  return (
    <div className="app-container">
      <Header />
      <main>
        <h2 className="detail-page__title">{note.title}</h2>
        <p className="note-item__createdAt">{showFormattedDate(note.createdAt)}</p>
        <div className="note-item__body">
          {note.body ? parser(note.body) : <i>{locale === 'id' ? 'Tidak ada isi catatan' : 'No notes'}</i>}
        </div>
      </main>

      <div className="note-detail__actions">
        <button className="action" onClick={handleArchiveToggle}>
          {note.archived ? '↩️' : '📥'}
        </button>
        <button className="action delete" onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default NoteDetailPage;
