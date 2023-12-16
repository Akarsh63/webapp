import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Table from '../components/Table';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';



const AdminallBookings=(() =>{ 
    const navigate = useNavigate();
    const [cookies] = useCookies(['admin_access_token']);
    useEffect(()=>{if(!cookies.admin_access_token){navigate('/admin-login')}})
    const [studentbooking,setstudentbooking]=useState([]);
    const [facultybookings,setfacultybookings]=useState([]);
    const [refresh,setrefresh]=useState(false);
    const [change, setChange] = useState(false);
    console.log(change)
     useEffect(()=>{
        console.log(2)
        const getting=async()=>{
           
              try{
                const response= await axios.get(`http://localhost:8082/admibookings/bookings`, {
                    headers: {
                      'x-token': cookies.admin_access_token
                    }
                  })
                setstudentbooking(response.data.Studentbookings);
                setfacultybookings(response.data.Facultybookings)
              }
            catch(error) {
                console.log(error);
            }}
        getting();
    },[refresh]);

    console.log(window.location.href)
    return (
      <Box sx={{paddingTop: '120px',width:'90%',margin:'auto'}}>
        <Grid container sx={{display: 'flex', flexDirection: 'row', gap:'20px'}} >
          <Button variant='contained' onClick={(e) => setChange(false)} style={{backgroundColor:'#696cff'}}>Students</Button>
          <Button variant='contained' onClick={(e) => setChange(true)} style={{backgroundColor:'#696cff'}}>Faculty</Button>
        </Grid>
        {
          change ? (
            <Table booking={facultybookings} setrefresh={setrefresh} />
          ) : (
            <Table booking={studentbooking} setrefresh={setrefresh} />
          )
        }
      </Box>
    );
});
    
export default AdminallBookings;