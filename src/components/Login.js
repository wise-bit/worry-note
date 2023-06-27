import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginStyle.css';

export default function Login(props) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const getCurrentUserName = () => {
    return (
      props?.users?.find((user) => user?.email === props?.current)?.email ?? ''
    );
  };

  // Call login function and process the response it sends back
  const callLogin = () => {
    // Ensure all fields are filled for the login form
    if (!(emailInput && passwordInput)) {
      alert('Please fill out all fields!');
      return;
    }
    // Get response from login function for success
    const resp = props.loginFn({ email: emailInput, password: passwordInput });
    if (resp) {
      setEmailInput('');
      setPasswordInput('');
    } else {
      // If login fails
      alert('Invalid credentials, please try again!');
    }
  };

  return (
    <>
      <div className='login-page-container'>
        <div className='temp-buttons-container' style={{ textAlign: 'center' }}>
          <Link to={'/home'} style={{ margin: '20px' }}>
            <img src='/icons/home.png' height='50' width='50' alt='home icon' />
          </Link>
          <Link to={'/profile'}>
            <img
              src='/icons/user.png'
              height='50'
              width='50'
              alt='user profile icon'
            />
          </Link>
          <div
            style={{
              fontStyle: 'italic',
              marginBottom: '30px',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            Please ensure you have cache enabled for data persistence between
            sessions.
          </div>
        </div>

        {!props.current ? (
          <div className='login-form-container'>
            <h1 className='profile-page-header'>Login</h1>
            <div style={{ fontStyle: 'italic', marginBottom: '30px' }}>
              Please enter credentials <b>[admin@worrynote.com]</b> and{' '}
              <b>[testpassword]</b> for testing purposes.
            </div>
            <form>
              <label>
                <div>Email</div>
                <div className='login-input'>
                  <input
                    type='text'
                    name='name'
                    value={emailInput}
                    onChange={(event) => setEmailInput(event.target.value)}
                  />
                </div>
                <div>Password</div>
                <div className='login-input'>
                  <input
                    type='password'
                    name='name'
                    value={passwordInput}
                    onChange={(event) => setPasswordInput(event.target.value)}
                  />
                </div>
              </label>
            </form>
            <div className='login-submit-container'>
              <button className='login-submit' onClick={() => callLogin()}>
                Login
              </button>
            </div>
            <div className='signup-button-container'>
              <Link to={'/signup'} className='signup-button'>
                Sign up for a new account
              </Link>
            </div>
          </div>
        ) : (
          <div
            style={{ textAlign: 'center', fontSize: '24px', marginTop: '20px' }}
          >
            Welcome! You are currently logged in as: <br />
            <b>{getCurrentUserName()}</b>
            <div style={{ marginTop: '30px' }}>
              <Link to={'/home'}>
                <button
                  style={{
                    marginTop: '10px',
                    marginLeft: '0px',
                    fontWeight: 'bold',
                  }}
                >
                  <div className='new-note-button-text'>View your notes!</div>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
