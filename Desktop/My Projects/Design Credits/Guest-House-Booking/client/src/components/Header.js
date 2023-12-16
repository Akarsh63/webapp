import React, { useState,useEffect,useRef} from 'react'
import './header.css'
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom'
import { Link as ScrollLink, Element } from 'react-scroll';
import { MdMenu } from "react-icons/md";
import { useCookies } from 'react-cookie';
import { Divider } from '@mui/material';
import {FiLogOut } from "react-icons/fi";
export default function Header() {
  const navigate = useNavigate();
  const [shownav,setshownav] = useState(false);
  const [setnav,setsetnav] = useState(false);
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
     if (window.innerWidth>=768){
        setsetnav(true);
     }
     else{
      setsetnav(false)
     }
  }
  window.addEventListener('scroll', backgroundchange);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
    console.log(headerHeight)
  }, [headerHeight]);
  const handleHomeClick = () => {
    if (window.location.pathname === '/Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/Home');
    }
  };
  return (
      <div className='nav_bar'>
        <div className='nav_bar_all col' style={{ opacity:  1 }} ref={headerRef} id='header'>
          <div className='nav_bar_all_res'><MdMenu className="resmenu" onClick={()=>{setshownav(!shownav)}}/></div>
          <div className='logo'>
            IIT JODHPUR
          </div>
          <React.Fragment >
          <Drawer
            anchor={'left'}
            open={shownav}
            onClose={()=>{setshownav(!shownav)}}
          >
            <div style={{padding:'12px 10px',display:'flex',gap:'5px',flexDirection:'column',marginTop:'6px'}}>
              <p style={{fontSize:'15px',fontWeight:'500',margin:'0'}}>Sai Mani Akarsh Rankireddy</p>
              <p style={{fontSize:'13px',fontWeight:'400',margin:'0'}}>akarsh.1@iitj.ac.in</p>
              </div>
            <Divider></Divider>
            <ul className='res_nav_links'>
              <li><Link to='/Home' className='headerlinks' onClick={()=>{setshownav(!shownav)}}>Home</Link></li>
              <li><Link to='#' className='headerlinks' onClick={()=>{setshownav(!shownav)}}>About Us</Link></li>
              <li><Link to='#' className='headerlinks' onClick={()=>{setshownav(!shownav)}}>Gallery</Link></li>
              <li><Link to="#" className="headerlinks" onClick={()=>{setshownav(!shownav)}}>Avaibility</Link></li>
              <li><Link to="/Home" className="headerlinks" onClick={()=>{setshownav(!shownav)}}>Contact Us</Link></li>
              <li><Link to='/Bookings' className='headerlinks'onClick={()=>{setshownav(!shownav)}}>Bookings</Link></li>
              <Divider></Divider>
              {/* <li><Link to="#" className="headerlinks" >Profile</Link></li> */}
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </Drawer>
        </React.Fragment>
          <div className='nav_links'>
            <ul className='navitems hide'>
              <li><Link to='/Home' className='header_links' onClick={handleHomeClick}>Home</Link></li>
              <li><ScrollLink to="about" className='header_links' spy={true} smooth={true} offset={-headerHeight}>About Us</ScrollLink></li>
              <li><ScrollLink to="gallery" className='header_links' spy={true} smooth={true} offset={-headerHeight}>Gallery</ScrollLink></li>
              <li><ScrollLink to="availability" className='header_links' spy={true} smooth={true} offset={-headerHeight}>Availability</ScrollLink></li>
              <li><ScrollLink to="contact" className='header_links' spy={true} smooth={true} offset={-headerHeight}>Contact Us</ScrollLink></li>
              <li><Link to='/Bookings' className='header_links'>Bookings</Link></li>
              <li><button onClick={logout}>Logout<FiLogOut style={{marginLeft:'8px'}} /></button></li>
            </ul>
          </div>
        </div>
      </div>
  )
}
