import React from 'react'
import './form.css'
import './contactus.css'
import { GrFacebookOption, GrInstagram, GrLocation, GrMailOption, GrPhone, GrTwitter } from "react-icons/gr";
export default function Contactus() {
  return (
    <div className='contactus' id="contact">
      <div className='mainheading'>CONTACT US</div>
      <div className='contactusdiv'>
        <div className='contactusdivleft'>
          <div className='contactusdivleftdiv'>
            <span><GrLocation className='iconc' /></span>
            <p>ADDRESS :</p>
            <div>Indian Institute of Technology Jodhpur
              N.H. 62, Nagaur Road, Karwar Jodhpur 342030
              Rajasthan (India)
            </div>
          </div>
          <div className='contactusdivleftdiv'>
            <span><GrMailOption className='iconc' /></span>
            <p>EMAIL :</p>
            <div><a>IITJ@iitj.ac.in</a>
            </div>
          </div>
          <div className='contactusdivleftdiv'>
            <span><GrPhone className='iconc' /></span>
            <p>CALL US :</p>
            <div>(91 291) 2801195 </div>
          </div>

          <div className='contactusdivleftdiv'>
            <span></span>
            <p>CONTACT US:</p>
            <div>Our Social Media Coordinates:</div>
            <ul>
              <li><a><GrFacebookOption className='social' /></a></li>
              <li><a><GrTwitter className='social' /></a></li>
              <li><a><GrInstagram className='social' /></a></li>
            </ul>
          </div>
        </div>
        <div className='contactusdivright'>
          <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=iit jodhpur&t=&z=13&ie=UTF8&iwloc=&output=embed" style={{ frameborder: "0", scrolling: "no", marginheight: "0", marginwidth: "0" }}></iframe><a href="https://2yu.co">2yu</a><br /><a href="https://embedgooglemap.2yu.co/">html embed google map</a></div></div>
        </div>
      </div>
      <div className='form-container'>
        <form action="https://formspree.io/f/xyyqgpeq" method="POST" className='input-container'>
        <p className='query'>Any Query? Reach Us</p>
          <div className='grid1'>
            <div className='input'>
              <span></span>
              <input type='text' name="first-name" id="first-name" autoComplete='off' placeholder='UserName'/>
            </div>
            <div className='input'>
              <span></span>
              <input type='email' name="e-mail" id="e-mail" autoComplete='off' placeholder='Email'/>
            </div>
            <div className='input'>
              {/* <span>Phone Number</span> */}
              <input type='number' name="phone-no" id="phone-no" autoComplete='off' placeholder='Phone Number'/>
            </div>
          </div>
          <div className='input inputlast'>
            {/* <span>Write Your Message</span> */}
            <textarea cols='30' rows='8' placeholder="How can we help you?" name="message" id="message" autoComplete='off'></textarea>
          </div>
          <div className='btn'> 
             <input type='submit' value="Submit"/>
          </div>
        </form>
      </div>
    </div>
  )
}