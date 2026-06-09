import { useState } from "react";
import {Routes,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/FPPage";
import Dashboard from "./pages/Dashboard";



function App(){

    const [users,setUsers] = useState({name:"",email:"",city:"",password:"",confirm_password:""})
    
    console.log(users);

    const [showpassword,setShowpassword] = useState(false); 

    const [formdata,setFormdata] = useState([]);

    console.log(formdata);

    return(<>
    
    <Routes>
        <Route path="/login" element={<LoginPage formdata={formdata} showpassword={showpassword} setShowpassword={setShowpassword}/>}/>
        <Route path="/register" element={<RegisterPage formdata ={formdata} setFormdata={setFormdata} setUsers={setUsers} users={users} showpassword={showpassword} setShowpassword={setShowpassword}/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    
    
    </>)
}

export default App;