import React from 'react'
import '../styles/header.css'

export default function Header() {
  return (
    <div className='header'>
        <div className='headertext'>Banking System</div>
        <div>
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/viewtransactions'>View Transactions</a></li>
                <li><a href='/customers'>View Customers</a></li>
            </ul>
        </div>
    </div>
  )
}
