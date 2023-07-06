import React from 'react';
import './footer.css';
import Logo from '../images/logo.jpg';
import {Link} from 'react-router-dom';
export default function Footer() {
  return (
    <div className='footert'>
      <div class='footer_about'>
            <img class="logof" src={Logo} alt="MAMPG Logo"/>
            <h1 class='footn'>IIT JODHPUR</h1>
      </div>
      <div class='footer'>
            <div class='footlinks'>
                  <p class='heading_footer'>Get in Touch with us</p>
                  <ul>
                     <li class='lilist'><a href="#">(91 291) 2801195</a></li>
                     <li class='lilist'><a href="#"><ion-icon name="mail-outline" class="footicons"></ion-icon>IITJ@iitj.ac.in</a></li>
                     <li class='lilist'><a href="#"><ion-icon name="location-outline" class="footicons"></ion-icon>
                     Indian Institute of Technology Jodhpur
                  N.H. 62, Nagaur Road, Karwar Jodhpur 342030
                  Rajasthan (India)</a></li>
                  </ul>
             </div>

            <div class='footlinks'>
                <p class='heading_footer'>Quick Links</p>
                <ul class='ulist'>
                    <li class='lilist'><a href="#">Home</a></li>
                    <li class='lilist'><a href="#">Contact us</a></li>
                    <li class='lilist'><a href="#">Bookings</a></li>
                    <li class='lilist'><a href="#">Official Website</a></li>
                </ul>
            </div>
                        
            <div clase='footlinks'>
                <p class='heading_footer'>Social Links</p>
                <ul>
                    <li class='lilist'><a href="#">Facebook</a></li>
                    <li class='lilist'><a href="#">Instagram</a></li>
                    <li class='lilist'><a href="#">Twitter</a></li>
                    <li class='lilist'><a href="#">Youtube</a></li>
                </ul>
            </div>
        </div>
    </div>
    
  )
}
