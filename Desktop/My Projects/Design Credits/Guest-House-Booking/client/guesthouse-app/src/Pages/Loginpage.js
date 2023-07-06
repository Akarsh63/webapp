import React,{useState}  from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
import './registration.css'
import signInImage from '../images/singIn-image.jpg';
import { FaUser,FaLock } from "react-icons/fa";
// import Userid from '../UserId/Userid';

export default function Loginpage() {
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
    <div className='main'>
       <section className="sign-in">
            <div className='logintype'>
              <div className='logintypes'><Link to="/">User Login</Link></div>
              <div className='logintypes'><Link to='/adminlogin'>Admin Login</Link></div>
              
            </div>
            <div className="container">
              
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={signInImage} alt="sing up image" /></figure>
                        <Link to='/register' className="signup-image-link">Create an account</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                        <form onSubmit={onsubmit} className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="your_name" className='lbl'><FaUser className="material-icons-name"/></label>
                                <input value={logininfo.username} onChange={handlechange} type='text' placeholder='Username' name='username' id='your_name' className="input_res" autoComplete='off' required/>
                            </div>
                            <div className="form-group">
                                <label for="your_pass" className='lbl'><FaLock/></label>
                                <input value={logininfo.password} onChange={handlechange} type='password' placeholder='Password' name='password' id='your_pass' className="input_res" autoComplete='off' required/>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    </div>
  )
}
