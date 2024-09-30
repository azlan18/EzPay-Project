import { useState, useEffect} from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { TransactionCard } from "../components/TransactionCard"

export const Transactions = ()=>{
    const token = localStorage.getItem("token")
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    if(!token){
        return(<Navigate to = '/signin'/>)
    }
    
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/history', {
                    headers: {
                        Authorization: "Bearer " + token, 
                    }
                });
                setTransactions(response.data); // Store the transaction data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching transactions", error);
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []); // Empty dependency array ensures this runs once on component mount

    if (loading) {
        return <div>Loading transactions...</div>; // Show loading message while data is being fetched
    }

    return(
        <div className="m-8">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <div className="space-y-4">
                {transactions.length > 0 ? transactions.map((transaction) => (
                    <TransactionCard key={transaction._id} transaction={transaction} />
                )) : <div>No transactions found.</div>}
            </div>
        </div>
    )
}