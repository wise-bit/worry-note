import React from 'react';
import { Link } from 'react-router-dom';
import Timer from './Timer';
// CSS
import './NavbarStyle.css';

const Navbar = (props) => {
  const user = props?.users?.find((user) => user.email === props.current);

  return (
    <nav>
      <div style={{ textAlign: 'left', width: '250px' }}>
        <h2 className='navbar-title'>
          <Link to={'/login'}>Worry Note</Link>
        </h2>
        {user && (
          <Link to={'/create'}>
            <button
              className='new-note-button'
              style={{ marginTop: '10px', marginLeft: '0px' }}
            >
              <div className='new-note-button-text'>Create new note</div>
            </button>
          </Link>
        )}
      </div>

      <div
        style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row' }}
      >
        <Timer />
      </div>

      {user ? (
        <div style={{ marginLeft: 'auto', textAlign: 'right', width: '250px' }}>
          <div style={{ fontSize: '20px', textAlign: 'end' }}>
            <Link to={'/profile'}>[{user.firstname}] View profile</Link>
          </div>
          <div style={{ marginTop: '10px' }}>
            <Link to={'/login'} className='logout-button'>
              <button
                className='logout-button-container'
                onClick={() => props.logoutFn()}
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div
          style={{ marginLeft: 'auto', textAlign: 'right', width: '250px' }}
        ></div>
      )}
    </nav>
  );
};
export default Navbar;
