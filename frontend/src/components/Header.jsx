import React from 'react'
import { Link } from "react-router-dom";
const Header = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className='navbar'>
      <div className="logo">
        <h1>Ticket Booking System</h1>
      </div>
    
      <div className="logo">
        {
         user?<h2>{user.name}</h2>: <Link to="/login"><button>Login/Sigin</button></Link>
        }
      
     
      </div>
    </div>
  )
}

export default Header
