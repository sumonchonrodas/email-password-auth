import React, { useState } from "react";
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth'
import { app } from "../../firebase/firebase.config";
import { Link } from 'react-router-dom'





const auth = getAuth(app)

const Register = () => {
    const [error,setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) =>{
      // 1. prevent page refresh.
      event.preventDefault();
      setError('')
      setSuccess('')
      //2. collect from data
      const name = event.target.name.value;
      const email = event.target.email.value;
      const password  = event.target.password.value;
      console.log( name, email, password);
      if(!/(?=.*?[A-Z])/.test(password)){
        setError('Please add at least one uppercase.')
        return;
      }
      else if(!/(?=.*?[0-9])/.test(password)){
        setError('please add at least two numbers')
        return;
      }
      else if(!/(?=.*[@#$%&])/.test(password)){
          setError('Plz add a special Character')
      }
      else if(password.length<6){
        setError('please at least 6 charatar password')
        return;
      }
      //3. create user in fb
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const logged = result.user
        console.log(logged)
        setError('')
        event.target.reset()
        setSuccess('You add successfull')
        sentVerificationEmail(logged)
        updateProfile(logged, name)
      })
      .catch((error) => {
        console.error(error.message)
        setError(error.message)
        setSuccess('')
      });

    }

    const sentVerificationEmail = (user)=>{
          sendEmailVerification(user)
          .then((result) => {
            console.log(result);
            alert('plz verify your email')
          })
    }

    const handleEmailChange = (event) =>{
        // console.log(event.target.value);
        // setEmail(event.target.value)
    }
  
    const handlePassword = (event) =>{
      // console.log(event.target.value);
    }

    const updateUserData =(user, name) =>{ 
      updateProfile(user, {
        displayName: name
      })
      .then(() => {
        console.log('user name update')
      }).catch((err) => {
        console.log(err);
      });


    }
  return (
    <div className="w-50 mx-auto">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input required className="w- mb-4 rounded ps-2" type="text" name="name" id="name" placeholder="Your email" /> <br />
        <input required className="w- mb-4 rounded ps-2" onChange={handleEmailChange} type="email" name="email" id="email" placeholder="Your email" /> <br />
        <input required className="w- mb-4 rounded ps-2" onBlur={handlePassword} type="password" name="password" id="password" placeholder="Your password" /> <br />
        <input className="btn btn-danger" type="submit" value="Register" />
      </form>
      <p><small>All ready have an acount? please <Link to='/login'>log In</Link> </small></p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Register;
