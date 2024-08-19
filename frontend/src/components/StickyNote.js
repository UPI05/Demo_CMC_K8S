import React, { useState } from 'react';

function StickyNote() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    setNotes([...notes, newNote]);
    setNewNote('');
  };

  return (
    <div>
      <h1>Sticky Notes !!!</h1>
      <div>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Thêm</button>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default StickyNote;