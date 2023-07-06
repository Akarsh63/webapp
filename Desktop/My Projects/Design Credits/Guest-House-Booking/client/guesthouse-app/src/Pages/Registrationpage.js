
import React,{useState}  from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import './registration.css'
import signUpImage from '../images/singUp-image.jpg';
import { FaUser,FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";
export default function Registrationpage() {
   const [Registrationinfo,setRegistraioninfo]=useState({
     username:'',
     email:'',
     password:'',
   })
   const navigate = useNavigate();
   const handlechange = (event) => {
    const { name, value } = event.target;
    setRegistraioninfo({ ...Registrationinfo, [name]: value });
  };
  const  onsubmit= async (e)=>{
    e.preventDefault();
    try{
      const {username,email,password}=Registrationinfo;
      const user = await axios.post('http://localhost:8082/users/register',{username,email,password});
      alert("Successfully registered!Login now")
      navigate('/')
    }
    catch(err){
        alert(err.response.data.message)
    }
    
    
  }
  return (
    <div className='main'>
      <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Register</h2>
                        <form class="register-form" id="register-form" onSubmit={onsubmit}>
                            <div class="form-group">
                                <label for="username" className='lbl'><FaUser class="material-icons-name"/></label>
                                <input value={Registrationinfo.username} onChange={handlechange} type='text' placeholder='Username' name='username' id='username' class="input_res" required/>
                            </div>
                            <div class="form-group">
                                <label for="email" className='lbl'><MdMail class="zmdi zmdi-email"/></label>
                                <input  value={Registrationinfo.email} onChange={handlechange} type='text' placeholder='james.bond@spectre.com' name='email' id='email' class="input_res" required/>
                            </div>
                            <div class="form-group">
                                <label for="pass" className='lbl'><FaLock class="material-icons-name"/></label>
                                <input value={Registrationinfo.password} onChange={handlechange} type='password' placeholder='Password' name='password' id='pass' class="input_res" required/>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit reg" value="Register"/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src={signUpImage} alt="sing up image" /></figure>
                        <Link to='/' class="signup-image-link">I am already a member</Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
