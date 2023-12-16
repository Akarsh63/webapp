import { Box } from '@mui/material'
import React, { useState } from 'react'
import Loginpage from './Loginpage';
import Registrationpage from './Registrationpage';

export default function Studentlogin() {
    const [studentLogin,setStudentlogin]=useState(0);
  const renderLoginform = (loginPage) => {
    switch (loginPage) {
        case 0:
          return(
            <Loginpage setStudentlogin ={setStudentlogin}/>
          );
          case 1:
              return(
                <Registrationpage setStudentlogin ={setStudentlogin}/>
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
{renderLoginform(studentLogin)}
    </Box>
  )
}
