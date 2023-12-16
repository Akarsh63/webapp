import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Box, Button, Grid, Typography } from '@mui/material';
import './facultybooking.css';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
const style = {
   
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   borderRadius:"10px",
   bgcolor: 'background.paper',
   boxShadow: 24,
   // p: 3,
   width:'550px'
 };


export default function Facultybookings() {
   const [allbookings, setbookings] = useState([]);
   const navigate=useNavigate()
   const [userinfo,setuserinfo]=useState()
   const [cookies] = useCookies(['faculty_access_token']);
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get('http://localhost:8082/bookings/book', {
           headers: {
             'x-token': cookies.faculty_access_token,
           },
         })
         setbookings(response.data.Bookings.reverse());
         setuserinfo(response.data.User);
         console.log(allbookings);
       } catch (error) {
         alert(error);
       }
     };
  
     fetchData();
   }, []);
  
   const roomnumbers = (rooms) => {
     if (rooms.length === 1) {
       return <div>{rooms[0]}</div>;
     } else {
       let text = '';
       for (let i = 0; i < rooms.length; i++) {
         text += rooms[i].toString();
         if (i !== rooms.length - 1) {
           text += ' , ';
         }
       }
       return <div>{text}</div>;
     }
   };
   const [open, setOpen] = useState(false);
   const handleopen=()=>{
      setOpen(true);
   }
   const handleclose=()=>{
      setOpen(false);
   }
   
  return (
   
    <Box sx={{backgroundColor:'#f2f2f2',minHeight:'100vh'}} >
        <Box sx={{padding:'50px 160px 0px',position:'sticky',zIndex:2,top:'0px',backgroundColor:'#afb3ba'}} className='box1'>
        <Button sx={{backgroundColor:'#1976d2',color:'#fff',marginBottom:'20px'}} onClick={()=>{navigate('/facultyHomaPage')}}>Home</Button>
           <Grid container style={{display:'flex',flexDirection:'column',backgroundColor:'#fff',borderRadius:'8px 8px 0 0 ',boxShadow:'0 2px 20px 0 rgba(0,0,0,.1)',padding:'20px 20px 30px'}} >
            
            <Grid item style={{textAlign:'center',}}>
                <Typography style={{color:'#000',fontWeight:'500',fontSize:'23px'}}>ALL BOOKINGS</Typography>
            </Grid>
           </Grid>
         </Box>
        <Box sx={{padding:'0px 160px 40px',position:'relative',backgroundColor:'#f2f2f2' }} className='box2'>
           <Grid container style={{display:'flex',flexDirection:'column',backgroundColor:'#fff',borderRadius:'10px',boxShadow:'0 3px 30px 0 rgba(0,0,0,.1)',gap:'24px',padding:'40px 60px 30px'}} className='contcont'>
            {allbookings.map((booking)=>{
               return <Grid item sx={{boxShadow:'0 3px 2px -2px rgba(0,0,0,.07), 0 1px 5px 0 rgba(74,74,74,.2), 0 2px 2px 0 rgba(74,74,74,.2)',display:'flex',flexDirection:'column'}}>
               <Grid container sx={{padding:'20px 50px',boxShadow:'0 1px 6px 0 rgba(0,0,0,.2)',display:'flex',flexDirection:'row',justifyContent:'space-between',gap:'20px'}} className='cont1' >
                  <Grid item sx={{display:'flex',flexDirection:'column'}}>
                    <Grid item >
                       <Typography sx={{fontWeight:'620',fontSize:'21px',padding:'5px 10px'}} className='facid'>#{booking._id}</Typography>
                    </Grid>
                    <Grid item sx={{display:'flex',flexDirection:'row',padding:'10px 10px 0px 10px',gap:'13px'}} className='hedstails'>
                       <Grid item>
                       <Typography color='green' sx={{fontSize:'14px',fontWeight:'700'}}>{booking.status}</Typography>
                       </Grid>
                       <Grid item>
                       <Typography sx={{fontSize:'14px',fontWeight:'500'}}>{booking.bookedon}</Typography>
                       </Grid>
                       <Grid item>
                       <Typography sx={{fontSize:'14px',fontWeight:'300'}}>{userinfo.email}</Typography>
                       </Grid>
                    </Grid>
                  </Grid>
                    <Grid item sx={{display:'flex',alignItems:'center'}}>
                       <Button
                           startIcon={<VisibilityIcon />}
                           onClick={handleopen}
                           sx={{
                             color: '#fff',
                             opacity: '.9',
                             boxShadow: '0 3px 4px 0 rgba(0, 0, 0, .2)',
                             backgroundColor: '#1976d2',
                             padding: '10px 20px',
                             borderRadius: '25px',
                             '&:hover': {
                             backgroundColor: '#1976d2', 
                             },
                         }}
                           >
                           
                           View Booking

                           </Button>
                           <Grid>
                              <Modal
                                 open={open}                             
                                 onClose={handleclose}
                                 aria-labelledby="Details"
                                 aria-describedby="Description">
                                 <Box sx={style}>
                                    <Grid className='facbookdet' style={{backgroundColor:"#48494B",display:"flex",justifyContent:"space-between"}}>
                                       <Typography id="Details" variant="h6" component="h1" style={{fontWeight:"bold",fontSize:"25px",color:"white",marginLeft:"10px"}}>
                                             Bookings
                                       </Typography>
                                       <Typography style={{marginRight:"10px",cursor:"pointer"}}>
                                          <CloseIcon onClick={handleclose}/>
                                       </Typography>
                                    </Grid>
                                    <Grid style={{display:"flex",flexDirection:"column",marginLeft:"25px",marginTop:"15px"}}>
                                       <Typography variant="subtitle1" style={{ marginBottom: '0px',fontSize:"13px" }}>
                                             Name: {userinfo.username}
                                             {/* Email: john.doe@example.com */}
                                       </Typography>
                                       <Typography variant="subtitle1" style={{ marginBottom: '0px',fontSize:"13px" }}>
                                             Email: {userinfo.email}
                                       </Typography>
                                       <Typography variant="subtitle1" style={{ marginBottom: '0px',fontSize:"13px" }}>
                                             phone Number: {booking.phonenumber}
                                       </Typography>
                                    </Grid>
                                    
                                    <Grid style={{backgroundColor:"#EEEEEE",marginBottom:"60px",marginTop:"40px",padding:"25px"}}>
                                       <Typography style={{fontWeight:"bold",fontSize:"20px",color:"#48494B"}}>Details</Typography>
                                      
                                    <Grid style={{padding:"0px",backgroundColor:"#EEEEEE"}}>
                                       <Typography id="Description" sx={{ mt: 2 }}>
                                    <Grid container>
                                       <Grid item xs={6} >
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             Name: {booking.firstname} {booking.lastname}
                                          </Typography>
                                       </Grid>
                                       <Grid item xs={6}>
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             Email: {booking.email}

                                          </Typography>
                                       </Grid>
                                    </Grid>
                                    <Grid container>
                                       <Grid item xs={6}>
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             Phone number: {booking.phonenumber}
                                          </Typography>
                                       </Grid>
                                       <Grid item xs={6}>
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             Address: {booking.address}
                                          </Typography>
                                       </Grid>
                                    </Grid>
                                    <Grid container>
                                       <Grid item xs={6}>
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             FromDate: {booking.fromdate}
                                          </Typography>
                                       </Grid>
                                       <Grid item xs={6}>
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             EndDate: {booking.enddate}
                                          </Typography>
                                       </Grid>
                                    </Grid>
                                    <Grid container>
                                       <Grid item xs={6}>
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             number of rooms: {booking.rooms.length}
                                          </Typography>
                                       </Grid>
                                       <Grid item xs={6}>
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             room number: {booking.rooms}
                                          </Typography>
                                       </Grid>
                                    </Grid>
                                    <Grid container>
                                       <Grid item xs={6}>
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             Meals: {booking.meals}
                                          </Typography>
                                       </Grid>
                                       <Grid item xs={6}>
                                          <Typography style={{color:"black",fontSize:"15px"}}>
                                             request: None
                                          </Typography>
                                       </Grid>
                                    </Grid>
                                    </Typography>
                                    </Grid>
                                    </Grid>
                                 </Box>
                              </Modal>
                            </Grid>
                    </Grid>
               </Grid>
               <Grid item sx={{padding:'34px 55px 42px'}} className='cont2'>
                  <Grid container sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:'15px'}} className='botstails' >
                    <Grid item>
                       <Typography>From</Typography>
                       <Typography sx={{color:'#000',fontWeight:'500'}}>{booking.fromdate}</Typography>
                    </Grid>
                    <Grid item>
                       <Typography>To</Typography>
                       <Typography sx={{color:'#000',fontWeight:'500'}}>{booking.enddate}</Typography>
                    </Grid>
                    <Grid item>
                       <Typography sx={{color:'#000',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'500'}}><AccountCircleIcon  sx={{color:'grey',marginRight:'5px'}}/>{userinfo.username}</Typography>
                    </Grid>
                    <Grid item>
                       <Typography>Rooms Allocated</Typography>
                       <Typography sx={{color:'#000',fontWeight:'500'}}>{booking.rooms}</Typography>
                    </Grid>
                  </Grid>
               </Grid>
           </Grid>
        
            })}
           
           </Grid>
        </Box>
        {/* <Box sx={{textAlign:'center'}}>
        <img src={nodataGif} alt="No Bookings Yet" style={{maxHeight:'700px',minHeight:'400px !important'}}/>
        </Box> */}
        
    </Box>
  );
}