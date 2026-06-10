import { useState } from "react";
import {Routes,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/FPPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import WatchlistPage from "./pages/Watchlist";
import JournalPage from "./pages/JournalPage";




function App(){

    const [users,setUsers] = useState({name:"",email:"",state:"",city:"",password:"",confirm_password:""})
    
    console.log(users);

    const [showpassword,setShowpassword] = useState(false); 

    const [formdata,setFormdata] = useState([]);

    console.log(formdata);

    return(<>
    
    <Routes>
        <Route path="/login" element={<LoginPage formdata={formdata} showpassword={showpassword} setShowpassword={setShowpassword}/>}/>
        <Route path="/register" element={<RegisterPage formdata ={formdata} setFormdata={setFormdata} setUsers={setUsers} users={users} showpassword={showpassword} setShowpassword={setShowpassword}/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/watchlist" element={ <ProtectedRoute><WatchlistPage/></ProtectedRoute>}/>
        <Route path="/journal" element={ <ProtectedRoute><JournalPage/></ProtectedRoute>}/>
    </Routes>
    
    
    </>)
}

export default App;