import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './admintable.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const Roomd = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['admin_access_token']);
    useEffect(()=>{if(!cookies.admin_access_token){navigate('/adminlogin')}})
  const [selectoption, setselectoption] = useState("");
  const [inputvalue, setinputvalue] = useState("");
  const [needadmin, setneedadmin] = useState("");
  const [newpass, setnewpass] = useState("");

  const handlesubmitvalue = (e) => {
    setselectoption(e.target.value);
  };
  const handlevalue=(e) =>{
    setneedadmin(e.target.value);
  }
  const handlevaluesubmit=(e) =>{
    setnewpass(e.target.value);
  }

  const handlesubmit = (e) => {
    setinputvalue(e.target.value);
  };

  const submitform = async (e) => {
    e.preventDefault();
    if(selectoption==="" || inputvalue===""){
      alert("Please fill all the details!")
    }
    else{
      await axios.post("http://localhost:8082/rooms/enter", { "roomnumber": selectoption, "options": inputvalue }, {
        headers: {
          'x-token': cookies.admin_access_token
        }
      })
      .then(response => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message)
        alert(error.response.data.message);
      });
    setinputvalue("");
    setselectoption("")
    }
    
  };
  const submitaform = async (e) => {
    e.preventDefault();
    if(needadmin==="" || newpass===""){
      alert("Please fill all the details!")
    }
    else{
        await axios.post("http://localhost:8082/users/newadmin", {
            "username": needadmin,
            "password": newpass
          }, {
            headers: {
              'x-token': cookies.admin_access_token
            }
          })
          .then(response => {
            alert(response.data.message);
          })
          .catch((error) => {
            console.log(error.response.data.message);
            alert(error.response.data.message);
          });
          
    setneedadmin("");
    setnewpass("")
    }
    
  };

  return (
    <div className="mainss">
        <div>
            <div className='newroomadmin'>
                ADD A ROOM
            </div>
            <div className="extra">
            <form onSubmit={submitform} className="susform">
            <div className="newroom">
                <label className="forming" for="roomnumber">
                    Room Number: </label>
                    <input className="r" type="text" value={selectoption} onChange={handlesubmitvalue} id="roomnumber" />
                </div>
                <label className="forming">Room Type: </label>
                <div className='radiobtns'> 
                <div>
                    <input className="sing" type="radio" value="Single" checked={inputvalue === "Single"} onChange={handlesubmit} id="single"/>
                    <label className="single" for="single">
                    Single</label>
                </div>

                <div>
                    <input className="doub" type="radio" value="Double" checked={inputvalue === "Double"} onChange={handlesubmit} id="double" />
                    <label className="double" for="double">
                    Double</label>
                </div>

                <div>

                    <input className="delu" type="radio" value="Deluxe" checked={inputvalue === "Deluxe"} onChange={handlesubmit} id="deluxe"/>
                    <label className="deluxe" for="deluxe">
                    Deluxe</label>
                </div>
                </div>
            <div className='rrrbut'>
                <button className="rrr" type="submit">Submit</button>
            </div>
            </form>
           </div>

        </div>
        <div>
            <div className='newroomadmin'>
                ADD AN ADMIN
            </div>
            <div className="extra extras">
            <form onSubmit={submitaform} className="susform">
            <div className='newroom'>
            <label className="forming" for="adminname">
                Admin:
                </label>
                <input className="r" type="text" value={needadmin} onChange={handlevalue} id="adminname" />
            </div>
            <div className='newroom'>
            <label className="forming" for='adminpass'>
                Password:
                </label>
                <input className="r" type="text" value={newpass} onChange={handlevaluesubmit} id='adminpass' />
            </div>
            <div className='rrrbut '>
                <button className="rrr sub" type="submit">Submit</button>
            </div>
            </form>
            </div>
        </div>
    </div>
  );
};

export default Roomd;