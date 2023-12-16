import React, { useEffect, useState } from 'react';
import './allrooms.css';
import { useNavigate } from 'react-router-dom';
import Rooms from '../images/rooms.jpg';
import Roomcard from '../components/Roomcard';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Allrooms({setaccomodation}) {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  useEffect(()=>{if(!cookies.access_token){navigate('/')}})
  const [totaltypes, setTotalTypes] = useState(0);
  const savedCheckin = sessionStorage.getItem('checkin');
  const savedCheckout =sessionStorage.getItem('checkout');
  const [rooms, setRooms] = useState([]);
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
      if((bookingdetails.status ==="Approved") || (bookingdetails.status === "Pending")){return true;}
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
        var totaltype=0;
        const allrooms = await axios.get("http://localhost:8082/rooms/allrooms", {
          headers: {
            'x-token': cookies.access_token
          }
        });
        console.log(allrooms)
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
        if(deluxerooms.length===0 && singlerooms.length===0 && doublerooms.length===0 ){totaltype=-1}
        let updatedRooms = [
          {
            roomtype: "Double Room",
            roomdescription: "Our Double room is large and comfortable. It's spacious enough for two adults and comfortable. The room is thoughtfully furnished and equipped with all the essentials for a pleasant stay.",
            roomimgsrc: Rooms,
            fromdate: savedCheckin,
            enddate: savedCheckout,
            roomsleft: 0,
            isavaible: false,
            unique: 0
          },
          {
            roomtype: "Single Room",
            roomdescription: "Our Sinle room is large and comfortable. It's spacious enough for one adult and comfortable. The room is thoughtfully furnished and equipped with all the essentials for a pleasant stay.",
            roomimgsrc:Rooms,
            fromdate: savedCheckin,
            enddate: savedCheckout,
            roomsleft: 0,
            isavaible: false,
            unique: 1
          },
          {
            roomtype: "Deluxe Room",
            roomdescription: "Our Deluxe room is large and comfortable. It's spacious enough for four adults and comfortable. The room is thoughtfully furnished and equipped with all the essentials for a pleasant stay.",
            roomimgsrc: Rooms,
            fromdate: savedCheckin,
            enddate: savedCheckout,
            roomsleft: 0,
            isavaible: false,
            unique: 2
          }
        ];

        if (doublerooms.length > 0) {
          updatedRooms[0].roomsleft = doublerooms.length;
          updatedRooms[0].isavaible = true;
          totaltype++;
        }

        if (deluxerooms.length > 0) {
          updatedRooms[2].roomsleft = deluxerooms.length;
          updatedRooms[2].isavaible = true;
          totaltype++;
        }

        if (singlerooms.length > 0) {
          updatedRooms[1].roomsleft = singlerooms.length;
          updatedRooms[1].isavaible = true;
          totaltype++;
        }
        
        setTotalTypes(totaltype);
        setRooms(updatedRooms);
      } catch (err) {
        alert(err);
      }
    };

    fetchData();
  });

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
        <p className='types' style={{ display: totaltypes===-1 ? 'none' : totaltypes? 'block' :'none' }}>
          We have found {totaltypes} types of accommodation that suit your needs.
        </p>
        <p className='types' style={{ display: totaltypes ? 'none' : 'block' }}>
        <div className='loading'><div className="loader"></div>Loading...</div>
        </p>
        <div className='choosetype' style={{ display: totaltypes===-1 ? 'block' : 'none' ,textAlign:'center'}}>
          Sorry! No rooms are avaible right now.
        </div>
        <p className='choosetype' style={{ display: totaltypes===-1 ? 'none' : 'block'}}>Select your accommodation</p>
        <div className='roomcardsdiv'>
          {rooms.map((room) => {
            if (room.isavaible) {
              return <Roomcard selectroom={room} setaccomodation={setaccomodation}/>;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
