import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css'

function Signup() {
  const navigate = useNavigate()
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  function handleSubmit(event){
    event.preventDefault()
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    } 
    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data =>{
        console.log(data)
        if(data.message == "User Not found."){
          alert(data.message)
          return;
        }
        if(data.message == "Invalid Password!"){
          alert(data.message)
          return;
        }
        if(data.accessToken){
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem('token', data.accessToken);
          
          navigate('/Home')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div>
      <form className={styles.form}>
        <input ref={usernameRef} type="text" placeholder='Username' />
        <input ref={passwordRef} type="password" placeholder='Password' />
        <button onClick={handleSubmit}>Register</button>
      </form>
    </div>
  )
}

export default Signup
