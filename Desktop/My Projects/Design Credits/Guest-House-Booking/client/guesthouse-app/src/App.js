import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginpage from './Pages/Loginpage';
import Registrationpage from './Pages/Registrationpage';
import Homepage from './Pages/Homepage';
import Book from './Pages/Book';
import Allrooms from './Pages/Allrooms'
import Checkavaibility from './components/Checkavaibility'
import Formsumission from './Pages/Formsumission';
import Bookings from './Pages/Bookings';
import AdminLoginpage from './Pages/Adminlogin';
import Adminwebsite from './Pages/Adminwebsite';
import AdminallBookings from './Pages/AdminallBookings';
import Scrolltop from './components/Scrolltop';
import Detail from './Pages/Adminpagedetails';
import Roomd from './Pages/Adminnewroom';
import Newbook from './Pages/AdminBooking';
function App() {
  return (
    <Router>
      <Scrolltop />
       <Routes>
          <Route path='/' element={<Loginpage />} />
          <Route path='/Register' element={<Registrationpage />} />
          <Route path='/adminlogin' element={<AdminLoginpage />} />
          <Route path="/dashboard/admins" element={<Adminwebsite />}>
              <Route path="/dashboard/admins" element ={<AdminallBookings />}/>
              <Route path="/dashboard/admins/details" element ={<Detail />}/>
              <Route path="/dashboard/admins/rooms" element ={<Roomd />}/>
              <Route path="/dashboard/admins/newbooking" element ={<Newbook />}/>
          </Route>
          <Route path='/home' element={<Homepage />} />
          <Route path="/booknow" element={<Book />}>
            <Route path="/booknow" element={<Checkavaibility />} />
            <Route path="/booknow/rooms" element={<Allrooms />} />
            <Route path='/booknow/bookingpage' element={<Formsumission />} />
          </Route>
          <Route path='/Bookings' element={<Bookings />} />
        </Routes>
    </Router>
  );
}

export default App;
