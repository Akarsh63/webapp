import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/viewtransactions.css'

export default function Viewtransactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/transactions");
                setTransactions(response.data.message);
                
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className='transactionspage'>
            <h1>View Transactions</h1>
            <div className='transactions'>
                {transactions.map((transaction, index) => (
                    <div key={index}>
                        <p>Transaction ID: {transaction._id}</p>
                        <p>Sender: {transaction.sendername}</p>
                        <p>Receiver: {transaction.recievername}</p>
                        <p>Amount: {transaction.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
