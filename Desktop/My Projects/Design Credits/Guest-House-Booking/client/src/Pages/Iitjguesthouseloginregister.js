import * as React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import './login.css'
import {  useNavigate } from 'react-router-dom';

export default function Iitjguesthouseloginregister() {
  const navigate = useNavigate();
  const [loginType, setLogintype] = React.useState('');
  const handleChange = (event) => {
    setLogintype(event.target.value);
  };
  const handlelogin=(e)=>{
    if(loginType===""){
alert('fill all')
    }
    else if(loginType===1){
      navigate('/admin-login')
    }
    else if (loginType===3){
      navigate('/student-login')
    }
    else if(loginType===2){
      navigate('/faculty-login')
    }
  }
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
      <Grid container sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <Grid item>
        <Typography 
           sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '60px',
              borderBottom: '2px solid #fff',
              padding: '10px',
              textAlign:'center'
            }}
            className='animatedtext'
          >
            GUEST HOUSE BOOKING
          </Typography>

        </Grid>
        <Grid item>
          <Typography className='animatedtext animatedtext2' sx={{color:'#fff',fontWeight:'600',fontSize:'27px',marginTop:'10px',textAlign:'center'}}>Indian Institute of Technology Jodhpur</Typography>
        </Grid>
        <Grid container sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:'20px',gap:'20px'}} className='logintype' >
          <Grid item>
              <FormControl variant="filled" sx={{ m: 1, minWidth:200,backgroundColor:'#fff'}} className='logintype-container'>
                <InputLabel id="demo-simple-select-filled-label">Select User Type</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={loginType}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={2}>Faculty</MenuItem>
                  <MenuItem value={3}>Student</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          <Grid item>
              <Button variant='outlined' style={{borderColor:'#fff',color:'#fff',padding:'10px'}} endIcon={<LoginOutlinedIcon />} onClick={handlelogin} className='logintype-button'>Login</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
