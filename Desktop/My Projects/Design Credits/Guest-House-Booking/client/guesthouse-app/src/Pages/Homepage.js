import React, { useEffect } from 'react'
import Header from '../components/Header'
import Contactus from '../components/Contactus'
import Features from '../components/Features'
import Footer from '../components/Footer'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
export default function Homepage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  useEffect(()=>{if(!cookies.access_token){navigate('/')}})
  return (
    <div>
      <Header />
      <Features />
      <Contactus />
      <Footer />
    </div>
  )
}
