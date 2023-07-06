import React from 'react'
import Dashboard from '../components/Dashboard'
import { Route,Routes} from 'react-router-dom'
import AdminallBookings from './AdminallBookings'
import Detail from './Adminpagedetails'
import Roomd from './Adminnewroom'
import Newbook from './AdminBooking'
export default function Adminwebsite() {
  return (
    <div>
      <Dashboard/>
        <Routes>
            <Route path='/' element={<AdminallBookings />} />
            <Route path='/details' element={<Detail />}/>
            <Route path='/rooms' element={<Roomd/>} />
            <Route path='/newbooking' element={<Newbook/>} />
        </Routes>
    </div>
  )
}
