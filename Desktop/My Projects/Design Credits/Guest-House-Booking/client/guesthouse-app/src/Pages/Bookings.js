import React,{useEffect, useState} from 'react'
import './bookings.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import axios from 'axios';
import { useCookies } from 'react-cookie';
export default function Bookings() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  useEffect(()=>{if(!cookies.access_token){navigate('/')}})
  const [shownav,setshownav] = useState(false);
  const [loading,setloading]=useState(true);
  const[nobookings,setnobookings]=useState(false);
  const [searchbook,setsearchbook]=useState('');
  const logout = async(e)=>{
    e.preventDefault();
    sessionStorage.clear();
    removeCookie('access_token');
    navigate('/')
  }
  const [allbookings,setbookings]=useState([]);
  useState(async ()=>{
    try{
      const bookings=await axios.get(`http://localhost:8082/bookings/book`,{headers: {
        'x-token': cookies.access_token
      }});
      if(bookings.data.Bookings.length===0){
        setnobookings(true)
      }
      setbookings([...bookings.data.Bookings].reverse())
      setloading(false)
      console.log(allbookings)
    }
    catch(err){
        alert(err)
    }
  },[])
  const roomnumbers = (rooms) => {
    if (rooms.length === 1) {
      return <div>{rooms[0]}</div>;
    } else {
      let text = '';
      for (let i = 0; i < rooms.length; i++) {
        text += rooms[i].toString();
        if (i !== rooms.length - 1) {
          text += ' , ';
        }
      }
      return <div>{text}</div>;
    }
  };

  return (
    <div className='c'>
        <div className='nav_bar'>

            <div className='nav_bar_all coln' style={{ opacity: 1}}>
            <div className='nav_bar_all_res'><MdMenu className="resmenu" onClick={()=>{setshownav(!shownav)}} /></div>
            <div className='logo'>
                IIT JODHPUR
            </div>
            <div className='nav_links'>
                <ul className={!shownav?'navitems hide':'navitems'}>
                    <li><Link to='/Home' className='header_links' onClick={()=>{setshownav(!shownav)}}>Home</Link></li>
                    <li><Link to='/Bookings' className='header_links' onClick={()=>{setshownav(!shownav)}}>Bookings</Link></li>
                    <li><Link to='/Home' className='header_links' onClick={()=>{setshownav(!shownav)}}>Contact us</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                </ul>
            </div>
            </div>
            
        </div>
        <div className='main_contain'>
            <div className='contain_head'>Check your bookings</div>
            <div className='projectssearchbar' style={{display: nobookings ? 'none' : 'block'}} >
            <form><input type="text" className="searchbar" placeholder="Search..." value={searchbook} onChange={(e)=>{setsearchbook(e.target.value)}}/><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="searchbaricon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg></form>
            </div>
            <div className='contain' style={{display: nobookings ? 'none' : 'block'}} >
              
            <table>
            <tr>
                <th>Booking Id</th>
                <th>Booked On</th>
                <th>Rooms Allocated</th>
                <th>From Date</th>
                <th>End Date</th>
                <th>Status</th>
            </tr>
            {allbookings.filter((booking)=>{if(booking.bookedon.includes(searchbook) ||booking.fromdate.includes(searchbook) ||booking.enddate.includes(searchbook) || booking._id.includes(searchbook.toLowerCase()) || booking.status.toLowerCase().includes(searchbook.toLowerCase())){return booking;}}).map((booking) => (
                <tr key={booking._id}>
                <td><span className='hov'>{booking._id}</span></td>
                <td>{booking.bookedon}</td>
                <td>{roomnumbers(booking.rooms)}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.enddate}</td>
                <td><span className='hov'>{booking.status}</span></td>
                </tr>
            ))}
            </table>
            
            </div>
            <div className='contains' style={{display: !nobookings ? 'none' : 'block'}} >You have no bookings yet!</div>
            <p className='types' style={{ display: !loading ? 'none' : 'block',color:'#fff',textAlign:'center',marginTop:'20px' }}>
                <div className='loading' style={{justifyContent:'center'}}><div className="loader" style={{borderTop: '3px dotted #fff',borderLeft: '3px dotted #fff'}}></div>Loading...</div>
            </p>
        </div>
    </div>
    
  )
}
