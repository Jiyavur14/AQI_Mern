import { useState,useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, data } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/FPPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import WatchlistPage from "./pages/Watchlist";
import JournalPage from "./pages/JournalPage";
import SettingsPage from "./pages/SettingsPage";
import axios from "axios";


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

function App() {
  
  const [users, setUsers] = useState({
    name: "",
    email: "",
    state: "",
    city: "",
    password: "",
    confirm_password: "",
  });

  const [showpassword, setShowpassword] = useState(false);

  const [formdata, setFormdata] = useState([]);

  console.log(formdata);

  const [journaltext, setJournaltext] = useState("");
  
  const user = JSON.parse(localStorage.getItem("Currentuser"));

  console.log('eww: ',user);

  const [entries, setEntries] = useState(user?.journalEntries || []);

  const [entryindex, setEntryindex] = useState(null);

  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem("cities")) || [],
  );

  const [cityinput, setCityinput] = useState("");

  async function savingentry() {
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
        const today_entries = entries?.filter((each) => {
          return new Date(each.createdAt).toDateString() === today;
        });

        if (today_entries?.length >= 5) {
          alert("Maximum only 5 entries are allowed for Today..");
          return;
        } else {
          if (entryindex !== null) {
            const updatedEntries = [...entries];
            updatedEntries[entryindex].text = journaltext;
            setEntries(updatedEntries);

            const newUpdate = {...user,journalEntries:updatedEntries}

            console.log("New state:",newUpdate);

            localStorage.setItem("Currentuser", JSON.stringify(newUpdate));
            const what = await axios.patch(`http://localhost:5000/users/${user.id}`,{journalEntries:updatedEntries})
            console.log("v1: ",what.data);
            setJournaltext("");
            alert("Journal has been Updated!")
            setEntryindex(null);
          } else {
            const newentry = {
              text: journaltext,
              aqi: fakeAQI.aqi,
              createdAt: new Date().toISOString(),
            };

            const updatedUser = {
              ...user,
              journalEntries: [...entries, newentry],
            };

            console.log(updatedUser);

            await axios.patch(
              `http://localhost:5000/users/${user.id}`,
              updatedUser,
            );

            setEntries(updatedUser.journalEntries);

            localStorage.setItem("Currentuser", JSON.stringify(updatedUser));

            alert("Entry Saved");

            setJournaltext("");

            console.log("stored", entries);
          }
        }
      }
    }
  }

  const handlelogout = () => {
    localStorage.removeItem("Currentuser");
    navigate("/login");
  };

  const handledown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      savingentry();
    }
  };

  function getAQIStatus(aqi) {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Satisfactory";
    if (aqi <= 200) return "Moderate";
    if (aqi <= 300) return "Poor";
    if (aqi <= 400) return "Very Poor";

    return "Severe";
  }

  function getAQIColor(aqi) {
    if (aqi <= 50) return "var(--aqi-good)";
    if (aqi <= 100) return "var(--aqi-satisfactory)";
    if (aqi <= 200) return "var(--aqi-moderate)";
    if (aqi <= 300) return "var(--aqi-poor)";
    if (aqi <= 400) return "var(--aqi-very-poor)";

    return "var(--aqi-severe)";
  }

  function getAQIBadgeClass(aqi) {
    if (aqi <= 50) return "aqi-status-badge--good";
    if (aqi <= 100) return "aqi-status-badge--satisfactory";
    if (aqi <= 200) return "aqi-status-badge--moderate";
    if (aqi <= 300) return "aqi-status-badge--poor";
    if (aqi <= 400) return "aqi-status-badge--very-poor";

    return "aqi-status-badge--severe";
  }

  const navigate = useNavigate();

  const now_user = JSON.parse(localStorage.getItem("Currentuser"));

  console.log("Now-User: ", now_user);

   const deleteJournals = async () =>{
        const datum = await axios.patch(`http://localhost:5000/users/${now_user.id}`,{...now_user,"journalEntries":[]})
        localStorage.setItem("Currentuser",JSON.stringify(datum.data));
        setEntries([]);     
        console.log("naanga naalu pedu: ",datum.data);
  }

  useEffect(() => {
    setEntries(user?.journalEntries || []);
  }, [user?.id]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              formdata={formdata}
              showpassword={showpassword}
              setShowpassword={setShowpassword}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              formdata={formdata}
              setFormdata={setFormdata}
              setUsers={setUsers}
              users={users}
              showpassword={showpassword}
              setShowpassword={setShowpassword}
            />
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                getAQIBadgeClass={getAQIBadgeClass}
                getAQIColor={getAQIColor}
                getAQIStatus={getAQIStatus}
                handledown={handledown}
                savingentry={savingentry}
                journaltext={journaltext}
                setJournaltext={setJournaltext}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchlistPage
                handlelogout={handlelogout}
                getAQIBadgeClass={getAQIBadgeClass}
                getAQIStatus={getAQIStatus}
                getAQIColor={getAQIColor}
                cities={cities}
                setCities={setCities}
                cityinput={cityinput}
                setCityinput={setCityinput}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <JournalPage
                handlelogout={handlelogout}
                entryindex={entryindex}
                setEntryindex={setEntryindex}
                entries={entries}
                setEntries={setEntries}
                getAQIColor={getAQIColor}
                getAQIStatus={getAQIStatus}
                handledown={handledown}
                savingentry={savingentry}
                journaltext={journaltext}
                setJournaltext={setJournaltext}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage
                handlelogout={handlelogout}
                getAQIColor={getAQIColor}
                getAQIStatus={getAQIStatus}
                getAQIBadgeClass={getAQIBadgeClass}
                deleteJournals={deleteJournals}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
