import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export const Appbar = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from local storage
        navigate("/signin"); // Redirect to the sign-in page
    };
    const handleUpdate = ()=>{
        const token = localStorage.getItem('token')
        if(token){
            navigate("/update")
        }
        else{
            navigate("/signin")
        }
    }
    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex mr-4">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        U
                    </div>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="self-center bg-red-700 text-white px-4 py-1 mr-2 rounded-md">
                    Logout
                </button>
                <button 
                    onClick={handleUpdate} 
                    className="self-center bg-slate-950 text-white px-4 py-1 rounded-md">
                    Update Info
                </button>
            </div>
        </div>
    );
}
