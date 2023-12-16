import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './facultyform.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Modal from '@mui/material/Modal';
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import './facultyform.css'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios'
export default function Facultyform() {
  const steps = ['Fill the details', 'Add your preferences', 'Final'];
  const [activeStep, setActiveStep] = useState(0);
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  
  const handleNext = () => {
    if (activeStep === 0){
      if (selectedStartDate !=null && selectedEndDate!=null){
        console.log()
         setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      else{
        alert('Please enter the from date and end date.')
      }
    }
    if(activeStep === 1){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep ===2){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const navigate = useNavigate();
  const handleReset = (route) => {
    // alert('Completed Booking!')
    navigate(route);
  };
  const [cookies] = useCookies('faculty_access_token');
  // console.log("faculty_token ",cookies.faculty_access_token)
  const [selectedStartDate,setselectedStartDate]=useState(null);
  const [selectedEndDate,setselectedEndDate]=useState(null);
  const [doubleRooms,setdoubleRooms]=useState([])
  const [singleRooms,setsingleRooms]=useState([]);
  const [deluxeRooms,setdeluxeRooms]=useState([]);
  // const [doubleRooms]=useState(['101','102','103']);
  // const [singleRooms]=useState(['104','105','106']);
  // const [deluxeRooms]=useState(['107','108','109']);
  const filterroom = async (room) => {
    const detail = await axios.get(`http://localhost:8082/bookings/${room}`, {
      headers: {
        'x-token': cookies.faculty_access_token
      }
    });
    
    const bookingdetails = detail.data.bookingdetail;
    const fromdate = bookingdetails.fromdate;
    const enddate = bookingdetails.enddate;
    const savedCheckinObj = new Date(selectedStartDate);
    const savedCheckoutObj = new Date(selectedEndDate);
    const fromDateObj = new Date(fromdate.split('-').reverse().join('-'));
    const endDateObj = new Date(enddate.split('-').reverse().join('-'));
    // console.log(fromDateObj)
    // console.log(endDateObj)
    // console.log(savedCheckinObj)
    // console.log(savedCheckoutObj)
    if (
      (fromDateObj <= savedCheckoutObj && fromDateObj >= savedCheckinObj) ||
      (endDateObj >= savedCheckinObj && endDateObj <= savedCheckoutObj)||(savedCheckinObj <= endDateObj && savedCheckinObj >= fromDateObj) ||
      (savedCheckoutObj >= fromDateObj && savedCheckoutObj <= endDateObj)
    ) {
      if(bookingdetails.status==="Approved"||bookingdetails.status==="Pending"){return true;}
      else{
        return false;
      }
    } else {
      console.log("no");
      return false;
  };
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allrooms = await axios.get("http://localhost:8082/rooms/allrooms", {
          headers: {
            'x-token': cookies.faculty_access_token
          }
        });
        // console.log("allrooms",allrooms)
        const newdeluxerooms = allrooms.data.alldeluxerooms;
        const newsinglerooms = allrooms.data.allsinglerooms;
        const newdoublerooms = allrooms.data.alldoublerooms;
        const singleroomsg = await Promise.all(
          newsinglerooms.map(async (deluxeroom) => {
            const newdeluxeroom = await Promise.all(
              deluxeroom.booking.map(async (room) => {
                const isValid = await filterroom(room);
                if (isValid) {
                  return room;
                }
                return null;
              })
            ).then((filteredRooms) => filteredRooms.filter(Boolean));
            
            // console.log(newdeluxeroom);
            if (newdeluxeroom.length === 0) {
              // console.log(deluxeroom)
              return deluxeroom;}
             }
          )
        );

        const doubleroomsg = await Promise.all(
          newdoublerooms.map(async (deluxeroom) => {
            const newdeluxeroom = await Promise.all(
              deluxeroom.booking.map(async (room) => {
                const isValid = await filterroom(room);
                if (isValid) {
                  return room;
                }
                return null;
              })
            ).then((filteredRooms) => filteredRooms.filter(Boolean));
            
            // console.log(newdeluxeroom);
            if (newdeluxeroom.length === 0) {
              // console.log(deluxeroom)
              return deluxeroom;}
             }
             
          )
        );
        const deluxeroomsg = await Promise.all(
          newdeluxerooms.map(async (deluxeroom) => {
            const newdeluxeroom = await Promise.all(
              deluxeroom.booking.map(async (room) => {
                const isValid = await filterroom(room);
                if (isValid) {
                  return room;
                }
                return null;
              })
            ).then((filteredRooms) => filteredRooms.filter(Boolean));
            
            // console.log(newdeluxeroom);
            if (newdeluxeroom.length === 0) {
              // console.log(deluxeroom)
              return deluxeroom;}
             }
             
          )
        );
        const singlerooms=singleroomsg.filter(Boolean);
        const deluxerooms=deluxeroomsg.filter(Boolean);
        const doublerooms=doubleroomsg.filter(Boolean);
        // console.log(singlerooms)
        // console.log(deluxerooms)
        // console.log(doublerooms)
        setdeluxeRooms(deluxerooms)
        setsingleRooms(singlerooms)
        setdoubleRooms(doublerooms)
      } catch (err) {
        console.log(err)
        // alert(err);
      }
    };

    fetchData();
  },[selectedEndDate,selectedStartDate]);

  const [detail,setdetail]=useState({fname1:'',lname1:'',email:"",phone:'',address:'',person:'',roomstype:[],roomnumber:[],meal:'',purpose:'',request:''});

  const handleFormSubmission = async () => {
    console.log(detail.roomnumber)
    if (
      detail.roomnumber.length !== 0 &&
      detail.person !== undefined && detail.person !== null && detail.person !== '' &&
      detail.meal !== undefined && detail.meal !== null && detail.meal !== ''
    ) {
      console.log(detail.roomnumber)
    try {
        toggleModal();

        const startdateObject = new Date(selectedStartDate);
        const startformattedDate = `${startdateObject.getDate()}-${startdateObject.getMonth() + 1}-${startdateObject.getFullYear()}`;
        const enddateObject = new Date(selectedEndDate);
        const endformattedDate = `${enddateObject.getDate()}-${enddateObject.getMonth() + 1}-${enddateObject.getFullYear()}`;

        const response = await axios.post(
        'http://localhost:8082/bookings/book',
        {
          Firstname: detail.fname1,
          Lastname: detail.lname1,
          Email: detail.email,
          Phonenumber: detail.phone,
          Address: detail.address,
          Rooms: detail.roomnumber,
          Roomstype: detail.roomstype,
          Adults: detail.person,
          Meals: detail.meal,
          // purpose: detail.purpose,
          Specialrequest: detail.request,
          Fromdate: startformattedDate,
          Enddate: endformattedDate,
        },
        {
          headers: {
            'x-token': cookies.faculty_access_token,
            'Content-Type': 'application/json', 
          },
        }
      );
    
      console.log(response.data);
      console.log('POST request successful', response.data);
      alert('Booking Completed');
      setdetail({fname1:'',lname1:'',email:"",phone:'',address:'',person:'',roomstype:[],roomnumber:[],meal:'',purpose:'',request:''});
      setselectedStartDate('');
      setselectedEndDate('');
      handleNext();
    } catch (error) {
      // Handle errors here
      console.error('Error making POST request', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      }
    }
  } else {
    alert('Please fill all the details!')
    toggleModal()
  }
  
  };
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleCheckboxChange = (roomnumber) => {
    if (selectedRooms.includes(roomnumber)) {
      setSelectedRooms(selectedRooms.filter((room) => room !== roomnumber));
    } else {
      setSelectedRooms([...selectedRooms, roomnumber]);
    }
  };

  useEffect(() => {
    console.log(selectedRooms);
    setdetail({ ...detail, roomnumber: selectedRooms });
  }, [selectedRooms]);
  

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
        case 0:
        return (
          <Grid container sx={{ display: 'flex !important', flexDirection: 'column', gap: '30px',padding:'30px 20px 0px',width:'1005' }}>
           <Typography>Pickup the Start and End dates</Typography>
           <Grid item sx={{display:'flex',flexDirection:'row',gap:'80px'}} className='page1'>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'DatePicker'
                ]}
              >
                <DemoItem label="Start Date">
                  <DatePicker defaultValue={dayjs('')} value={selectedStartDate}
                  onChange={(date)=>setselectedStartDate(date)}/>
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'DatePicker'
                ]}
              >
                <DemoItem label="End Date">
                  <DatePicker defaultValue={dayjs('')} value={selectedEndDate}
                   onChange={(date)=>setselectedEndDate(date)}/>
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            </Grid>
          </Grid>
        );
      case 1:
        return (
<Grid container sx={{ display: 'flex !important', flexDirection: 'row', justifyContent: 'space-between', gap: '60px',padding:'30px 20px 10px' }} className='page2'>
            <Grid item>
              <Typography style={{fontSize:'17px',marginBottom:'5px'}}>Guest First Name</Typography>
              <TextField type="text" variant='outlined'   value={detail.fname1} onChange={(event)=>setdetail({...detail,fname1:event.target.value})} placeholder="First name" sx={{width:'320px'}} className='textfeild'/>
            </Grid>

            <Grid item>
                <Typography style={{fontSize:'17px',marginBottom:'5px'}}>Guest Last name</Typography>
                <TextField type="text" variant='outlined'   value={detail.lname1} onChange={(event)=>setdetail({...detail,lname1:event.target.value})} placeholder="Last name" sx={{width:'320px'}} className='textfeild'/>
            </Grid>

            <Grid item >
                <Typography style={{fontSize:'17px',marginBottom:'5px'}}>Guest Email</Typography>
                <TextField type="text" value={detail.email} onChange={(event)=>setdetail({...detail,email:event.target.value})} variant='outlined' placeholder="Email" sx={{width:'320px'}} className='textfeild'/>
            </Grid>

            <Grid item>
                <Typography style={{fontSize:'17px',marginBottom:'5px'}}>Guest Phone number</Typography>
                <TextField
                        type="text"
                        variant='outlined'
                        placeholder="Phone number"
                        value={detail.phone}
                        onChange={(event)=>setdetail({...detail,phone:event.target.value})}
                        sx={{
                          width: '320px',
                          
                        }}
                        className='textfeild'
                      />

            </Grid>

            <Grid item>
                <Typography style={{fontSize:'17px',marginBottom:'5px'}}>Guest Current Address</Typography>
                <TextField type="text" variant='outlined'   value={detail.address} onChange={(event)=>setdetail({...detail,address:event.target.value})}  placeholder="Address" sx={{width:'320px'}} className='textfeild'/>
            </Grid>

            <Grid item>
                <Typography style={{fontSize:'17px',marginBottom:'5px'}}>Purpose of Visit</Typography>
                <TextField type="text" variant='outlined'   value={detail.purpose} onChange={(event)=>setdetail({...detail,purpose:event.target.value})} placeholder="Purpose" sx={{width:'320px'}} className='textfeild'/>
            </Grid>

          </Grid>
        );
      case 2:
        return (
          <Grid container   sx={{ display: 'flex !important', flexDirection: 'column', gap: '35px',padding:'30px 20px 0px' }}>
            <Grid item sx={{ display: 'flex',flexDirection:'row',width:'100%'}}>
            <FormControl sx={{ display: 'flex',flexDirection:'row',gap:'10px',alignItems:'center'}} size="small" >
                <Typography>Choose number of persons:</Typography>
                <Select sx={{padding:'0px 7px'}} value={detail.person} onChange={(e)=>setdetail({...detail,person:e.target.value})}>
                    <MenuItem value={1}>1 Person</MenuItem>
                    <MenuItem value={2}>2 Persons</MenuItem>
                    <MenuItem value={3}>3 Persons</MenuItem>
                    <MenuItem value={4}>4 Persons</MenuItem>
                    <MenuItem value={5}>5 Persons</MenuItem>
                    <MenuItem value={6}>6 Persons</MenuItem>
                    <MenuItem value={7}>7 Persons</MenuItem>
                    <MenuItem value={8}>8 Persons</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item sx={{ display: 'flex',flexDirection:'column',width:'100%'}}>
                <Typography>Select the rooms from below</Typography>
                <Grid container sx={{display:'flex',gap:'10px',flexDirection:'column',marginTop:'5px'}}>
                    <Grid item>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>Double Rooms</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <FormGroup>
                                <Typography sx={{marginBottom:'10px'}}>Our Double room is large and comfortable. It's spacious enough for two adults and comfortable. The room is thoughtfully furnished and equipped with all the essentials for a pleasant stay.</Typography>
                                {doubleRooms.map((doubleroom)=>{
                                    return <FormControlLabel control={<Checkbox />} label={doubleroom.roomnumber} onChange={() => handleCheckboxChange(doubleroom._id)}/>
                                })}
                            </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>Single Rooms</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <FormGroup>
                            <Typography sx={{marginBottom:'10px'}}>Our Sinle room is large and comfortable. It's spacious enough for one adult and comfortable. The room is thoughtfully furnished and equipped with all the essentials for a pleasant stay.</Typography>
                                {singleRooms.map((singleroom)=>{
                                    return <FormControlLabel control={<Checkbox />} label={singleroom.roomnumber} onChange={() => handleCheckboxChange(singleroom._id)}/>
                                })}
                            </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>Deluxe Rooms</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <FormGroup>
                            <Typography sx={{marginBottom:'10px'}}>Our Deluxe room is large and comfortable. It's spacious enough for four adults and comfortable. The room is thoughtfully furnished and equipped with all the essentials for a pleasant stay.</Typography>
                                {deluxeRooms.map((deluxeroom)=>{
                                    return <FormControlLabel control={<Checkbox />} label={deluxeroom.roomnumber} onChange={() => handleCheckboxChange(deluxeroom._id)}/>
                                })}
                            </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Choose the Meal Plan</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={detail.meal}
                    onChange={(event) => setdetail({ ...detail, meal: event.target.value })}
                >
                    <FormControlLabel value="roomonly" control={<Radio />} label="Room Only" />
                    <FormControlLabel value="breakfast" control={<Radio />} label="Breakfast" />
                    <FormControlLabel value="brunch" control={<Radio />} label="Brunch (Breakfast and Lunch)" />
                    <FormControlLabel value="threesquaremeals" control={<Radio />} label="Three square meals" />
                </RadioGroup>
            </FormControl>
            </Grid>
          </Grid>
        );
      
      default:
        return null;
    }
  };
  return (
    <Box sx={{ width: '100%', padding: '70px 90px 0px' }} className='mainbox'>
      <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <Box
              position="relative"
              maxWidth="500px"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              shadow="xl"
              style={{margin:'0 10px'}}
              sx={{backgroundColor:'white'}}
            >
              <Box display="flex" alginItems="center" justifyContent="space-between" p={2}>
                <Typography variant="h5">Confirm your Booking</Typography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box p={2} >
                <Typography variant="body2" sx={{color:'#333'}} fontWeight="regular">
                  You can't make changes in the booking further.
                  Are you sure to confirm the booking?
                  <br />
                </Typography>
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box display="flex" justifyContent="space-between" p={1.5}>
                <Button variant="gradient" color="dark" onClick={toggleModal}>
                  Close
                </Button>
                <Button variant="gradient" color="info" onClick={() => { handleFormSubmission(); }}>
                  Book Now
                </Button>
              </Box>
            </Box>
          </Slide>
        </Modal>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1,padding:'30px 20px 10px' }} >
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={()=>{handleReset('/facultybookings')}}>Go to Bookings Page</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              onClick={() => {
                if (activeStep === steps.length - 1) {
                  toggleModal(); 
                } else {
                  handleNext();
                }
              }}
            >
              {activeStep === steps.length - 1 ? 'Book' : 'Next'}
            </Button>

          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
