import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import './header.css'
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom'
import { Link as ScrollLink} from 'react-scroll';
import { MdMenu } from "react-icons/md";
import { useCookies } from 'react-cookie';
import { FiLogOut } from "react-icons/fi";
import axios from 'axios'

export default function FacultyHeaderHome() {


  const navigate = useNavigate();
  const [shownav, setshownav] = useState(false);
  const [setnav, setsetnav] = useState(false);
  const [data, setData] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const logout = async (e) => {
    e.preventDefault();
    sessionStorage.clear();
    removeCookie('faculty_access_token');
    navigate('/faculty-login')
  }


  const backgroundchange = () => {
    if (window.innerWidth >= 768) {
      setsetnav(true);
    }
    else {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='nav_bar'>
      <div className='nav_bar_all col' style={{ opacity: 1 }} ref={headerRef} id='header'>
        <div className='nav_bar_all_res'><MdMenu className="resmenu" onClick={() => { setshownav(!shownav) }} /></div>
        <div className='logo'>
          {/* <img src='https://iitj.ac.in/uploaded_docs/IITJ%20Logo__big.jpg' alt='Logo' className='logo_img' /> */}
          IIT JODHPUR
        </div>
        <React.Fragment >
          <Drawer
            anchor={'left'}
            open={shownav}
            onClose={() => { setshownav(!shownav) }}
          >
            <div style={{ padding: '12px 10px', display: 'flex', gap: '5px', flexDirection: 'column', marginTop: '6px' }}>
              <p style={{ fontSize: '15px', fontWeight: '500', margin: '0' }}>{data.username}</p>
              <p style={{ fontSize: '13px', fontWeight: '400', margin: '0' }}>{data.email} </p>
            </div>
            {/* <Divider></Divider> */}
            <ul className='res_nav_links'>
              <li><Link to='#' className='headerlinks' onClick={() => { setshownav(!shownav) }}>Home</Link></li>
              <li><ScrollLink to="about" className='headerlinks' onClick={() => { setshownav(!shownav) }}>About Us</ScrollLink></li>
              <li><ScrollLink to="gallery" className='headerlinks' onClick={() => { setshownav(!shownav) }}>Gallery</ScrollLink></li>
              <li><ScrollLink to="contact" className="headerlinks" onClick={() => { setshownav(!shownav) }}>Contact Us</ScrollLink></li>
              <li><Link to="/facultybookings" className='headerlinks' onClick={() => { setshownav(!shownav) }}>Bookings</Link></li>

              {/* <li><Link to="#" className="headerlinks" >Profile</Link></li> */}
              <li ><button style={{ fontWeight: 500 }} onClick={logout}>Logout</button></li>
            </ul>
          </Drawer>
        </React.Fragment>
        <div className='nav_links'>
          <ul className='navitems hide'>
            <li><Link to='#' className='header_links' onClick={handleHomeClick}>Home</Link></li>
            <li><ScrollLink to="about" className='header_links' spy={true} smooth={true} offset={-headerHeight}>About Us</ScrollLink></li>
            <li><ScrollLink to="gallery" className='header_links' spy={true} smooth={true} offset={-headerHeight}>Gallery</ScrollLink></li>
            <li><ScrollLink to="availability" className='header_links' spy={true} smooth={true} offset={-headerHeight}>Availability</ScrollLink></li>
            <li><ScrollLink to="contact" className='header_links' spy={true} smooth={true} offset={-headerHeight}>Contact Us</ScrollLink></li>
            <li><Link to="/facultybookings" className='header_links'>Bookings</Link></li>
            <li><button onClick={logout}>Logout<FiLogOut style={{ marginLeft: '8px' }} /></button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}