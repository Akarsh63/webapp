import React, { useEffect, useState } from 'react'
import '../styles/customers.css'
import 'axios'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Transactcustomer() {
  const [customers,setCustomers]=useState([]);
  const navigate = useNavigate();
  const sender = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
      if (!sender) {
      navigate('/');
      }
  }, [sender]);

  useEffect(()=>{
    const getCustomers=(async()=>{
      try{
          const response=await axios.get("http://localhost:8080/api/customers");
          console.log(response.data)
          setCustomers(response.data.message);
      }
      catch(err){
        console.log(err);
      }
    })
    const saved_cust=JSON.parse(localStorage.getItem("customers"));
    if(!saved_cust){
    getCustomers();}
    else{
        const all= saved_cust.filter(customer => customer._id !== sender._id);
        setCustomers(all);
    }
  },[]);

  const handletransactCust=(index)=>{
      localStorage.setItem("transactInfo",JSON.stringify(customers[index]))
      navigate('/newtransaction')
  }

  return (
    <div className='view-customers'>
      {
        customers?.map((customer,index)=>(
          <div className='customer' key={index}>
                  <div className='userdetails'>
                      <img src="https://cdn-icons-png.flaticon.com/512/219/219969.png" alt="profile" />
                      <div className='details'>
                          <h3>{customer.username}</h3>
                          <h4>{customer.email}</h4>
                          <h5>Account Balance : {customer.balance}</h5>
                      </div>
                  </div>
                  <div>
                      <button onClick={()=>{handletransactCust(index)}}>Transact Customer</button>
                  </div>
                </div>
        ))
      }
    </div>
  )
}
