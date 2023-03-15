import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import '../styles/style.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const navigate =useNavigate()

  const handleSubmit= async (e)=>{
    e.preventDefault()
    const email=e.target[0].value;
    const password=e.target[1].value;
     console.log(email + password)
     try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    }
    catch(err){
      const errorCode = err.code;
      console.log(errorCode)
    }
  }
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Ishak Chat</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email"  placeholder='email'/>
                <input type="password"  placeholder='password'/>
                <button>Sign In</button>
            </form>
            <p>You don't have an account? <Link to='/register'>Register</Link></p>
        </div>
    </div>
  )
}

export default Login