// Libraries
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// Components
import Card from './Card';
// Styling
import './HomeStyle.css';

export default function Home(props) {
  const user = props?.users?.find((user) => user.email === props.current);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState(0);

  // Note filtering function for search functionality
  const filteredNotes = user?.notes.filter((note) => {
    return (
      (searchType === 0 || note.type === searchType) &&
      (note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Button to reset the search bar
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Rendered content
  return (
    <>
      {user ? (
        <div style={{ marginBottom: '30px' }}>
          <div style={{ marginBottom: '30px', width: '545px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                id='search-text-field'
                variant='outlined'
                fullWidth
                label='Type here to search'
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '-15px',
              }}
            >
              <FormControl size='small'>
                <InputLabel id='select-small'>Category</InputLabel>
                <Select
                  value={searchType}
                  label='Category'
                  onChange={(event) => setSearchType(event.target.value)}
                  style={{ width: '160px' }}
                >
                  <MenuItem value={0}>All Categories</MenuItem>
                  <MenuItem value={1}>Category 1</MenuItem>
                  <MenuItem value={2}>Category 2</MenuItem>
                  <MenuItem value={3}>Category 3</MenuItem>
                  <MenuItem value={4}>Category 4</MenuItem>
                </Select>
              </FormControl>
              <div
                className='search-button-container'
                style={{ marginTop: '30px' }}
              >
                <span style={{ fontStyle: 'italic' }}>
                  Results filter as you type
                </span>
                <button className='search-button' onClick={() => clearSearch()}>
                  Clear Search
                </button>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to={'/subjects'}>
              <button style={{ background: '#444', width: '200px' }}>
                View subject list
              </button>
            </Link>
          </div>

          {/* Cards */}
          <Card cards={filteredNotes} key={filteredNotes} />
          {filteredNotes.length === 0 && (
            <div className='no-notes-error'>
              No available notes, try creating a new one!
            </div>
          )}
        </div>
      ) : (
        <Link to={'/login'}>Please log in first before viewing this page!</Link>
      )}
    </>
  );
}
