import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {Routes,Route} from "react-router-dom";
import ForgotPasswordPage from "./pages/FPPage";

const fakeusers= [{email:"jiyavur4@gmail.com",password:"1234"},
    {email:"jiyavur5@gmail.com",password:"12345"},
    {email:"jiyavur6@gmail.com",password:"12346"}
]


function App(){

    const [users,setUsers] = useState({name:"",email:"",city:"",password:"",confirm_password:""})
    
    console.log(users);

    const [showpassword,setShowpassword] = useState(false); 

    const [formdata,setFormdata] = useState([]);

    console.log(formdata);

    return(<>
    
    <Routes>
        <Route path="/login" element={<LoginPage fakeusers={fakeusers} showpassword={showpassword} setShowpassword={setShowpassword}/>}/>
        <Route path="/register" element={<RegisterPage formdata ={formdata} setFormdata={setFormdata} setUsers={setUsers} users={users} showpassword={showpassword} setShowpassword={setShowpassword}/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
    </Routes>
    
    
    </>)
}

export default App;