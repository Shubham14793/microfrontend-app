import React, { useState, useEffect } from 'react';

import { login, useLoggedIn } from './cart';

export default function Login () {
  const loggedIn = useLoggedIn();
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("sally");
  const [password, setPassword] = useState("123");

  if (loggedIn)
    return null;

  return (
    <>
      <span onClick={() => setShowLogin(!showLogin)}>
        <i className='ri-fingerprint-line text-2xl' id='showLogin'></i>
      </span>
      {
        showLogin && (
          <div
            className='absolute bg-green-500 p-5 border-4 border-blue-800'
            style={{
              width: 300,
              top: "2rem",
              left: -250,
            }}
          >
            <input
              type='text'
              placeholder='user name'
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              className='border text-sm border-grey-400 p-2 round-md w-full text-black'
            />
            <input
              type='text'
              placeholder='password'
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className='border text-sm border-grey-400 p-2 round-md w-full text-black'
            />
            <button
              className='bg-green-900 text-white py-2 px-5 round-md w-full'
              onClick={() => login(username, password)}
              id='loginbtn'
            >
              Login
            </button>
          </div>
        )
      }
    </>
  );
};
