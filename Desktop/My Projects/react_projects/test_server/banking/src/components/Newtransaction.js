import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/newtransaction.css'
import axios from 'axios';

export default function Newtransaction() {
    const navigate=useNavigate()
    const sender = JSON.parse(localStorage.getItem("userInfo"));
    const reciever = JSON.parse(localStorage.getItem("transactInfo"));
    const [amount,setAmount]=useState('');
    const [error, setError] = useState('');
  useEffect(() => {
      if (!sender) {
      navigate('/');
      }
  }, [sender]);

  useEffect(() => {
      if (!reciever) {
      navigate('/');
      }
  }, [reciever]);

  const handlesendmoney = async () => {
    const senderBalance = parseFloat(sender.balance);

    if (parseFloat(amount) > senderBalance || (parseFloat(amount)===0) || (amount==='')) {
        setError('Insufficient balance');
        setAmount(0)
        return;
    }
    try {
        const response = await axios.post("http://localhost:8080/api/transaction", {
            "senderid": sender._id,
           "recieverid": reciever._id,
            "amount": parseFloat(amount)
        });
        console.log(response.data);
        localStorage.clear()
        navigate('/viewtransactions');

    } catch (error) {
        console.error("Error sending money:", error);
    }
};

  return (
    <div style={{backgroundColor:'silver'}} className='root'>
            <div className='viewtransactioninfo'>
                  <div className='headertransac'>
                     <p>New Transaction</p>
                  </div>
                  <div className='transacdetails'>
                     <div>
                        <p>Sender Details:</p>
                        <h3>{sender?.username}</h3>
                        <h4>{sender?.email}</h4>
                        <h5>Account Balance: {sender?.balance}</h5>
                     </div>
                     <div>
                        <p>Reciever Details:</p>
                        <h3>{reciever?.username}</h3>
                        <h4>{reciever?.email}</h4>
                        <h5>Account Balance: {reciever?.balance}</h5>
                     </div>
                  </div>
                   <div className='sendmoney'>
                        <input placeholder='Enter Amount' type='number' value={amount} onChange={(e)=>{setAmount(e.target.value)}} />
                        <button onClick={handlesendmoney}>Send Money</button>
                        {error && <p className="error" style={{color:'red',margin:'auto'}}>{error}</p>}
                    </div>
            </div>
        </div>
  )
}
