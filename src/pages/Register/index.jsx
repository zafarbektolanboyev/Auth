import React, { useRef } from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const rePasswordRef = useRef('');

  function validate() {
    if (usernameRef.current.value.length < 3) {
      alert('Username is not valid');
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = 'red';
      return false;
    }
    if (emailRef.current.value.length < 3) {
      alert('Email is not valid');
      emailRef.current.focus();
      emailRef.current.style.outlineColor = 'red';
      return false;
    }
    if (passwordRef.current.value.length < 3) {
      alert('Password is not valid');
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = 'red';
      return false;
    }
    if (rePasswordRef.current.value.length < 3) {
      alert('Repeat Password is not valid');
      rePasswordRef.current.focus();
      rePasswordRef.current.style.outlineColor = 'red';
      return false;
    }
    if (passwordRef.current.value !== rePasswordRef.current.value) {
      alert("Password and Repeat Password do not match");
      passwordRef.current.value = '';
      passwordRef.current.focus();
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    navigate("/login")
    console.log(user)
    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if(data.message = "User registered successfuly!"){
          alert(data.message)
          navigate("/login")
        }
        if(data.message == "Failed! Username is already in use!"){
            alert(data.message)
            usernameRef.current.focus()
        }
        if(data.message == "Failed! Email is already in use!"){
          alert(data.message)
          emailRef.current.focus()
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <form className={styles.form}>
        <input ref={usernameRef} type="text" placeholder='Username' />
        <input ref={emailRef} type="email" placeholder='Email' />
        <input ref={passwordRef} type="password" placeholder='Password' />
        <input ref={rePasswordRef} type="password" placeholder='Repeat Password' />
        <button onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
}

export default Register;
