import React, { useState } from 'react';
import '../Pages/admintable.css';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Table = ({ booking,setrefresh}) => {
  const [search, setSearch] = useState('');
  // const [copiedText, copyToClipboard] = useCopyToClipboard();
  const filtering = booking.filter((booking) => {
    const name = `${booking.firstname} ${booking.lastname}`;
    const id = booking._id;
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      id.toLowerCase().includes(search.toLowerCase()) ||
      booking.bookedon.toLowerCase().includes(search.toLowerCase()) ||
      booking.fromdate.toLowerCase().includes(search.toLowerCase()) ||
      booking.enddate.toLowerCase().includes(search.toLowerCase())
    );
  });
  const handleapprove=async (id)=>{
      await axios
       .put("http://localhost:8082/admibookings/approve",{id})
       .then((response) => {
         console.log(response);
         setrefresh((prev)=>!prev);
       })
       .catch((error) => {
         console.log(error);
         alert(error);
       });
  }
  const handlereject=async (id)=>{
    await axios
       .put("http://localhost:8082/admibookings/reject",{id})
       .then((response) => {
         console.log(response);
         setrefresh((prev)=>!prev);
       })
       .catch((error) => {
         console.log(error);
         alert(error);
       });
  }
  const handleCopy = (text) => {

    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("I'd copied to clipboard!", { autoClose: 2000 });
        console.log("copied to clipboard!", text);
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  };
  const columns = [
    'Booking Id',
    'Full Name',
    'Email',
    'Booked on',
    'Check In',
    'Check Out',
    'Rooms',
    // 'Room Type',
    'Status'
  ];

  const data = filtering.map((bookin) => [
    <button onClick={()=>{handleCopy(bookin._id)}} className='copy'>{bookin._id}</button>,
    `${bookin.firstname} ${bookin.lastname}`,
    bookin.email,
    bookin.bookedon,
    bookin.fromdate,
    bookin.enddate,
    bookin.rooms.sort().join(','),
    // bookin.roomstype,
    bookin.status === 'Pending' ? (
      <div className="statusbuttons">
        <button onClick={()=>{handleapprove(bookin._id)}}>Approve</button>
        <button onClick={()=>{handlereject(bookin._id)}}>Reject</button>
      </div>
    ) : (
      bookin.status
    ),
  ]).reverse();
  const options = {
    filter: false,
    search: true,
    selectableRows: 'none',
    print: false,
    download: false,
    viewColumns: false,
    pagination: true,
    rowsPerPageOptions: [5,10,15,20],
  };

  return (
    <div className='maintable' >
      <div className='table'>
        <MUIDataTable className="tab"
          title={"All Bookings"}
          data={data}
          columns={columns}
          options={options}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Table;
