import React, { useState } from 'react'
import '../styles/Homepage.css'
import { useNavigate } from 'react-router-dom'


const Homepage = () => {
    const navigate=useNavigate()
  return (
    <div className='main'>
        <h1>Welcome..!</h1>
        <br/>
        <div className='buttons'>
            <button  title='see all the customers' className='button' onClick={()=>navigate('/customers')}> View all customers </button>
        </div>
    </div>
  )
}

export default Homepage