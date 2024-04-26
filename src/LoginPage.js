import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {app} from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);


  let navigate = useNavigate();
  const auth = getAuth(app);
  useEffect(() => {
    localStorage.setItem('loginStatus', loginStatus);
    console.log("Login status changed:", loginStatus);

    if (loginStatus) {
      navigate('/')
      // Navigate to another page or perform additional actions after login
    }
  }, [loginStatus, navigate]); // This effect depends on `loginStatus` and runs after it changes.


  const onSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user, 'login successful');
        setLoginStatus(true);
        console.log(loginStatus);

        // 
        // Additional actions after successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('LOGIN FAILED!',errorCode, errorMessage);
        // Handle error state or display error message to the user
      }); 
  }

  return (
  <div className='h-screen flex items-center justify-center'>
  <div className='w-full max-w-md'>
   <form onSubmit={onSubmit}
   className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
       
      <div className='mb-4'>
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email Address </label>
      <input 
      type="email" 
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue focus:shadow-outline'
      placeholder="Email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='mb-6'>
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password</label>
      <input 
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue focus:shadow-outline'
      type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="flex items-center justify-between">
      <Link to={'/signup'} type="submit"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign Up</Link>
      <button type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >Log In</button>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs mt-6">
    &copy;2024 HOTERU <br/>All rights reserved.
    </p>
  </div>
  </div>

   
  );
};

export default LoginPage;