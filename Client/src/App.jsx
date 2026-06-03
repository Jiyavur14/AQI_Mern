import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {Routes,Route} from "react-router-dom";
import ForgotPasswordPage from "./pages/FPPage";

function App(){
    return(<>
    
    <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>

    </Routes>
    
    
    </>)
}

export default App;