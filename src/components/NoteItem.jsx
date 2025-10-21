import React from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';

function NoteItem({ note }) {
  return (
    <div className="note-item" style={{ borderTopColor: note.archived ? '#03DAC6' : '#BB86FC' }}>
      <h3 className="note-item__title">{note.title}</h3>
      <p className="note-item__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="note-item__body">{parser(note.body)}</div>
      <div className="note-item__action">
        <Link to={`/notes/${note.id}`}>
          <button className="action">🔍</button>
        </Link>
      </div>
    </div>
  );
}

export default NoteItem;