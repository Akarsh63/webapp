import React, { useState,useEffect} from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { FaLongArrowAltRight} from "react-icons/fa";
import IITJ from '../images/IITJ.jpg';
import { useCookies } from 'react-cookie';
export default function Header() {
  const navigate = useNavigate();
  const [shownav,setshownav] = useState(false);
  const [setnav,setsetnav] = useState(false);
  const [setop,setopnav] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const logout = async(e)=>{
    e.preventDefault();
    sessionStorage.clear();
    removeCookie('access_token');
    navigate('/')
  }
const handlecontactpage=(event)=>{
  event.preventDefault()
  setshownav(!shownav)
  navigate('/Home')
  window.scrollTo(0,1000)
}
  const backgroundchange=()=>{
     if (window.scrollY>=80 && window.innerWidth>=768){
        setsetnav(true);
        if(window.scrollY>=300){
          setopnav(true)
        }
        else{
          setopnav(false)
        }
     }
     else{
      setsetnav(false)
     }
  }
  window.addEventListener('scroll', backgroundchange);
  
  return (
    <div className='o'>
      <div className='main_img'>
          <div className='overlay'>
            <h1>Welcome to <span className='nameres'>IIT Jodhpur</span></h1>
            <h2>Have a nice Stay!</h2>
            <button className='overlay_btn' onClick={()=>{window.scrollTo(0,0);navigate('/booknow')}}>
              Book Now
              <span>
                <FaLongArrowAltRight className='arrow' />
              </span>
            </button>
          </div>
        <img src={IITJ} alt="IITJ"/>
      </div>
      <div className='nav_bar'>
        <div className={setnav? ('nav_bar_all col'):('nav_bar_all')} style={{ opacity: setnav ? (setop ? 1 : 0.6) : 1 }}>
        <div className='nav_bar_all_res'><MdMenu className="resmenu" onClick={()=>{setshownav(!shownav)}} /></div>
          <div className='logo'>
            IIT JODHPUR
          </div>
          <div className='nav_links'>
            <ul className={!shownav?'navitems hide':'navitems'}>
              <li><Link to='/Home' className='header_links' onClick={()=>{setshownav(!shownav)}}>Home</Link></li>
              <li><Link to='/Bookings' className='header_links' onClick={()=>{setshownav(!shownav)}}>Bookings</Link></li>
              <li><Link to="/Home" className="header_links" onClick={handlecontactpage}>Contact us</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        </div>
        
      </div>
      
    </div>
    
  )
}
