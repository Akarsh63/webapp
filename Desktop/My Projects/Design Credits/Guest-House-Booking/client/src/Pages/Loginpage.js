import React,{useState}  from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
import './registration.css'
import TextField from '@mui/material/TextField';
import { FaUser,FaLock } from "react-icons/fa";
import { Typography } from '@mui/material';
// import Userid from '../UserId/Userid';

export default function Loginpage({setStudentlogin}) {
  const [_, setCookies] = useCookies(["access_token"]);
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
    try{
      const {username,password}=logininfo;
      const user = await axios.post('http://localhost:8082/users/login',{username,password});
      setCookies("access_token", user.data.token);
      if(user.data.token){
        navigate('/home');
      }
    }
    catch(err){
        alert(err.response.data.message)
    }
  }
  return (
            <div className="container">
                    <div className="signin-form">
                        <h2 className="form-title">IIT JODHPUR STUDENT LOGIN</h2>
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
                        Don't have an Account?<Link to='#' className="signup-link" onClick={()=>{setStudentlogin(1)}}>Create an account</Link>
                        </Typography>
                    </div>
            </div>

  )
}
