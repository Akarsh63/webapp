import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Bookingpage from '../components/Bookingpage'
import Detailspage from '../components/Detailspage'
import axios from 'axios';
import { useCookies } from 'react-cookie';
export default function Formsumission({accomodation}) {

  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  useEffect(()=>{if(!cookies.access_token){navigate('/')}})
  const savedCheckin = sessionStorage.getItem('checkin');
  const savedCheckout = sessionStorage.getItem('checkout');
  const [page,setpage]=useState(0);
  const [errf,setdisperrf]=useState(false);
  const [maxlim,setmaxlim]=useState(false);
  const [details,setdetails]=useState({Firstname:'',Lastname:'',Email:'',Phonenumber:'',Purpose:'',Address:'',Specialrequest:'',Adults:'1',Meals:'Room Only',Rooms:[],Roomstype:[],Fromdate:savedCheckin,Enddate:savedCheckout})
  const getform=()=>{
      if(page===0){
        return <Detailspage accomodation={accomodation} details ={details} setdetails={setdetails} />
      }
      else{
        return <Bookingpage details ={details} setdetails={setdetails}/>
      }
  }
  const submitHandle=async (e)=>{
      e.preventDefault();
      if (parseInt(details.Adults) < details.Rooms.length){
        setmaxlim(true);
        return;
      }
      else{
        setmaxlim(false);
      }
      if (
        details.Firstname===''||
        details.Lastname==='' ||
        details.Address===''||
        details.Email===''||
        details.Phonenumber===''||
        details.Purpose===''||
        details.Rooms.length===0
        ) {
         setdisperrf(true);
         return;
      }
      else{
        setdisperrf(false);
      }
      if (accomodation===0){
        details.Roomstype=["Double"]
      }
      else if (accomodation===1){
        details.Roomstype=["Single"]
      }
      else if (accomodation===2){
        details.Roomstype=["Deluxe"]
      }
      try{
        const result = await axios.post('http://localhost:8082/bookings/book', {details}, {
  headers: {
    'x-token': cookies.access_token
  }
});

        navigate('/Bookings')
      }
      catch(err){
        alert(err);
      }
  
  }

  return (
    <div className='searchresultcont'>
      <div>
            <p className='avaibile'>Check Avaibility!</p>
      </div>
      <div className='searchresultsinfo'>
        <p>Checkin: {savedCheckin}</p>
        <p>Checkout: {savedCheckout}</p>
        <button onClick={() => navigate('/booknow')}>Change Search</button>
      </div>
      <div className='searchresultsdesc'>
        {getform()}
        <div>
            <p style={{color:'red',display:errf?'block':'none',marginBottom:'20px'}}>Please fill all the required(*) details!</p>
            <p  style={{color:'red',display:maxlim?'block':'none',marginBottom:'20px'}}>Number of Adult cannot exceed number of rooms choosen!</p>
            <button  onClick={()=>{page!==0? setpage((currpage)=>currpage-1):navigate('/booknow/rooms')}} className='acbtn' id="prev">Previous</button>
            <button style={{display:page===1?'none':'inline-block'}} onClick={()=>{setpage((currpage)=>currpage+1)}} className='acbtn'>Next</button>
            <button style={{display:page!==1?'none':'inline-block'}} onClick={submitHandle} className='acbtn'>Book Now!</button>
        </div>
      </div> 
    </div>
  )
}
