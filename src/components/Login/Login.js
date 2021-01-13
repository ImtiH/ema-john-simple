import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, resetPassword, signInWithEmailAndPassword } from './loginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const GoogleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        //   setUser(res);
        //   setLoggedInUser(res);
        //   history.replace(from); //to take you to the shipment page after successfully signed in
        handleResponse(res, true);
     
      })
 }

  const FbSignIn = () => {
    handleFbSignIn()
    .then(res => {
    //   setUser(res);
    //   setLoggedInUser(res);
    //   history.replace(from);
        handleResponse(res,true);
     })
    }

  const signOut = () => {
      handleSignOut()
      .then(res => {
        //   setUser(res);
        //   setLoggedInUser(res);
        handleResponse(res,false);
      })
  }

  const handleResponse = (res,redirect) => {
      //creating this function for these 3 repeating statements
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }

  

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email,user.password)
      .then(res => {
        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
        handleResponse(res, true);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res => {
        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
        handleResponse(res, true);
      })
    }

    e.preventDefault();
  }



  return (
    <div style={{textAlign: 'center' }}>
      {/* { user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : */}
      { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        // <button onClick={handleGoogleSignIn}>Sign In</button>
        <button onClick={GoogleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={FbSignIn}>Sign in using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/> 
      </form>
      <button onClick = {() => resetPassword(user.email)}>Reset Pasword</button>
      <p style={{color: 'red'}}>{user.error}</p>
      { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}
export default Login;