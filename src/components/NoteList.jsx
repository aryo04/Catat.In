import React, { useContext } from 'react';
import NoteItem from './NoteItem';
import { LocaleContext } from '../contexts/LocaleContext';

function NoteList({ notes, onDelete, onArchiveToggle }) {
  const { locale } = useContext(LocaleContext);

  if (!notes.length) return (
    <div className="notes-list-empty">
      <p>{locale === 'id' ? 'Tidak ada catatan' : 'No notes available'}</p>
    </div>
  );

  return (
    <div className="notes-list">
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchiveToggle={onArchiveToggle}
        />
      ))}
    </div>
  );
}

export default NoteList;
