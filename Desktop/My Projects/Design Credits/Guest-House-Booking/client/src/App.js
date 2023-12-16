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
import FacultyHomepage from './Pages/FacultyHomepage';
import Roomd from './Pages/Adminnewroom';
import Newbook from './Pages/AdminBooking';
import Facultyinterface from './Pages/Facultyinterface';
import Facultyform from './components/Facultyform';
import Facultybookings from './components/Facultybookings';
import Iitjguesthouseloginregister from './Pages/Iitjguesthouseloginregister';
import Studentlogin from './Pages/Studentlogin';
import Facultylogin from './Pages/Facultylogin';
function App() {
  return (
    <Router>
      <Scrolltop />
       <Routes>
          <Route path='/' element={<Iitjguesthouseloginregister />}/>
          <Route path='/student-login' element={<Studentlogin />} />
          <Route path='/faculty-login' element={<Facultylogin />} />
          <Route path='/admin-login' element={<AdminLoginpage />} />
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
          <Route path='/facultyHomaPage' element={<FacultyHomepage />} />
          <Route path='/facultybookings' element={<Facultybookings />} />
        </Routes>
    </Router>
  );
}

export default App;
