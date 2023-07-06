import React, { useState, useEffect } from 'react';
import '../Pages/admintable.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import MUIDataTable from 'mui-datatables';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const Card = ({ booking }) => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['admin_access_token']);
    useEffect(()=>{if(!cookies.admin_access_token){navigate('/adminlogin')}})
  const [search, setSearch] = useState('');
  const [details, setDetails] = useState(false);
  const [filtering, setFiltering] = useState([]);
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [emptyrooms, setEmptyRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const options = {
    filter: false,
    search: true,
    selectableRows: 'none',
    print: false,
    download: false,
    delete:false,
    viewColumns: false,
    pagination: true,
  };
  useEffect(() => {
    const getting2 = async () => {
      await axios
        .get("http://localhost:8082/rooms/allfreerooms", {
            headers: {
              'x-token': cookies.admin_access_token
            }
          })
        .then((response) => {
          setEmptyRooms(response.data.Rooms);
          setRooms(response.data.Rooms);
        })
        .catch((error) => {
          console.log("Failed to fetch data of rooms", error);
        });
    };

    getting2();
  }, []);

  const handleSearchRooms = () => {
    if (checkin && checkout) {
      const availableRooms = rooms.filter((room) => {
        const booked = booking.some((bookin) => {
          const bookedin = new Date(bookin.fromdate.split('-').reverse().join('-'));
          const bookedout = new Date(bookin.enddate.split('-').reverse().join('-'));
          const checkIn = new Date(checkin);
          checkIn.setHours(5, 30, 0, 0);
          const checkOut = new Date(checkout);
          checkOut.setHours(5, 30, 0, 0);
           
          if (bookin.rooms.includes(room.roomnumber)) {
            if (
              (checkIn <= bookedout && checkIn >= bookedin) ||
              (checkOut >= bookedin && checkOut <= bookedout) ||
              (bookedin <= checkOut && bookedin >= checkIn) ||
              (bookedout >= checkIn && bookedout <= checkOut)
            ){
                console.log(room._id);
            if(bookin.status==="Approved" || bookin.status==="Pending") {
                return true;
            }else{
              return false;
            }
            
        }else{
            return false;
        }
          }
          else{
            return false;
          }
          
        });
  
        return !booked ;
      });

      setEmptyRooms(availableRooms);
    }
  };

  const handleSearch = () => {
    // console.log(booking)
    setFiltering(
      booking.filter((bookin) => {
        const id = bookin._id;
        return id.toLowerCase()===search.toLowerCase();
      })
    );
  };

  const handleClick = () => {
    handleSearch();
    setDetails(true);
    // console.log(filtering)
  };

  const columns = ["Rooms", "Room Type"];
  const data = emptyrooms.map((roomin) => [roomin.roomnumber, roomin.options]);

  return (
    <div >
      <div className="main1">
        <div className="table1">
          <div className="shh1">
            <input
              className="ashd1"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Booking I'D"
            />
            <button className="butt" onClick={handleClick}>
              Show details
            </button>
          </div>

          {details &&
            filtering.map((bookin) => (
              <div className="sf" key={bookin._id}>
                <p>First Name: {bookin.firstname}</p>
                <p>Last Name: {bookin.lastname}</p>
                <p>Booking ID: {bookin._id}</p>
                <p>Booked On: {bookin.bookedon}</p>
                <p>From Date: {bookin.fromdate}</p>
                <p>End Date: {bookin.enddate}</p>
                <p>Address: {bookin.address}</p>
                {/* <p>Single Rooms: {bookin.rooms.filter((bookingf)=>{return bookingf.roomtype==="Single"}).sort().join(',')}</p>
                <p>Double Rooms: {bookin.rooms.filter((bookingf)=>{return bookingf.roomtype==="Double"}).join(',')}</p>
                <p>Deluxe Rooms: {bookin.rooms.filter((bookingf)=>{return bookingf.roomtype==="Deluxe"}).join(',')}</p> */}
                <p>Rooms: {bookin.rooms.join(',')}</p>
                <p>Rooms Type: {bookin.roomstype.join(',')}</p>
                <p>Meals: {bookin.meals}</p>
                <p >Status: <span style={{fontWeight:"550",color:bookin.status==="Rejected"?"red":bookin.status==="Approved"?"green":"rgb(230, 163, 17)"}}>{bookin.status}</span></p>
                <p>Email: {bookin.email}</p>
                <p style={{display:bookin.specialrequest===""?'none':'block'}}>Special Request: {bookin.specialrequest}</p>
                <p>Adults: {bookin.adults}</p>
                <p>Phone Number: {bookin.phonenumber}</p>
              </div>
            ))}
             </div>
          <div className="table2">
            <DatePicker selected={checkin} format="DD-MM-YYYY" onChange={(date) => setCheckin(date)} className='datepicker' placeholderText='Check-in'/>
            <DatePicker selected={checkout} format="DD-MM-YYYY" onChange={(date) => setCheckout(date)} className='datepicker' placeholderText='Check-out'/>
            <button onClick={handleSearchRooms} className="bu">
              Search
            </button>
            <MUIDataTable
              title="Available Rooms"
              data={data}
              options={options}
              columns={columns}
            />
          </div>

      </div>
    </div>
  );
};

export default Card;
