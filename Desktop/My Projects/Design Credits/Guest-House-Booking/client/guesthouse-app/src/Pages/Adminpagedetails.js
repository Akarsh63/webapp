import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const Detail =(() =>{ 
    const navigate = useNavigate();
    const [cookies] = useCookies(['admin_access_token']);
    useEffect(()=>{if(!cookies.admin_access_token){navigate('/adminlogin')}})
    const [booking,setbooking]=useState([]);
    useEffect(()=>{
        const getting=async()=>{
              try{
                const response= await axios.get(`http://localhost:8082/admibookings/bookings`, {
                    headers: {
                      'x-token': cookies.admin_access_token
                    }
                  })
                setbooking(response.data.Bookings);
              }
            catch(error) {
                console.log(error);
            }}
        getting();
    },[]);
    
    return <Card booking={booking}  />;
});
    
export default Detail;