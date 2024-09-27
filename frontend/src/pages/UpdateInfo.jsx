import axios from 'axios'
import { useState, Navigate} from 'react'
import { useNavigate } from "react-router-dom"

export const UpdateInfo = () => {
    const [message,setMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastname] = useState('')
    const [password, setPassword] = useState('')
    


    const navigate = useNavigate();

    const handleSubmit = async(event)=>{
        setMessage('')
        event.preventDefault();
        try{
            const response = axios.put('http://localhost:3000/api/v1/user', {
                password: password,
                firstName: firstName,
                lastName: lastName
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            setMessage('Successfull!')
        }
        catch(err){
            throw(e)
            setMessage('Error occured!')
        }
    }
    return (
        <div className='flex justify-center h-screen bg-gray-100'>
            <div className="h-full w-full max-w-5xl flex flex-col justify-center p-10">
                <form className="border rounded-lg border-zinc-400 w-full max-w-4xl p-12 bg-white">
                    <h2 className="text-3xl font-bold text-center mb-10">Update Information</h2>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name">
                                First Name
                            </label>
                            <input 
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-base" 
                                id="grid-first-name" 
                                type="text" 
                                placeholder="Jane" 
                                value={firstName}
                                onChange={(e)=>{setFirstName(e.target.value)}}
                            />
                            
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-last-name">
                                Last Name
                            </label>
                            <input 
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 leading-tight focus:outline-none focus:bg-white text-base" 
                                id="grid-last-name" 
                                type="text" 
                                placeholder="Doe"  
                                value={lastName}
                                onChange={(e)=>{setLastname(e.target.value)}}   
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-password">
                                Password
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-base"
                                id="grid-password"
                                type="password"
                                placeholder="******************"
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <p className="text-gray-600 text-sm italic">Make it as long and as crazy as you'd like</p>
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <button 
                            type="submit" 
                            onClick = {handleSubmit}
                            className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600">
                            Submit
                        </button>
                        <button onClick={()=>{navigate("/dashboard")}} className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600">Dashboard</button>
                    </div>
                    <div className='flex justify-center text-lg font-semibold'>
                        <h2 className=' text-red  selection:font-bold py-2 px-6 rounded'>{message}</h2>
                    </div>
                </form>
            </div>
        </div>
    )
}
