import {
  BrowserRouter,
  Route,
  Routes,
  Navigate, // Import Navigate for redirection
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Transactions } from "./pages/Transactions";
import { UpdateInfo } from "./pages/UpdateInfo";

function App() {
  const token = localStorage.getItem("token"); // Get the JWT token from local storage

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/update" element={token ? <UpdateInfo/>: <Navigate to="/signin"/>} />
        <Route path="/transactions" element={<Transactions/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
