import React, { useEffect, useState } from 'react'
import './detailspage.css'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
export default function Detailspage({accomodation,details,setdetails}) {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  useEffect(()=>{if(!cookies.access_token){navigate('/')}})
  const [roomstoselect,setroomstoselect]=useState([]);
  const unique=accomodation;
  const savedCheckin = sessionStorage.getItem('checkin');
  const savedCheckout = sessionStorage.getItem('checkout');
  const filterroom = async (room) => {
    const detail = await axios.get(`http://localhost:8082/bookings/${room}`, {
      headers: {
        'x-token': cookies.access_token
      }
    });
    const bookingdetails = detail.data.bookingdetail;
    const fromdate = bookingdetails.fromdate;
    const enddate = bookingdetails.enddate;
    const fromDateObj = new Date(fromdate.split('-').reverse().join('-'));
    const endDateObj = new Date(enddate.split('-').reverse().join('-'));
    const savedCheckinObj = new Date(savedCheckin.split('-').reverse().join('-'));
    const savedCheckoutObj = new Date(savedCheckout.split('-').reverse().join('-'));
    if (
      (fromDateObj <= savedCheckoutObj && fromDateObj >= savedCheckinObj) ||
      (endDateObj >= savedCheckinObj && endDateObj <= savedCheckoutObj)||(savedCheckinObj <= endDateObj && savedCheckinObj >= fromDateObj) ||
      (savedCheckoutObj >= fromDateObj && savedCheckoutObj <= endDateObj)
    ) {
      if(bookingdetails.status==="Approved"||bookingdetails.status==="Pending"){return true;}
      else{
        return false;
      }
    } else {
      console.log("no");
      return false;
  };
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allrooms = await axios.get("http://localhost:8082/rooms/allrooms", {
          headers: {
            'x-token': cookies.access_token
          }
        });
        const newdeluxerooms = allrooms.data.alldeluxerooms;
        const newsinglerooms = allrooms.data.allsinglerooms;
        const newdoublerooms = allrooms.data.alldoublerooms;
        const singleroomsg = await Promise.all(
          newsinglerooms.map(async (deluxeroom) => {
            const newdeluxeroom = await Promise.all(
              deluxeroom.booking.map(async (room) => {
                const isValid = await filterroom(room);
                if (isValid) {
                  return room;
                }
                return null;
              })
            ).then((filteredRooms) => filteredRooms.filter(Boolean));
            
            console.log(newdeluxeroom);
            if (newdeluxeroom.length === 0) {
              console.log(deluxeroom)
              return deluxeroom;}
             }
          )
        );

        const doubleroomsg = await Promise.all(
          newdoublerooms.map(async (deluxeroom) => {
            const newdeluxeroom = await Promise.all(
              deluxeroom.booking.map(async (room) => {
                const isValid = await filterroom(room);
                if (isValid) {
                  return room;
                }
                return null;
              })
            ).then((filteredRooms) => filteredRooms.filter(Boolean));
            
            console.log(newdeluxeroom);
            if (newdeluxeroom.length === 0) {
              console.log(deluxeroom)
              return deluxeroom;}
             }
             
          )
        );
        const deluxeroomsg = await Promise.all(
          newdeluxerooms.map(async (deluxeroom) => {
            const newdeluxeroom = await Promise.all(
              deluxeroom.booking.map(async (room) => {
                const isValid = await filterroom(room);
                if (isValid) {
                  return room;
                }
                return null;
              })
            ).then((filteredRooms) => filteredRooms.filter(Boolean));
            
            console.log(newdeluxeroom);
            if (newdeluxeroom.length === 0) {
              console.log(deluxeroom)
              return deluxeroom;}
             }
             
          )
        );
        const singlerooms=singleroomsg.filter(Boolean);
        const deluxerooms=deluxeroomsg.filter(Boolean);
        const doublerooms=doubleroomsg.filter(Boolean)
        if (unique===0){
          setroomstoselect(doublerooms)
        }
        else if (unique===1){
          setroomstoselect(singlerooms)
        }
        else if (unique===2){
          setroomstoselect( deluxerooms)
        }
      } catch (err) {
        alert(err);
      }
    };

    fetchData();
  });
  const Change_handler=(event)=>{
    setdetails({...details,[event.target.name]:event.target.value})
}
const change_handle=(event)=>{
  if (event.target.checked){
    setdetails({...details,[event.target.name]:[...details.Rooms,event.target.value]})
  }
  else{
    setdetails({...details,[event.target.name]: details.Rooms.filter(room => room !== event.target.value)});
    
  }
}
  return (
         <div>
            <div className='details_name'>Enter the details </div>
            <div className='adults'>
                <label for="adults">Number of Adults<span style={{color:'red'}}>*</span> :</label>
                <select id="adults" name="Adults" value={details.Adults} onChange={Change_handler}>
                  <option value="1">1 (1 adult)</option>
                  <option value="2">2 (2 adults)</option>
                  <option value="3">3 (3 adults)</option>
                  <option value="4">4 (4 adults)</option>
                  <option value="5">5 (5 adults)</option>
                  <option value="6">6 (6 adults)</option>
                  <option value="7">7 (7 adults)</option>
                  <option value="8">8 (8 adults)</option>
                  <option value="9">9 (9 adults)</option>
                  <option value="10">10 (10 adults)</option>
                </select>
            </div>
            <div className='selectrooms'>
                     <p className='chrm'>Choose rooms from below<span style={{color:'red'}}>*</span> :</p>
                     <div>
                     {roomstoselect.length? (roomstoselect.map((room)=>{
                      return <div className='checkbox' key={room._id}>
                          <input type="checkbox" id={room._id} name='Rooms' value={room._id} onChange={change_handle} checked={details.Rooms.includes(room._id)}/>
                          <label for={room._id}>{room.roomnumber}</label><br></br>
                        </div>
                     })):(<div className='loading'><div class="loader"></div>Loading...</div>)}
                     </div>
            </div>
            <div className='radio_btns'>
                <p className='plan'>Your Meal Plan<span style={{color:'red'}}>*</span></p>
                    <input type="radio" name="Meals" value="Room Only" checked={details.Meals==="Room Only"} onChange={Change_handler}/> Room Only<br/>
                    <input type="radio" name="Meals" value="Breakfast" checked={details.Meals==="Breakfast"} onChange={Change_handler}/> Breakfast<br/>
                    <input type="radio" name="Meals" value="Brunch" checked={details.Meals==="Brunch"} onChange={Change_handler}/> Brunch (Breakfast and Lunch)<br/>
                    <input type="radio" name="Meals" value="Three square meals" checked={details.Meals==="Three square meals"} onChange={Change_handler}/>Three square meals<br/>
            </div>
         </div>
            
        
  )
}
