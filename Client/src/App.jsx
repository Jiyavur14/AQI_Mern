import { useState } from "react";
import {Routes,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/FPPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import WatchlistPage from "./pages/Watchlist";
import JournalPage from "./pages/JournalPage";


const fakeAQI = {
  city: "Trichy",
  lastUpdated: "10:45 AM",

  aqi: 11,

  pollutants: {
    pm25: 115,
    pm10: 100,
    no2: 75,
    so2: 50,
    co: 0.8,
    o3: 25,
  },
};


function App(){

    const [users,setUsers] = useState({name:"",email:"",state:"",city:"",password:"",confirm_password:""})
    
    console.log(users);

    const [showpassword,setShowpassword] = useState(false); 

    const [formdata,setFormdata] = useState([]);

    console.log(formdata);

     const [journaltext, setJournaltext] = useState("");

function savingentry() {
    if (!journaltext.trim()) {
      alert("Journal Can't be  empty");
      return;
    } else {
      const wordCount = journaltext.trim().split(/\s+/).length;

      if (wordCount > 100) {
        alert("Maximum 100 words allowed");
        return;
      } else {

        const today = new Date().toDateString();
        const entri = JSON.parse(localStorage.getItem("entries"));
        const today_entries = entri.filter((each)=>{
             return new Date (each.createdAt).toDateString() === today
        })

        if(today_entries.length >= 5){
          alert("Maximum only 5 entries are allowed for Today..")
          return;}
        else{
        const entry = JSON.parse(localStorage.getItem("entries")) || [];

        const newentry = { text: journaltext, aqi: fakeAQI.aqi,createdAt: new Date().toISOString() };

        entry.push(newentry);

        localStorage.setItem("entries", JSON.stringify(entry));

        alert("Entry Saved");

        setJournaltext("");

        console.log("stored", entry);
      }}
    }
  }

  const handledown = (e)=> {
    if(e.key === "Enter")
    {
        e.preventDefault();
        savingentry();
    }

  }

    return(<>
    
    <Routes>
        <Route path="/login" element={<LoginPage formdata={formdata} showpassword={showpassword} setShowpassword={setShowpassword}/>}/>
        <Route path="/register" element={<RegisterPage formdata ={formdata} setFormdata={setFormdata} setUsers={setUsers} users={users} showpassword={showpassword} setShowpassword={setShowpassword}/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard handledown={handledown} savingentry={savingentry} journaltext={journaltext} setJournaltext={setJournaltext}/></ProtectedRoute>}/>
        <Route path="/watchlist" element={ <ProtectedRoute><WatchlistPage/></ProtectedRoute>}/>
        <Route path="/journal" element={ <ProtectedRoute><JournalPage handledown={handledown} savingentry={savingentry} journaltext={journaltext} setJournaltext={setJournaltext}/></ProtectedRoute>}/>
    </Routes>
    
    
    </>)
}

export default App;