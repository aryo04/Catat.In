import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { addNote } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';

function AddNotePage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setLoading(true);
    await addNote({ title, body });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <h2>{locale === 'id' ? 'Tambah Catatan' : 'Add Note'}</h2>
        <form className="add-note-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">
              {locale === 'id' ? 'Judul Catatan' : 'Note Title'}
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">
              {locale === 'id' ? 'Isi Catatan' : 'Note Content'}
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="fab-save" disabled={loading}>
            {loading
              ? locale === 'id' ? 'Menyimpan...' : 'Saving...'
              : '✅'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default AddNotePage;
