import React, { useState ,useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate ,Link} from 'react-router-dom';
import axios from "axios";
import "./style.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login,isAuth}=useContext(AuthContext)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
try {
  const data=await axios.post('https://tbs-ye6x.onrender.com/auth/login',{email,password},config);
  localStorage.setItem("user",JSON.stringify(data.data))
  alert("Login Sucess")
  login()
} catch (error) {
  alert(error.message)
}
  
    
  };
  if(isAuth){
    return <Navigate to='/'  />
  }
  return (
   <>
   <h1 className='Heading'>Login</h1>
    <form onSubmit={handleSubmit} className='authForm' >
      <label>
        Email:
        <input type="email" value={email} placeholder='Enter Email' onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} placeholder='Enter Password' onChange={handlePasswordChange} />
      </label>
      <button type="submit">Login</button>
      <Link to="/register"><button>If You are not Registered</button></Link>
    </form>
   </>
  );
};

export default Login;
