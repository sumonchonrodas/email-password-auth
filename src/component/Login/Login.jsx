import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState , useRef } from "react";
import { app } from "../../firebase/firebase.config";
import { Link } from "react-router-dom";



const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const emailRef = useRef()


  const handleSubmit= event =>{
    
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setError('')
    if(!/(?=.*?[A-Z])/.test(password)){
      setError('Please add at least one uppercase.')
      return;
    }
    else if(!/(?=.*?[!@#$%&*])/.test(password)){
      setError('add special character');
      return;
    }
    else if(password.length<6){
      setError('Password should be more than 6 character.')
      return
    }
    signInWithEmailAndPassword(auth,email, password)
    .then((result) => {
      const loggedUser =result.user;
      if(!loggedUser.emailVerified){
      alert('buddy verify your email.')
      }
      console.log(loggedUser);
      setSuccess('log in successful.');
      setError('')
    }).catch((err) => {
      setError(err.message);
    });
} 

const handleResetPassword = (event) =>{
  const email = emailRef.current.value;
  console.log(email);
  if (!email) {
    alert('buddy, add email')
    return;
  }
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert('check your email.')
  }).catch((error) => {
    console.log(error);
    setError(error.message)
  });
}

  return (
    <div className="w-25 mx-auto">
      <p>Please Login</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input ref={emailRef} required placeholder="Give your email" type="email" name='email' className="form-control" id="emailInput" />
        </div>
        <div className="mb-3">
          <input required placeholder="Give your password" type="password" name='password' className="form-control" id="passwordInput" />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p><small>Forget password! <button onClick={handleResetPassword} className="btn btn-link">Reset password</button></small></p>
      <p><small>New to this website? please <Link to='/register'>Register</Link></small></p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};



export default Login;
