import { Link, useNavigate, useParams } from 'react-router-dom';
import './CreateNoteStyle.css';

export default function ViewNote(props) {
  const navigate = useNavigate();
  const { index } = useParams();

  const user = props?.users?.find((user) => user.email === props.current);
  const note = user?.notes[index];

  const userIndex = props?.users?.findIndex(
    (user) => user.email === props.current
  );

  const noteDeleteHandler = () => {
    let success = false;

    if (index > -1 && props.users[userIndex].notes.length - 1 >= index) {
      props.users[userIndex].notes.splice(index, 1);
      props.updateCache();
      success = true;
    }
    if (success) {
      alert('Note successfully deleted!');
      navigate('/home');
    } else {
      alert('Unable to delete note, please try again!');
    }
  };

  return (
    <>
      {note ? (
        <div style={{ width: '500px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'start',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ marginTop: '10px', fontSize: '24px' }}>
              Subject: {note.subject}
            </div>
            <div style={{ marginTop: '12px' }}>
              <button
                style={{
                  border: 'solid 2px #c94141',
                  background: '#FFF',
                  color: '#c94141',
                  padding: '5px',
                }}
                onClick={() => noteDeleteHandler()}
              >
                Delete Note
              </button>
            </div>
          </div>
          <div
            style={{
              marginTop: '50px',
              fontSize: '18px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {note.content}
          </div>
          <div style={{ fontStyle: 'italic', marginTop: '100px' }}>
            If you wish to modify the contents, please create a new note with
            the added content and delete this one if you wish!
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to={'/home'}>
              <button>Home</button>
            </Link>
          </div>
        </div>
      ) : (
        <Link to={'/home'}>This note does not exist, return to home page.</Link>
      )}
    </>
  );
}
