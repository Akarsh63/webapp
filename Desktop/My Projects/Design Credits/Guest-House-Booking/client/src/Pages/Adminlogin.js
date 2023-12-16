import React,{useState}  from 'react'
import {useNavigate,Link } from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
import './registration.css'
import { FaUser,FaLock } from "react-icons/fa";
import { Box, TextField } from '@mui/material';


export default function AdminLoginpage() {
  const [_, setCookies] = useCookies(["admin_access_token"]);
   const [logininfo,setLogninfo]=useState({
     username:'',
     password:'',
   })
   const navigate = useNavigate();
   const adminhandlechange = (event) => {
    const { name, value } = event.target;
    setLogninfo({ ...logininfo, [name]: value });
  };


  const  onsubmit= async (e)=>{
    e.preventDefault();
    try{
      const {username,password}=logininfo;
      const user = await axios.post('http://localhost:8082/users/adminlogin',{username,password});
      setCookies("admin_access_token", user.data.token);
      if(user.data.token){
        navigate('/dashboard/admins');
      }
    }
    catch(err){
        console.log(err);
        alert(err.response.data.message)
    };
      
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
            <div class="container">
                    <div className="signin-form">
                        <h2 className="form-title">IIT JODHPUR ADMIN LOGIN</h2>
                        <form  className="register-form" onSubmit={onsubmit} id="login-form">
                            <div class="form-group">
                                <TextField sx={{width:'100%',}} id="outlined-basic" label="Username" variant="outlined" value={logininfo.username} onChange={adminhandlechange} autoComplete='off' required placeholder='Username' name='username' className="input_res"/>
                            </div>
                            <div class="form-group">
                            <TextField sx={{width:'100%'}} id="outlined-basic" label="Password" variant="outlined" value={logininfo.password} onChange={adminhandlechange} type='password' placeholder='Password' name='password' className="input_res" autoComplete='off' required/>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
            </div>
    </Box>
  )
}
