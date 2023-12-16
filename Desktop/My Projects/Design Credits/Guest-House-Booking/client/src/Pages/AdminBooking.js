import React, { useState, useEffect } from 'react';
import './newbooking.css';
import axios from 'axios';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const Newbook = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['admin_access_token']);
    useEffect(()=>{if(!cookies.admin_access_token){navigate('/admin-login')}})
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [t, sett] = useState("");
  const [request, setRequest] = useState("");
  const [person, setPerson] = useState("");
  const [rooms, setRooms] = useState([]); 
  const [rom, setrom] = useState([]); 
  const [purpose,setpurpose]=useState("");
  const [meal, setMeal] = useState("");
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);
  const [typerooms, setTypeRooms] = useState([]); 
  const [availableRooms, setAvailableRooms] = useState([]); 

  useEffect(() => {
    const fetchAvailableRooms = async () => {
        try {
          const roomsResponse = await axios.get(`http://localhost:8082/rooms/allfreerooms`, {
            headers: {
              'x-token': cookies.admin_access_token
            }
          });
          const allRooms = roomsResponse.data.Rooms;
          console.log(allRooms)
          const bookingsResponse = await axios.get(`http://localhost:8082/admibookings/bookings`, {
            headers: {
              'x-token': cookies.admin_access_token
            }
          });
          const bookings = bookingsResponse.data.Bookings;
          console.log(bookings)
          const availablerooms = allRooms.filter((room) => {
            const booked = bookings.some((booking) => {
              const bookedIn = new Date(booking.fromdate.split('-').reverse().join('-'));
              const bookedOut = new Date(booking.enddate.split('-').reverse().join('-'));
              const checkIn = new Date(startdate);
              const checkOut = new Date(enddate);
      
              if (booking.rooms.includes(room.roomnumber)) {
                console.log(room.roomnumber);
                console.log(bookedIn)
                console.log(bookedOut)
                console.log(checkIn)
                console.log(checkOut)
                if (
                  (checkIn <= bookedOut && checkIn >= bookedIn) ||
                  (checkOut >= bookedIn && checkOut <= bookedOut) ||
                  (bookedIn <= checkOut && bookedIn >= checkIn) ||
                  (bookedOut >= checkIn && bookedOut <= checkOut)
                ){
                if(booking.status==="Approved" || booking.status==="Pending") {

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
      
          setAvailableRooms(availablerooms);
          console.log(availableRooms);
        } catch (error) {
          console.log("Error fetching available rooms:", error);
        }
      };
      

    if (startdate!=null && enddate!=null) {
      fetchAvailableRooms();
    }
  }, [startdate, enddate]);
  
  const onRoomChange = (e) => {
    const roomId = e.target.value;
    const roomType = e.target.dataset.typerooms;
    const isChecked = e.target.checked;
  
    setrom((prevRooms) => {
      return prevRooms.map((room) => {
        if (room._id === roomId) {
          return {
            ...room,
            checked: isChecked
          };
        }
        return room;
      });
    });
  
    setRooms((prevRooms) => {
      if (isChecked) {
        return prevRooms.concat(roomId);
      } else {
        return prevRooms.filter((id) => id !== roomId);
      }
    });
  
    setTypeRooms((prevRoomTypes) => {
      if (isChecked) {
        if (!prevRoomTypes.includes(roomType)) {
          return [...prevRoomTypes, roomType];
        }
      } else {
        return prevRoomTypes.filter((type) => type !== roomType);
      }
      return prevRoomTypes;
    });
  };

    const onOptionChange = (e) => {
        const selectedMeal = e.target.value;
        setMeal(selectedMeal);
         //console.log(setMeal(selectedRoomType));
          };
    const onOtChange = (e) => {
            const selectedRoomType = e.target.value;
            sett(e.target.value);
            console.log(selectedRoomType);
          
            const filteredRooms = availableRooms.filter((room) => room.options === selectedRoomType);
            const updatedRooms = filteredRooms.map((room) => ({
              ...room,
              checked: rooms.includes(room._id)
            }));
          
            setrom(updatedRooms);
          };
  const handlessubmit = async (e) => {
    e.preventDefault();
    if (
        fname===''||
        lname==='' ||
        address===''||
        email===''||
        phonenumber===''||
        purpose===''||
        rooms.length===0||
        meal===""||
        startdate===null||
        enddate===null||
        typerooms.length===0  ) {
            alert('Please Fill All The Details!')
         return;
      }
    const momentStartDate = moment(startdate, "YYYY-MM-DD");
    const momentEndDate = moment(enddate, "YYYY-MM-DD");

    const formattedStartDate = momentStartDate.format("DD-MM-YYYY");
    const formattedEndDate = momentEndDate.format("DD-MM-YYYY");
    console.log(formattedStartDate);
    const info = {
      fname: fname,
      lname: lname,
      email: email,
      phonenumber: phonenumber,
      address: address,
      rooms: rooms, 
      typerooms: typerooms, 
      person: person,
      meal: meal,
      request: request
    };

    console.log(info);

    await axios.post("http://localhost:8082/admibookings/newbook", {
      fname: fname,
      lname: lname,
      email: email,
      phonenumber: phonenumber,
      address: address,
      rooms: rooms, 
      roomstype: typerooms,
      adults: person,
      fromdate: formattedStartDate,
      enddate: formattedEndDate,
      meal: meal,
      specialrequest:request
    }, {
        headers: {
          'x-token': cookies.admin_access_token
        }
      })
      .then(() => {
        alert('Booking Completed');
        setFname("");
        setLname("");
        setEmail("");
        setPhoneNumber("");
        setAddress("");
        setRooms([]); 
        setTypeRooms([]); 
        setPerson("");
        setMeal("");
        setRequest("");
        setStartDate("");
        setEndDate("");
        sett("");
        setAvailableRooms([])
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
      <div className='admincontainer'>
        <div className='adminmain-container'>
          <form onSubmit={handlessubmit} className='adminbookingform'>
            <p className='det-1'>Create a new Booking</p>
            <div className='labelname'>
              <div className='fname'>
                <label htmlFor='fname'>First name <i className="fa-sharp fa-solid fa-star-of-life"></i></label>
                <input type='text' name='fname' value={fname} onChange={(e) => setFname(e.target.value)} required />
              </div>
              <div className='lname'>
                <label htmlFor='lname'>Last name <i className="fa-sharp fa-solid fa-star-of-life"></i></label>
                <input type='text' name='lname' value={lname} onChange={(e) => setLname(e.target.value)} required />
              </div>
            </div>
            <div className='labelname'>
              <div className='fname'>
                <label htmlFor='email'>Email <i className="fa-sharp fa-solid fa-star-of-life"></i></label>
                <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className='lname'>
                <label htmlFor='phonenumber'>Phone Number <i className="fa-sharp fa-solid fa-star-of-life"></i></label>
                <input type='tel' name='phonenumber' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              </div>
            </div>
            <div className='labelname'>
              <div className='fname'>
                <label htmlFor='address'>Address <i className="fa-sharp fa-solid fa-star-of-life"></i></label>
                <input type='text' name='address' value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className='lname'>
                <label htmlFor='purpose'>Purpose <i className="fa-sharp fa-solid fa-star-of-life"></i></label>
                <input type='text' name='purpose' value={purpose} onChange={(e) => setpurpose(e.target.value)} required />
              </div>
            </div>
            <div className='labelname'>
              <div className='fname'>
                <label htmlFor='startdate'>From Date <i className="fa-sharp fa-solid fa-star-of-life"></i></label>
                <input type='date' name='startdate' value={startdate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
              <div className='lname'>
                <label htmlFor='enddate'>End Date <i className="fa-sharp fa-solid fa-star-of-life"></i></label>
                <input type='date' name='enddate' value={enddate} onChange={(e) => setEndDate(e.target.value)} required />
              </div>
            </div>
            <div className='special lname'>
              <label htmlFor='req'>Special Request</label>
              <textarea rows='10' cols='53' value={request} onChange={(e) => setRequest(e.target.value)} />
            </div>
            <div className='persons'>
              <label className='adult'>Number of persons <i className="fa-sharp fa-solid fa-star-of-life"></i> : </label>
              <select value={person} onChange={(e) => setPerson(e.target.value)}>
                <option value=""> choose your option</option>
                <option value='1'>1 (1 Person)</option>
                <option value='2'>2 (2 Persons)</option>
                <option value='3'>3 (3 Persons)</option>
                <option value='4'>4 (4 Persons)</option>
                <option value='5'>5 (5 Persons)</option>
                <option value='6'>6 (6 Persons)</option>
              </select>
            </div>
            <div className='lname'>
                <label className='adult'>Type of Room:</label>
                <select value={t} onChange={onOtChange}>
                <option value="">Choose your option</option>
                <option value='Single'>Single</option>
                <option value='Double'>Double</option>
                <option value='Deluxe'>Deluxe</option>
                </select>
            </div>
            
            <br /> 

            <div className='rooms'>
            <span>Choose rooms from below<i className="fa-sharp fa-solid fa-star-of-life"></i> : </span><br />
            {rom.map((room) => (
                <React.Fragment key={room._id}>
                <input
                checked={room.checked}
                    type="checkbox"
                    id={room._id}
                    name="room"
                    value={room._id}
                    data-typerooms={room.options} 
                    onChange={onRoomChange}
                />
                <label htmlFor={room.id}>{room.roomnumber} </label><br />
                </React.Fragment>
            ))}
            </div>
           <div className='rooms'>
            <div className='spanad'>
            <span >Choose your meal from below<i className="fa-sharp fa-solid fa-star-of-life"></i> : </span><br />
            </div>
              
              <input type="radio" id="roomonly" name="meal" value="Roomonly" onChange={onOptionChange} checked={meal === "Roomonly"} />
                <label htmlFor="roomonly">Room Only</label><br />
                <input type="radio" id="breakfast" name="meal" value="Breakfast" onChange={onOptionChange} checked={meal === "Breakfast"} />
                <label htmlFor="breakfast">Breakfast</label><br />
                <input type="radio" id="brunch" name="meal" value="Brunch" onChange={onOptionChange} checked={meal === "Brunch"} />
                <label htmlFor="brunch">Brunch (Breakfast and Lunch)</label><br />
                <input type="radio" id="threesquaremeals" name="meal" value="Three Square Meals" onChange={onOptionChange} checked={meal === "Three Square Meals"} />
                <label htmlFor="threesquaremeals">Three Square Meals</label>

            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
  )
};

export default Newbook;