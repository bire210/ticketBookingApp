import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const PayNow = () => {
    const [name,setName]=useState("")
    const [cardNum,setNumber]=useState("")
    const [cvv,setCcv]=useState("")
const handleSubmit=(e)=>{
    e.preventDefault()
    alert("Payment is Done")
   
}

  return (
    <div>
       <div><h1 className="Heading">Fill Payment Details</h1>
      <Link to="/"><button style={{fontSize:"30px",marginLeft:"130px"}}>Home</button></Link>
      </div>
     
    <form onSubmit={handleSubmit} className='authForm' >
      <label>
        Number on Card:
        <input type="password" value={cardNum} placeholder='Enter Card Number' onChange={(e)=>{setNumber(e.target.value)}} />
      </label>
      <label>
        Name of Card CardHolder:
        <input type="Text" value={name} placeholder='Enter Card Holder Name' onChange={(e)=>{setName(e.target.value)}} />
      </label>
      <label>
        cvv:
        <input type="password" value={cvv} placeholder='CVV' onChange={(e)=>{setCcv(e.target.value)}} />
      </label>
      <button type="submit">Pay</button>
      
    </form>
   
    </div>
  )
}

export default PayNow
