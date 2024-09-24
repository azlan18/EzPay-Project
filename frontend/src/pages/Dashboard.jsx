import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Navigate } from "react-router-dom"; // Import Navigate for redirection

export const Dashboard = () => {
    const [balance, setBalance] = useState(null); // State to hold the balance
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    // If no token, redirect to signin
    if (!token) {
        return <Navigate to="/signin" />;
    }

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setBalance(response.data.balance); // Update the state with the fetched balance
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, [token]); // Adding token to dependency array

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance !== null ? balance.toLocaleString() : "Loading..."} />
                <Users />
            </div>
        </div>
    );
};
