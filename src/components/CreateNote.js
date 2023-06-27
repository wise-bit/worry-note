import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateNoteStyle.css';

export default function CreateNote(props) {
  const user = props?.users?.find((user) => user.email === props.current);

  const userIndex = props?.users?.findIndex(
    (user) => user.email === props.current
  );

  // Index for the new note being created
  const noteIndex = user?.notes?.length;

  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteType, setNoteType] = useState(0);

  // Add new note to for logged in user
  const addNewNote = () => {
    if (props?.users[userIndex]?.notes && noteIndex !== undefined) {
      props.users[userIndex].notes.push({
        id: (user.notes[noteIndex - 1]?.id ?? 0) + 1,
        type: noteType,
        subject: noteTitle,
        content: noteContent,
      });
      props.updateCache();
      alert('New note created!');
    } else {
      alert('Could not create new note, please try again!');
    }
  };

  return (
    <>
      <div className='create-note-page-container'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 className='profile-page-header'>Create New Note</h1>
          <FormControl size='small'>
            <InputLabel id='select-small'>Category</InputLabel>
            <Select
              value={noteType}
              label='Category'
              onChange={(event) => setNoteType(event.target.value)}
              style={{ width: '180px' }}
            >
              <MenuItem value={0}>No Category</MenuItem>
              <MenuItem value={1}>Category 1</MenuItem>
              <MenuItem value={2}>Category 2</MenuItem>
              <MenuItem value={3}>Category 3</MenuItem>
              <MenuItem value={4}>Category 4</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='create-note-page'>
          {/* Text area size */}

          <textarea
            id='createnotetitle'
            name='createnotetitle'
            rows='2'
            placeholder='Note title...'
            style={{
              outline: '20px',
              borderWidth: '2px',
              padding: '10px',
              borderRadius: '10px',
            }}
            onChange={(event) => setNoteTitle(event.target.value)}
          />

          <textarea
            id='createnote'
            name='createnote'
            rows='15'
            placeholder='Start typing...'
            style={{
              outline: '20px',
              borderWidth: '2px',
              padding: '10px',
              borderRadius: '10px',
            }}
            onChange={(event) => setNoteContent(event.target.value)}
          />

          {/* Submission button */}
          <Link to={'/home'}>
            <button
              className='new-note-submit'
              onClick={() => addNewNote()}
              style={{ background: '#232323', width: '400px' }}
            >
              Create
            </button>
          </Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to={'/home'}>
            <button>Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}
