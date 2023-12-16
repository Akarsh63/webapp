import React from 'react'
import './features.css'
import {LuAirVent} from "react-icons/lu";
import { MdLocalDining,MdSignalWifiStatusbar4Bar,MdOutlineLocalLaundryService,MdOutlineMedicalInformation,MdWash,MdOutlineDinnerDining,MdDataUsage,MdWaterDamage } from "react-icons/md";
import { GiDesk } from "react-icons/gi";
import { BiCctv } from "react-icons/bi";
import {FaGlassWaterDroplet,FaCarRear } from "react-icons/fa6";
import {LuTrees} from "react-icons/lu";
import {GiSecurityGate} from "react-icons/gi";
import {BsFillTelephoneFill} from "react-icons/bs";
import {TbTeapot} from "react-icons/tb";
export default function Features() {
  return (
    <div className='homecomp2' id='about'>
       <div className='about'>
            {/* <div className='about_img'>
                <img src='https://qph.cf2.quoracdn.net/main-qimg-8eb932410b54b3c315d91bee4b11efd0-lq' alt="Guest hpouse" />
            </div> */}
            <div className='about_desc'>
               <div>
               <p className="abouttop" >Welcome to our guest house booking website!</p>
               <h2 className='aboutushead'>About our college</h2>
               <p className='textabout'>Indian Institute of Technology Jodhpur was established in 2008, to foster technology education and research in India.
                        The Institute is committed to technological thought and action to benefit the economic development of India.
               IIT Jodhpur functions from its sprawling residential Permanent Campus of 852 acres on National Highway 65, north-northwest of Jodhpur towards Nagaur.
                        This campus is meticulously planned and envisioned to stand as a symbol of academics – simple, but deep.The Institute is committed to multidisciplinary approach of technology development.</p>
               {/* <p className='textabout'>
                  Hence, it has established state-of-the-art laboratories for basic research, and has organised its 
                  academic degree activities through Departments and its coordinated research through Centers for Technologies.</p> */}
                </div>
            </div>
       </div>
       <div className='features'>
         <div><h2 className='aboutushead' style={{textAlign:'center',marginBottom:'80px'}}>Explore the features we provide</h2></div>
         <div className='facilities'>
           <div>
           <h1>Comfortable Rooms</h1>
           <p>We provide cozy and comfortable rooms for a pleasant stay.</p>
            <ul>
               <li>AC Rooms</li>
               <li>Dining Hall</li>
               <li>Free High Speed Wi-fi Internet</li>
               <li>Work desk</li>
               <li>24 X 7 Medical Facility</li>
               <li>Hygenic Washroom</li>
            </ul>
           </div>
           <div>
            <h1>Security Features</h1>
            <p>Ensuring your safety with advanced security measures.</p>
            <ul>
               <li>24 X 7 CC TV Surveillance</li>
               <li>Restaurant</li>
               <li>Breakfast, Lunch, Dinner</li>
               <li>Mineral Water</li>
               <li>Dataport</li>
               <li>Water Purification System</li>
               </ul>
           </div>
           <div>
           <h1>Campus Amenities</h1>
           <p>Enjoy additional amenities within our lush green campus.</p>
            <ul>
               <li>Car Parking</li>
               <li>Lush Green Campus</li>
               <li>24 X 7 Security service</li>
               <li>Telephone service</li>
               <li>Laundry service</li>
               <li>Tea making (in Room) facilities</li>
               </ul>
           </div>
           <div>
           <h1>Comfortable Rooms</h1>
           <p>We provide cozy and comfortable rooms for a pleasant stay.</p>
            <ul>
               <li>Car Parking</li>
               <li>Lush Green Campus</li>
               <li>24 X 7 Security service</li>
               <li>Telephone service</li>
               <li>Laundry service</li>
               <li>Tea making (in Room) facilities</li>
               </ul>
           </div>
           </div>
       </div>
       </div>
  )
}
