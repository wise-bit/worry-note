import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupStyle.css';

export default function Signup(props) {
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fNameInput, setfNameInput] = useState('');
  const [lNameInput, setlNameInput] = useState('');
  const [studentIdInput, setStudentIdInput] = useState('');

  const callSignup = () => {
    // Validate that all fields are filled for the signup form
    if (
      !(
        emailInput &&
        passwordInput &&
        fNameInput &&
        lNameInput &&
        studentIdInput
      )
    ) {
      alert('Please fill out all fields!');
      return;
    }

    // Validate if the email does not already exist
    const validate = props.signupFn({
      email: emailInput,
      password: passwordInput,
      firstname: fNameInput,
      lastname: lNameInput,
      id: studentIdInput,
      notes: [],
    });
    if (validate) {
      setEmailInput('');
      setPasswordInput('');
      setfNameInput('');
      setlNameInput('');
      setStudentIdInput('');
      navigate('/login');
      alert('Account created. Please log in.');
    } else {
      alert('Account already exists!');
    }
  };

  return (
    <>
      <div className='signup-page-container'>
        <h1 className='profile-page-header'>Sign-up</h1>

        <div className='signup-form-container'>
          <form>
            <label>
              <div>Email</div>
              <div className='signup-input'>
                <input
                  type='text'
                  name='name'
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                />
              </div>
              <div>Password</div>
              <div className='signup-input'>
                <input
                  type='text'
                  name='name'
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                />
              </div>
              <div>First name</div>
              <div className='signup-input'>
                <input
                  type='text'
                  name='name'
                  value={fNameInput}
                  onChange={(event) => setfNameInput(event.target.value)}
                />
              </div>
              <div>Last name</div>
              <div className='signup-input'>
                <input
                  type='text'
                  name='name'
                  value={lNameInput}
                  onChange={(event) => setlNameInput(event.target.value)}
                />
              </div>
              <div>Student ID</div>
              <div className='signup-input'>
                <input
                  type='text'
                  name='name'
                  value={studentIdInput}
                  onChange={(event) => setStudentIdInput(event.target.value)}
                />
              </div>
            </label>
          </form>
          <div className='signup-submit-container'>
            <button className='signup-submit' onClick={() => callSignup()}>
              <div className='signup-submit-container'>Submit</div>
            </button>
          </div>
          <div className='signup-button-container'>
            <Link to={'/login'} className='signup-button'>
              Log in instead
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
