// Styling
import './App.css';
// Libraries
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useMediaQuery } from 'react-responsive';
// Components
import Navbar from './Navigation/Navbar';
import Home from './components/Home.js';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateNote from './components/CreateNote';
import ViewNote from './components/ViewNote';
import SubjectList from './components/SubjectList';

function App() {
  // Keep track of all users
  const [users, setUsers] = useState(() => {
    const cachedUsers = localStorage.getItem('WorryNoteLocalCacheV01');
    const allUsers = JSON.parse(cachedUsers);

    return (
      allUsers ?? [
        {
          email: 'admin@worrynote.com',
          password: 'testpassword',
          firstname: 'Joan',
          lastname: 'Doe',
          id: '123456789',
          notes: [
            {
              id: 1,
              subject: 'First Test',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec urna sed mi eleifend aliquet eu eget odio. Vestibulum in justo urna. Etiam dui erat, laoreet in mattis in, elementum consectetur elit. Donec in leo ut mauris aliquam interdum. Donec dignissim, lectus eget tristique rhoncus, sem risus tempus odio, tempus bibendum nulla tortor eu mauris.',
            },
            {
              id: 2,
              type: 2,
              subject: 'Second Test',
              content:
                'Nunc non neque id lacus imperdiet mattis. Nam id nunc malesuada felis rhoncus tincidunt id at ligula. Aenean tincidunt dignissim nunc sed tincidunt. Phasellus quis lorem metus. Pellentesque et eleifend justo. Maecenas nulla tellus, pharetra ac tortor quis, placerat iaculis urna.',
            },
            {
              id: 3,
              type: 4,
              subject: 'Third Test',
              content:
                'In placerat justo justo, eget laoreet dui tempor eu. Fusce dignissim porttitor quam, a dignissim magna sodales eget. Pellentesque vulputate iaculis imperdiet. Nunc porta odio sit amet enim rutrum, et tempus ante pharetra.',
            },
            {
              id: 4,
              type: 4,
              subject: 'Fourth Test',
              content:
                'Et odio pellentesque diam volutpat commodo. Hendrerit gravida rutrum quisque non tellus orci. Hendrerit gravida rutrum quisque non tellus orci. Netus et malesuada fames ac turpis egestas. Volutpat diam ut venenatis tellus in. Urna neque viverra justo nec ultrices dui sapien. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nam libero justo laoreet sit amet cursus sit. Sit amet porttitor eget dolor. Nulla malesuada pellentesque elit eget gravida cum. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. At varius vel pharetra vel turpis nunc eget. Ornare massa eget egestas purus. Feugiat sed lectus vestibulum mattis ullamcorper. Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Varius vel pharetra vel turpis nunc eget. Malesuada nunc vel risus commodo. Non blandit massa enim nec dui nunc mattis. Nulla posuere sollicitudin aliquam ultrices sagittis. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a.',
            },
            {
              id: 5,
              type: 3,
              subject: 'Fifth Test',
              content: 'Sample note',
            },
            {
              id: 6,
              type: 1,
              subject: 'Sixth Test',
              content:
                'In fermentum posuere urna nec tincidunt praesent semper. Fusce id velit ut tortor pretium. Cursus in hac habitasse platea. Nam at lectus urna duis convallis convallis tellus. Sit amet aliquam id diam maecenas ultricies mi eget mauris. Tellus id interdum velit laoreet id donec. Pulvinar pellentesque habitant morbi tristique senectus. Nullam non nisi est sit amet facilisis magna. Mauris commodo quis imperdiet massa. Et tortor at risus viverra adipiscing at in. Volutpat est velit egestas dui id ornare arcu. Lectus sit amet est placerat in egestas erat. Sapien eget mi proin sed libero enim sed faucibus turpis. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Orci phasellus egestas tellus rutrum tellus pellentesque. Lacus vestibulum sed arcu non odio euismod. Sit amet consectetur adipiscing elit ut aliquam purus. Commodo nulla facilisi nullam vehicula ipsum.',
            },
          ],
        },
        {
          email: 'sat@worrynote.com',
          password: 'testpassword',
          firstname: 'Satrajit',
          lastname: 'Chatterjee',
          id: '123456789',
          notes: [
            {
              id: 1,
              subject: 'Sample Note For Sat',
              content: 'Sample Note pog',
            },
          ],
        },
        {
          email: 'tilak@worrynote.com',
          password: 'testpassword',
          firstname: 'Tilak',
          lastname: 'Shah',
          id: '123456789',
          notes: [
            {
              id: 1,
              subject: 'Sample Note For Tilak',
              content: 'Sample Note pog',
            },
          ],
        },
      ]
    );
  });

  // Keeps track of user that is logged in
  const [currentUser, setCurrentUser] = useState(() => {
    const cachedCurrentUser = localStorage.getItem(
      'WorryNoteLocalCacheCurrentUserV01'
    );
    return cachedCurrentUser ?? '';
  });

  // eslint-disable-next-line
  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };

  // Add a new user to the list of existing users
  const updateUsersList = (user) => {
    let success = true;
    users.forEach((currentUsers) => {
      if (currentUsers.email === user.email) {
        success = false;
      }
    });
    if (success) {
      setUsers([...users, user]);
    }
    return success;
  };

  // Set current user if credentials match
  const loginUser = (creds) => {
    let success = false;
    users.forEach((user) => {
      if (user.email === creds.email && user.password === creds.password) {
        setCurrentUser(user.email);
        // successful login
        success = true;
      }
    });
    // unsuccessful login
    return success;
  };

  // Set current user to blank
  const logoutUser = () => {
    setCurrentUser('');
  };

  // Manually trigger a cache update
  const updateCache = () => {
    console.log('manually updating cache');
    localStorage.setItem('WorryNoteLocalCacheV01', JSON.stringify(users));
    localStorage.setItem('WorryNoteLocalCacheCurrentUserV01', currentUser);
  };

  // Add minor cacheing in case user refreshes page and wants to login again
  // Since no formal database has been currently added
  useEffect(() => {
    localStorage.setItem('WorryNoteLocalCacheV01', JSON.stringify(users));
  }, [users]);

  // Add cacheing for current user to ensure the user is logged in even if they refresh
  useEffect(() => {
    localStorage.setItem('WorryNoteLocalCacheCurrentUserV01', currentUser);
  }, [currentUser]);

  return (
    <>
      <Router>
        <Navbar users={users} current={currentUser} logoutFn={logoutUser} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px',
            marginTop: '40px',
          }}
        >
          <Routes>
            <Route
              path='/'
              element={
                <Login
                  users={users}
                  current={currentUser}
                  loginFn={loginUser}
                />
              }
            />
            <Route
              path='/home'
              element={<Home users={users} current={currentUser} />}
            />
            <Route
              path='/login'
              element={
                <Login
                  users={users}
                  current={currentUser}
                  loginFn={loginUser}
                />
              }
            />
            <Route
              path='/signup'
              element={<Signup signupFn={updateUsersList} />}
            />
            <Route
              path='/profile'
              element={
                <Profile
                  users={users}
                  current={currentUser}
                  updateCache={updateCache}
                />
              }
            />
            <Route
              path='/create'
              element={
                <CreateNote
                  users={users}
                  current={currentUser}
                  updateCache={updateCache}
                />
              }
            />
            <Route
              path='/view/:index'
              element={
                <ViewNote
                  users={users}
                  current={currentUser}
                  updateCache={updateCache}
                />
              }
            />
            <Route
              path='/subjects'
              element={<SubjectList users={users} current={currentUser} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
