import React from 'react'
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        <h1>Ticket Booking System</h1>
      </div>
      <div className="logo">
      <Link to="/login"><button>Login/Sigin</button></Link>
        
      </div>
    </div>
  )
}

export default Header
