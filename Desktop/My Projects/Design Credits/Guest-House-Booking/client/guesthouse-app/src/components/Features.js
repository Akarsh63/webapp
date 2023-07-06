import React from 'react'
import './features.css'
import Guesthouse from '../images/guesthouse.jpg';
export default function Features() {
  return (
    <div className='main_about'>
       <div className='about'>
            <div className='about_img'>
                <img src={Guesthouse} alt="Guest hpouse" />
            </div>
            <div className='about_desc'>
                <div>What we Provide?</div>
                <ul>
                    <li>1. A well furnished, air-conditioned guest house </li>
                    <li>2. WIFI connectivity</li>
                    <li>3. Private Ensuite bathroom</li>
                    <li>4. Breakfast, Lunch and Dinner </li>
                    <li>5. Writing Table, Wardrobe and Luggage Rack </li>
                </ul>
            </div>
       </div>
    </div> 
    
  )
}
