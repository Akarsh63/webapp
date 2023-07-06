import React,{useState}  from 'react'
import {useNavigate,Link } from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
import './registration.css'
import admin from '../images/admin.png';
import { FaUser,FaLock } from "react-icons/fa";
// import Userid from '../UserId/Userid';


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
    <div className='main'>
       <section class="sign-in">
       <div className='logintype'>
              <div className='logintypes'><Link to="/">User Login</Link></div>
              <div className='logintypes'><Link to="/adminlogin">Admin Login</Link></div>
            </div>
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src={admin} alt="sing up image" /></figure>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Welocme, Admin</h2>
                        <form  className="register-form" onSubmit={onsubmit} id="login-form">
                            <div class="form-group">
                                <label className='lbl' for="your_name"><FaUser className="material-icons-name"/></label>
                                <input className='input_res' value={logininfo.username} onChange={adminhandlechange} type='text' placeholder='Username' name='username' id='your_name' required/>
                            </div>
                            <div class="form-group">
                                <label className='lbl' for="your_pass"><FaLock/></label>
                                <input className='input_res'value={logininfo.password} onChange={adminhandlechange} type='password' placeholder='Password' name='password' id='your_pass' required/>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin"  className="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    
    </div>
  )
}
