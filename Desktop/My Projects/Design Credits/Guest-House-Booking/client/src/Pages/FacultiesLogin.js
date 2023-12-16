import React,{useState}  from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
import './registration.css'
import TextField from '@mui/material/TextField';
import { FaUser,FaLock } from "react-icons/fa";
import { Typography } from '@mui/material';
import moment from 'moment';
// import Userid from '../UserId/Userid';

export default function FacultiesLogin({setfacultyLogin}) {
  const [_, setCookies] = useCookies(["faculty_access_token"]);
   const [logininfo,setLogninfo]=useState({
     username:'',
     password:'',
   })
   const navigate = useNavigate();
   const handlechange = (event) => {
    const { name, value } = event.target;
    setLogninfo({ ...logininfo, [name]: value });
  };
  const  onsubmit= async (e)=>{
    e.preventDefault();
    console.log('22');
    try{
      const {username,password}=logininfo;
      const user1=await axios.post('http://localhost:8082/users/facultylogin',{username,password});
      console.log(user1)
      if(user1.data.token){
        setCookies("faculty_access_token", user1.data.token);
        navigate('/facultyHomaPage');
      }else {
        console.error('userId not found in response data');
      }
    }
    

    catch(err){
        alert(err.response.data.message)
    }
  }
  return (
            <div className="container">
                    <div className="signin-form">
                        <h2 className="form-title">IIT JODHPUR FACULTY LOGIN</h2>
                        <form onSubmit={onsubmit} className="login-form">
                            <div className="form-group">
                                <TextField sx={{width:'100%',}} id="outlined-basic" label="Username Or EmailID" variant="outlined" value={logininfo.username} onChange={handlechange} autoComplete='off' required placeholder='Username' name='username' className="input_res"/>
                            </div>
                            <div className="form-group">
                                 <TextField sx={{width:'100%'}} id="outlined-basic" label="Password" variant="outlined" value={logininfo.password} onChange={handlechange} type='password' placeholder='Password' name='password' className="input_res" autoComplete='off' required/>
                            </div>
                            <div>
                              <Link className='forgotpassword'>Forgot your password?</Link>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                        <Typography sx={{textAlign:'center',color:'grey'}}>
                        Don't have an Account?<Link to='#' className="signup-link" onClick={()=>{setfacultyLogin(1)}}>Create an account</Link>
                        </Typography>
                    </div>
            </div>

  )
}