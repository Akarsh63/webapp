import React from 'react';
import './contactus.css';
import Contactcomponent from './Contactcomponent';
import { Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
export default function Contactus() {
  return (
    <div className='homecomp5'>
    <Box className='contact-details'>
      <Contactcomponent
        heading={"Address"}
        data={
          "NH 62, Surpura Bypass Rd, Karwar, Jheepasani, Rajasthan 342030"
        }
        icon={<LocationOnIcon sx={{ fontSize: '40px', fill: '#1e1e1e' }} />}
      />
      <Contactcomponent 
      heading={"Phone Number"} 
      data={"+191 280195"} 
      icon={< PhoneIcon sx={{ fontSize: '40px', fill: '#1e1e1e' }}/>}
       />
      <Contactcomponent 
      heading={"Email"} 
      data={"guesthouse@iitj.ac.in"}
      icon={<MailIcon sx={{ fontSize: '40px', fill: '#1e1e1e' }}/>}
      />
    </Box>
    </div>
  );
}
