import React from 'react';
import '../styles/style.scss'
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth , db, storage} from '../firebase';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate =useNavigate()

  const handleSubmit= async (e)=>{
    e.preventDefault()
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];

 
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password)
     

      const storageRef = ref(storage,  res.user.uid);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
         
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
          console.log(error)
        }, 
        () => {
        
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
           await updateProfile(res.user,{
            displayName,
            photoURL:downloadURL,
           });
           await setDoc(doc(db, 'users', res.user.uid),{
            uid:res.user.uid,
            displayName,
            email,
            photoURL:downloadURL,
           })
           await setDoc(doc(db,'userChats',res.user.uid),{});
           navigate('/')
          });
        }
      );


     
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
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text"  placeholder='display name' />
                <input type="email"  placeholder='email'/>
                <input type="password"  placeholder='password'/>
                <input style={{display:'none'}} type="file" id='file'/>
                <label htmlFor="file"><i className="fas fa-image" aria-hidden="true"></i>add an Avatar</label>

                <button>Sign up</button>
            </form>
            <p>You do have an account? <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register