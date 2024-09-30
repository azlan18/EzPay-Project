import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from 'react-router-dom'; // To redirect after sign-in

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: email, // Assuming 'username' is the same as 'email'
                password
            });

            // Save the token (if needed) and redirect
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId",jwtDecode(response.data.token).userId )
            navigate("/dashboard"); // Redirect to the dashboard or wherever
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Sign in failed. Please try again.";
            setError(errorMessage); // Set the error message to display
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox 
                        placeholder="azlan@gmail.com" 
                        label={"Email"} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <InputBox 
                        placeholder="123456" 
                        label={"Password"} 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
                    <div className="pt-4">
                        <Button label={"Sign in"} onClick={handleSignIn} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
}
