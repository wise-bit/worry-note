import { Link } from 'react-router-dom';
import './ProfileStyle.css';

export default function Profile(props) {
  const user = props?.users?.find((user) => user.email === props.current);

  const userIndex = props?.users?.findIndex(
    (user) => user.email === props.current
  );

  // Export all notes data into a file
  const exportData = () => {
    const notes = [];
    if (!user) {
      return [];
    }
    let i = 0;
    while (user.notes[i] !== undefined) {
      notes.push(user.notes[i]);
      i++;
    }
    return notes;
  };

  // Import data from a file
  const importData = (event) => {
    const fileReader = new FileReader();
    try {
      fileReader.readAsText(event.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        const content = JSON.parse(event.target.result);
        const tempNotes = [];

        let error = false;

        // Ensures all fields are present
        content.forEach((note) => {
          if (!(note.id && note.subject && note.content)) {
            error = true;
            return;
          }

          tempNotes.push({
            id: note.id,
            type: note.type,
            subject: note.subject,
            content: note.content,
          });
        });

        if (!props?.users || error) {
          alert('There was an error with the uploaded file format.');
        } else {
          props.users[userIndex].notes = tempNotes;
          props.updateCache();
          alert('Imported data successfully!');
        }
      };
    } catch (err) {
      alert('There was an error with the uploaded file format.');
    }
  };

  return (
    <>
      {user ? (
        <div className='profile-page-container'>
          <img
            src='/icons/user.png'
            height='50'
            width='50'
            alt='default profile icon'
          />

          <h1 className='profile-page-header'>Profile</h1>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <td>{user.firstname}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{user.lastname}</td>
                </tr>
                <tr>
                  <th>Student Number</th>
                  <td>{user.id}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <a
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(exportData())
              )}`}
              download='worrynotedata.json'
            >
              <button style={{ background: '#444', width: '100%' }}>
                Download all notes data
              </button>
            </a>
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: '10px',
              fontWeight: 'bold',
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div>Import data (overwrites current notes)</div>
            <div>
              <input
                type='file'
                onChange={(event) => importData(event)}
                style={{ marginTop: '10px' }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to={'/home'}>
              <button>Home</button>
            </Link>
          </div>
        </div>
      ) : (
        <Link to={'/login'}>Please log in first before viewing this page!</Link>
      )}
    </>
  );
}
