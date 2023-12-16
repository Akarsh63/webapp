import { Box } from '@mui/material'
import React, { useState } from 'react'
import FacultiesLogin from './FacultiesLogin';
import Facultyregistration from './Facultyregistration';

export default function Facultylogin() {
    const [facultyLogin,setfacultyLogin]=useState(0);
  const renderLoginform = (loginPage) => {
    switch (loginPage) {
        case 0:
          return(
            <FacultiesLogin setfacultyLogin ={setfacultyLogin}/>
          );
          case 1:
              return(
                <Facultyregistration setfacultyLogin ={setfacultyLogin}/>
              );
          default:
            return null;
        }
      };
  return (
    <Box
      sx={{
        background:`linear-gradient(0deg,rgba(7,15,41,.8549019607843137),rgba(25,34,61,.623) 20%,rgba(84,103,161,.39),hsla(0,0%,100%,0)),url('https://www.hindustantimes.com/ht-img/img/2023/06/09/1600x900/iit_jodhpur_1686300921343_1686300927090.jpg') `,
        // backgroundImage: `url('https://www.hindustantimes.com/ht-img/img/2023/06/09/1600x900/iit_jodhpur_1686300921343_1686300927090.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        padding: '3%',
        display:'flex',
        justifyContent: 'center',
        height:'100vh',
        opacity:'1',
        alignItems:'center'
      }}
    >
{renderLoginform(facultyLogin)}
    </Box>
  )
}