import React, { useEffect, useState } from 'react'
import './query.css'
export default function Query() {
    const [rows, setRows] = useState(6);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 586) {
        setRows(4);
      } else {
        setRows(6);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className='homecomp4'>
    <div className='query-form-container'>
        <div className='query-form'>
            <h2 className='aboutushead' style={{color:"rgb(0,0,0)"}}>Get in <span style={{color:"rgb(255,0,0)"}}>Touch!</span></h2>
            <form action="https://formspree.io/f/xyyqgpeq" method="POST" className='query-input-container'>
                <div className='query-input'>
                    <input type='text' name="first-name" id="first-name" autoComplete='off' placeholder='Enter your Username'/>
                </div>
                <div className='query-input'>
                    <input type='email' name="e-mail" id="e-mail" autoComplete='off' placeholder='Enter your Email'/>
                </div>
                <div className='query-input'>
                    <textarea  rows={rows} placeholder="Enter your message" name="message" id="message" autoComplete='off' ></textarea>
                </div>
                <div className='query-btn'> 
                    <input type='submit' value="Submit"/>
                </div>
            </form>
        </div>
        <div className='map-container'>
          
          <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=iit jodhpur&t=&z=13&ie=UTF8&iwloc=&output=embed" style={{ frameborder: "0", scrolling: "no", marginheight: "0", marginwidth: "0" }}></iframe><a href="https://2yu.co">2yu</a><br /><a href="https://embedgooglemap.2yu.co/">html embed google map</a></div></div>
        </div>
    </div>
    </div>
  )
}
