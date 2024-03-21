import React, { useEffect } from 'react'
import '../styles/viewcustomer.css'
import { useNavigate } from 'react-router-dom';

export default function Viewcustomer() {
    const navigate=useNavigate()
    const customer = JSON.parse(localStorage.getItem("userInfo"));
    console.log(customer)

    useEffect(() => {
        if (!customer) {
          navigate('/');
        }
    }, [customer]);

    return (
        <div style={{backgroundColor:'silver'}}>
            <div className='viewcustomerinfo'>
                  <div className='imgcont'>
                      <img src="https://cdn-icons-png.flaticon.com/512/219/219969.png" alt="profile" />
                  </div>
                  <div className='details'>
                        <h3>{customer.username}</h3>
                        <h4>{customer.email}</h4>
                  </div>
                  <div className='details-bal'>
                     <h5>Account Balance: {customer.balance}</h5>
                  </div>
                  <div className='details-buts'>
                       <button onClick={()=>{navigate('/')}} className='homebut'>Home</button>
                       <button onClick={()=>{navigate('/selectcustomer')}}>New Transaction</button>
                       <button onClick={()=>{navigate('/viewtransactions')}}>View Transactions</button>
                  </div>
            </div>
        </div>
    )
}
