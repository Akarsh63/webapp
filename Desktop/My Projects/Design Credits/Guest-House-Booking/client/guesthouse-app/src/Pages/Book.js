import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Route,Routes, useNavigate } from 'react-router-dom'
import Allrooms from './Allrooms'
import Checkavaibility from '../components/Checkavaibility'
import Formsumission from './Formsumission'
import Features from '../components/Features'
import Footer from '../components/Footer'
import { useCookies } from 'react-cookie'

export default function Book() {
        const navigate = useNavigate();
        const [accomodation,setaccomodation]=useState(-1);
        const [cookies] = useCookies(['access_token']);
        useEffect(()=>{if(!cookies.access_token){navigate('/')}})
  return (
    <>
        <Header/>
        <Routes>
            <Route path='/' element={<Checkavaibility />} />
            <Route path='/rooms' element={<Allrooms setaccomodation={setaccomodation} />}/>
            <Route path='/bookingpage' element={<Formsumission accomodation={accomodation}/>} />
        </Routes>
        <Features />
        <Footer />
    </>

  )
}
