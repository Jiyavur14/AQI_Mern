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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAQIData } from "./redux/aqiSlice"; 


const AQI_KEY = import.meta.env.VITE_AQI_API_KEY;

function App() {

  const [isLoading,setIsLoading] = useState(false);
  
 const dispatch = useDispatch();
  
  const [users, setUsers] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    confirm_password: "",
  });

  const [showpassword, setShowpassword] = useState(false);

  const [journaltext, setJournaltext] = useState("");
  
  const user = JSON.parse(localStorage.getItem("Currentuser"));

  const [entries, setEntries] = useState(user?.journalEntries || []);

  const [entryindex, setEntryindex] = useState(null);

  const [cities, setCities] = useState(
    JSON.parse(localStorage.getItem("cities")) || [],
  );

  const [cityinput, setCityinput] = useState("");

  const pollu = useSelector((state) => state.aqi.polluData);

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

            localStorage.setItem("Currentuser", JSON.stringify(newUpdate));
            const what = await axios.patch(`http://localhost:5000/users/${user.id}`,{journalEntries:updatedEntries})
            console.log("v1: ",what.data);
            setJournaltext("");
            alert("Journal has been Updated!")
            setEntryindex(null);
          } else {
            const newentry = {
              text: journaltext,
              aqi: pollu.PM10,
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


    function getAQIStatusPm10(aqi) {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Satisfactory";
    if (aqi <= 250) return "Moderate";
    if (aqi <= 350) return "Poor";
    if (aqi <= 430) return "Very Poor";

    return "Severe";
  }

    function getAQIStatusPm25(aqi) {
    if (aqi <= 30) return "Good";
    if (aqi <= 60) return "Satisfactory";
    if (aqi <= 90) return "Moderate";
    if (aqi <= 120) return "Poor";
    if (aqi <= 250) return "Very Poor";

    return "Severe";
  }

  function getAQIStatusNo2(aqi) {
    if (aqi <= 40) return "Good";
    if (aqi <= 80) return "Satisfactory";
    if (aqi <= 180) return "Moderate";
    if (aqi <= 280) return "Poor";
    if (aqi <= 400) return "Very Poor";

    return "Severe";
  }

    function getAQIStatusO3(aqi) {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Satisfactory";
    if (aqi <= 168) return "Moderate";
    if (aqi <= 208) return "Poor";
    if (aqi <= 748) return "Very Poor";

    return "Severe";
  }

    function getAQIStatusCo(aqi) {
    if (aqi <= 1.0) return "Good";
    if (aqi <= 2.0) return "Satisfactory";
    if (aqi <= 10) return "Moderate";
    if (aqi <= 17) return "Poor";
    if (aqi <= 34) return "Very Poor";

    return "Severe";
  }

    function getAQIStatusSo2(aqi) {
    if (aqi <= 40) return "Good";
    if (aqi <= 80) return "Satisfactory";
    if (aqi <= 380) return "Moderate";
    if (aqi <= 800) return "Poor";
    if (aqi <= 1600) return "Very Poor";

    return "Severe";
  }

  function getAQIColorPm10(aqi) {
    if (aqi <= 50) return "var(--aqi-good)";
    if (aqi <= 100) return "var(--aqi-satisfactory)";
    if (aqi <= 250) return "var(--aqi-moderate)";
    if (aqi <= 350) return "var(--aqi-poor)";
    if (aqi <= 430) return "var(--aqi-very-poor)";

    return "var(--aqi-severe)";
  }

  
  function getAQIColorPm25(aqi) {
    if (aqi <= 30) return "var(--aqi-good)";
    if (aqi <= 60) return "var(--aqi-satisfactory)";
    if (aqi <= 90) return "var(--aqi-moderate)";
    if (aqi <= 120) return "var(--aqi-poor)";
    if (aqi <= 250) return "var(--aqi-very-poor)";

    return "var(--aqi-severe)";
  }

  
  function getAQIColorNo2(aqi) {
    if (aqi <= 40) return "var(--aqi-good)";
    if (aqi <= 80) return "var(--aqi-satisfactory)";
    if (aqi <= 180) return "var(--aqi-moderate)";
    if (aqi <= 280) return "var(--aqi-poor)";
    if (aqi <= 400) return "var(--aqi-very-poor)";

    return "var(--aqi-severe)";
  }

  
  function getAQIColorO3(aqi) {
    if (aqi <= 50) return "var(--aqi-good)";
    if (aqi <= 100) return "var(--aqi-satisfactory)";
    if (aqi <= 168) return "var(--aqi-moderate)";
    if (aqi <= 208) return "var(--aqi-poor)";
    if (aqi <= 748) return "var(--aqi-very-poor)";

    return "var(--aqi-severe)";
  }

  
  function getAQIColorCo(aqi) {
    if (aqi <= 1.0) return "var(--aqi-good)";
    if (aqi <= 2.0) return "var(--aqi-satisfactory)";
    if (aqi <= 10) return "var(--aqi-moderate)";
    if (aqi <= 17) return "var(--aqi-poor)";
    if (aqi <= 34) return "var(--aqi-very-poor)";

    return "var(--aqi-severe)";
  }

  
  function getAQIColorSo2(aqi) {
    if (aqi <= 40) return "var(--aqi-good)";
    if (aqi <= 80) return "var(--aqi-satisfactory)";
    if (aqi <= 380) return "var(--aqi-moderate)";
    if (aqi <= 800) return "var(--aqi-poor)";
    if (aqi <= 1600) return "var(--aqi-very-poor)";

    return "var(--aqi-severe)";
  }

  function getAQIBadgeClassPm10(aqi) {
    if (aqi <= 50) return "aqi-status-badge--good";
    if (aqi <= 100) return "aqi-status-badge--satisfactory";
    if (aqi <= 250) return "aqi-status-badge--moderate";
    if (aqi <= 350) return "aqi-status-badge--poor";
    if (aqi <= 430) return "aqi-status-badge--very-poor";

    return "aqi-status-badge--severe";
  }  

  function getAQIBadgeClassPm25(aqi) {
    if (aqi <= 30) return "aqi-status-badge--good";
    if (aqi <= 60) return "aqi-status-badge--satisfactory";
    if (aqi <= 90) return "aqi-status-badge--moderate";
    if (aqi <= 120) return "aqi-status-badge--poor";
    if (aqi <= 250) return "aqi-status-badge--very-poor";

    return "aqi-status-badge--severe";
  }

  function getAQIBadgeClassNo2(aqi) {
    if (aqi <= 40) return "aqi-status-badge--good";
    if (aqi <= 80) return "aqi-status-badge--satisfactory";
    if (aqi <= 180) return "aqi-status-badge--moderate";
    if (aqi <= 280) return "aqi-status-badge--poor";
    if (aqi <= 400) return "aqi-status-badge--very-poor";

    return "aqi-status-badge--severe";
  }

  function getAQIBadgeClassO3(aqi) {
    if (aqi <= 50) return "aqi-status-badge--good";
    if (aqi <= 100) return "aqi-status-badge--satisfactory";
    if (aqi <= 168) return "aqi-status-badge--moderate";
    if (aqi <= 208) return "aqi-status-badge--poor";
    if (aqi <= 748) return "aqi-status-badge--very-poor";

    return "aqi-status-badge--severe";
  }

  function getAQIBadgeClassCo(aqi) {
    if (aqi <= 1.0) return "aqi-status-badge--good";
    if (aqi <= 2.0) return "aqi-status-badge--satisfactory";
    if (aqi <= 10) return "aqi-status-badge--moderate";
    if (aqi <= 17) return "aqi-status-badge--poor";
    if (aqi <= 34) return "aqi-status-badge--very-poor";

    return "aqi-status-badge--severe";
  }

  function getAQIBadgeClassSo2(aqi) {
    if (aqi <= 40) return "aqi-status-badge--good";
    if (aqi <= 80) return "aqi-status-badge--satisfactory";
    if (aqi <= 380) return "aqi-status-badge--moderate";
    if (aqi <= 800) return "aqi-status-badge--poor";
    if (aqi <= 1600) return "aqi-status-badge--very-poor";

    return "aqi-status-badge--severe";
  }


  const navigate = useNavigate();

  const now_user = JSON.parse(localStorage.getItem("Currentuser"));

   const deleteJournals = async () =>{
        const datum = await axios.patch(`http://localhost:5000/users/${now_user.id}`,{...now_user,"journalEntries":[]})
        localStorage.setItem("Currentuser",JSON.stringify(datum.data));
        setEntries([]);
        alert("Journal Has been Cleared!")     
  }

  const deleteAccount = async () => {
    if(confirm("Do You want to delete your Account?")){
    const datum = await axios.delete(`http://localhost:5000/users/${now_user.id}`)
    localStorage.removeItem("Currentuser");
    navigate("/login");}
    else
      return;
  }


  
  const fetchAqi = async () => {
    try {
      setIsLoading(true)
      const datum = await axios.get(
        `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=${AQI_KEY}&format=json&filters[city]=${user.city}&limit=40`,
      );
      const rawData = datum.data.records;

      const dateStr = datum.data.updated_date;

      const [date, time] = dateStr.split("T");
      const [year, month, day] = date.split("-");

      const lastUpdated = `${day}/${month}/${year} - ${time.slice(0, 5)}`;

      console.log(lastUpdated);

      const realData = rawData.map((each) => {
        const { avg_value, pollutant_id } = each;
        return { avg_value, pollutant_id };
      });

      console.log("Real Data with NA values: ", realData);

      const fullValues = realData.filter((each) => {
        if (each.avg_value !== "NA") return each;
      });

      console.log("Real Data without NA values: ", fullValues);

      const pollutants = {
        PM25: [],
        PM10: [],
        NO2: [],
        SO2: [],
        CO: [],
        O3: [],
      };

      fullValues.forEach((each) => {
        let id = each.pollutant_id;

        switch (id) {
          case "PM2.5":
            pollutants.PM25.push(each.avg_value);
            break;
          case "PM10":
            pollutants.PM10.push(each.avg_value);
            break;
          case "NO2":
            pollutants.NO2.push(each.avg_value);
            break;
          case "SO2":
            pollutants.SO2.push(each.avg_value);
            break;
          case "CO":
            pollutants.CO.push(each.avg_value);
            break;
          case "OZONE":
            pollutants.O3.push(each.avg_value);
            break;
        }
      });

      const keys = Object.keys(pollutants);

      const finalValues = keys.reduce((acc, key) => {
        //step1: getting 1st array
        const arrval = pollutants[key];
        //step2: converting it into number
        const numval = arrval.map(Number);
        //step3: adding every value
        const sum = numval.reduce((tot, num) => tot + num, 0);
        //step4: average
        const avg = Number(sum / numval.length).toFixed(2);
        //adding the answer to our final acc object
        acc[key] = avg;

        return acc;
      }, {});

      const fulll = {...finalValues,lastUpdated}

      dispatch(setAQIData(fulll));
    } catch (err) {
      console.log(err.message);
    }
    finally{
      setIsLoading(false);
    }
  };

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
              showpassword={showpassword}
              setShowpassword={setShowpassword}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
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
                getAQIBadgeClassPm10={getAQIBadgeClassPm10}
                getAQIBadgeClassPm25={getAQIBadgeClassPm25}
                getAQIBadgeClassNo2={getAQIBadgeClassNo2}
                getAQIBadgeClassO3={getAQIBadgeClassO3}
                getAQIBadgeClassCo={getAQIBadgeClassCo}
                getAQIBadgeClassSo2={getAQIBadgeClassSo2}

                getAQIColorPm10={getAQIColorPm10}
                getAQIColorPm25={getAQIColorPm25}
                getAQIColorNo2={getAQIColorNo2}
                getAQIColorO3={getAQIColorO3}
                getAQIColorCo={getAQIColorCo}
                getAQIColorSo2={getAQIColorSo2}

                getAQIStatusPm10={getAQIStatusPm10}
                getAQIStatusPm25={getAQIStatusPm25}
                getAQIStatusNo2={getAQIStatusNo2}
                getAQIStatusO3={getAQIStatusO3}
                getAQIStatusCo={getAQIStatusCo}
                getAQIStatusSo2={getAQIStatusSo2}

                handledown={handledown}
                savingentry={savingentry}
                journaltext={journaltext}
                setJournaltext={setJournaltext}
                fetchAqi={fetchAqi}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchlistPage
                fetchAqi={fetchAqi}
                handlelogout={handlelogout}
                getAQIBadgeClassPm10={getAQIBadgeClassPm10}
                getAQIBadgeClassPm25={getAQIBadgeClassPm25}
                getAQIBadgeClassNo2={getAQIBadgeClassNo2}
                getAQIBadgeClassO3={getAQIBadgeClassO3}
                getAQIBadgeClassCo={getAQIBadgeClassCo}
                getAQIBadgeClassSo2={getAQIBadgeClassSo2}

                getAQIColorPm10={getAQIColorPm10}
                getAQIColorPm25={getAQIColorPm25}
                getAQIColorNo2={getAQIColorNo2}
                getAQIColorO3={getAQIColorO3}
                getAQIColorCo={getAQIColorCo}
                getAQIColorSo2={getAQIColorSo2}

                getAQIStatusPm10={getAQIStatusPm10}
                getAQIStatusPm25={getAQIStatusPm25}
                getAQIStatusNo2={getAQIStatusNo2}
                getAQIStatusO3={getAQIStatusO3}
                getAQIStatusCo={getAQIStatusCo}
                getAQIStatusSo2={getAQIStatusSo2}
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
              
                getAQIColorPm10={getAQIColorPm10}
                getAQIColorPm25={getAQIColorPm25}
                getAQIColorNo2={getAQIColorNo2}
                getAQIColorO3={getAQIColorO3}
                getAQIColorCo={getAQIColorCo}
                getAQIColorSo2={getAQIColorSo2}

                getAQIStatusPm10={getAQIStatusPm10}
                getAQIStatusPm25={getAQIStatusPm25}
                getAQIStatusNo2={getAQIStatusNo2}
                getAQIStatusO3={getAQIStatusO3}
                getAQIStatusCo={getAQIStatusCo}
                getAQIStatusSo2={getAQIStatusSo2}

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
                deleteAccount={deleteAccount}
                handlelogout={handlelogout}
                getAQIBadgeClassPm10={getAQIBadgeClassPm10}
                getAQIBadgeClassPm25={getAQIBadgeClassPm25}
                getAQIBadgeClassNo2={getAQIBadgeClassNo2}
                getAQIBadgeClassO3={getAQIBadgeClassO3}
                getAQIBadgeClassCo={getAQIBadgeClassCo}
                getAQIBadgeClassSo2={getAQIBadgeClassSo2}

                getAQIColorPm10={getAQIColorPm10}
                getAQIColorPm25={getAQIColorPm25}
                getAQIColorNo2={getAQIColorNo2}
                getAQIColorO3={getAQIColorO3}
                getAQIColorCo={getAQIColorCo}
                getAQIColorSo2={getAQIColorSo2}

                getAQIStatusPm10={getAQIStatusPm10}
                getAQIStatusPm25={getAQIStatusPm25}
                getAQIStatusNo2={getAQIStatusNo2}
                getAQIStatusO3={getAQIStatusO3}
                getAQIStatusCo={getAQIStatusCo}
                getAQIStatusSo2={getAQIStatusSo2}
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
