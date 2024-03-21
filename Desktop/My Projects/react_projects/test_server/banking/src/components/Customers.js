import React, { useEffect, useState } from 'react'
import '../styles/customers.css'
import 'axios'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Customers() {
  const [customers,setCustomers]=useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getCustomers=(async()=>{
      try{
          const response=await axios.get("http://localhost:8080/api/customers");
          console.log(response.data)
          setCustomers(response.data.message);
          localStorage.clear();
          localStorage.setItem("customers",JSON.stringify(response.data.message));
      }
      catch(err){
        console.log(err);
      }
    })
    getCustomers();
  },[]);

  const handleViewCust=(index)=>{
      localStorage.setItem("userInfo",JSON.stringify(customers[index]))
      navigate(`/viewcustomer`)
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
                      <button onClick={()=>{handleViewCust(index)}}>View Customer</button>
                  </div>
                </div>
        ))
      }
    </div>
  )
}
