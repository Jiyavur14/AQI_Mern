import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { setAQIData } from "../redux/aqiSlice";
import { useEffect, useState } from "react";


const date = new Date();

const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

const formattedDate = date.toLocaleDateString("en-GB", options);

function JournalPage({
  fetchAqi,
  entryindex,
  setEntryindex,
  entries,
  setEntries,
  journaltext,
  setJournaltext,
  savingentry,
  handledown,
  handlelogout,
  getAQIStatusPm10,
  getAQIStatusPm25,
  getAQIStatusNo2,
  getAQIStatusO3,
  getAQIStatusCo,
  getAQIStatusSo2,
  getAQIColorPm10,
  getAQIColorPm25,
  getAQIColorNo2,
  getAQIColorO3,
  getAQIColorCo,
  getAQIColorSo2,
}) {
  const userr = JSON.parse(localStorage.getItem("Currentuser"));

  const [activeFilter,setActiveFilter] = useState("all");

  const pollu = useSelector((state)=>state.aqi.polluData)

  console.log("poll: ",pollu);

  const deleteEntry = async (indexToDelete) => {

    if (confirm("Do you wanna Delete this entry?")) {
      const updatedentries = userr.journalEntries.filter(
        (each, index) => index !== indexToDelete,
      );

      setEntries(updatedentries);

      const updatedUserr = {...userr,journalEntries:updatedentries}

      console.log("Ommal dei: ",updatedUserr);

      localStorage.setItem("Currentuser",JSON.stringify(updatedUserr));

      await axios.patch(`http://localhost:5000/users/${userr.id}`,updatedUserr); 
      
    } else {
      return;
    }
  };

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const tME = entries.filter((each)=>{
        
    const noww = new Date(each.createdAt)

    return (currentMonth === noww.getMonth() && currentYear === noww.getFullYear())

  }) || [];

  console.log("this month: ",tME);

  const avgAQIThisMonth = tME.length
  ? (
      tME.reduce((sum, each) => sum + Number(each.aqi), 0) /
      tME.length
    ).toFixed(2)
  : 0;

const worstDays = entries.filter((each)=>{
   return each.aqi >= 150;
})

const displaying = activeFilter === "poor" ? worstDays : activeFilter === "month" ? tME : entries;

 useEffect(()=>{
   fetchAqi();
 },[])

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar (desktop only) ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">⬡</span>
          <span className="sidebar-logo-text">AQI Buddy</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <span className="nav-icon">◈</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/watchlist" className="nav-item">
            <span className="nav-icon">◉</span>
            <span>Watchlist</span>
          </Link>
          <Link to="/journal" className="nav-item nav-item--active">
            <span className="nav-icon">◎</span>
            <span>Journal</span>
          </Link>
          <Link to="/settings" className="nav-item">
            <span className="nav-icon">◌</span>
            <span>Settings</span>
          </Link>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{userr.name.charAt(0)}</div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">{userr.name}</p>
              <p className="sidebar-user-city">{userr.city}</p>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handlelogout}>↩</button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="dashboard-main">
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <div className="mobile-logo">
              <span className="sidebar-logo-icon">⬡</span>
              <span className="sidebar-logo-text">AQI Buddy</span>
            </div>
            <div className="topbar-heading-block">
              <div className="topbar-heading-row">
                <h2 className="topbar-title">Health Journal</h2>
              </div>
              <p className="topbar-subtitle">
                <span className="topbar-subtitle-dot">◎</span>
                {userr.city} · AQI auto-stamped on every entry
              </p>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-threshold-badge">
              <span className="threshold-label">Threshold</span>
              <span className="threshold-value">{userr.Threshold || 150}</span>
            </div>
            <div className="mobile-user-cluster">
              <div className="mobile-avatar">A</div>
              <button className="mobile-logout-btn">↩</button>
            </div>
          </div>
        </header>

        {/* ── Write new entry ── */}
        <section className="journal-write-section">
          <div className="journal-write-card">
            <div className="journal-write-header">
              <div className="journal-write-meta">
                <span className="journal-write-date">{formattedDate}</span>
                <div className="journal-write-aqi-stamp">
                  <span
                    className="journal-stamp-dot"
                    style={{ background: getAQIColorPm10(pollu.PM10) }}
                  ></span>
                  <span className="journal-stamp-text">
                    Today's AQI{" "}
                    <strong style={{ color: getAQIColorPm10(pollu.PM10) }}>
                      {pollu.PM10}
                    </strong>{" "}
                    · {getAQIStatusPm10(pollu.PM10)}
                  </span>
                </div>
              </div>
            </div>

            <textarea
              value={journaltext}
              onChange={(e) => setJournaltext(e.target.value)}
              onKeyDown={handledown}
              className="journal-write-input"
              placeholder="How are you feeling today? Did the air affect you — headache, dry throat, cancelled your walk? Write it down..."
              rows={5}
            />

            <div className="journal-write-footer">
              <div className="journal-write-hints">
                <span className="journal-hint-tag">😷 Symptoms</span>
                <span className="journal-hint-tag">🚶 Outdoor plans</span>
                <span className="journal-hint-tag">🪟 Stayed indoors</span>
                <span className="journal-hint-tag">💊 Medication</span>
              </div>
              <button
                className="btn-primary journal-save-btn"
                onClick={savingentry}
                onKeyDown={handledown}
              >
                Save Entry
              </button>
            </div>
          </div>
        </section>

        {/* ── Stats row ── */}
        <div className="journal-stats-row">
          <div className="journal-stat-card">
            <span className="journal-stat-value aqi-number">
              {entries?.length || 0}
            </span>
            <span className="journal-stat-label">Total entries</span>
          </div>
          <div className="journal-stat-card">
            <span
              className="journal-stat-value aqi-number"
              style={{ color: "var(--aqi-poor)" }}
            >
              {avgAQIThisMonth}
            </span>
            <span className="journal-stat-label">Avg AQI this month</span>
          </div>
          <div className="journal-stat-card">
            <span
              className="journal-stat-value aqi-number"
              style={{ color: "var(--aqi-very-poor)" }}
            >
              {worstDays.length}
            </span>
            <span className="journal-stat-label">Worst day recorded</span>
          </div>
        </div>

        {/* ── Past entries ── */}
        <section className="journal-entries-section">
          <div className="journal-entries-header">
            <h3 className="section-title">Past Entries</h3>
            <div className="journal-filter-row">
              <button className={`journal-filter-btn ${activeFilter==='all' ? "journal-filter-btn--active":""}`}
              onClick={()=>{
                setActiveFilter('all')
              }}>
                All
              </button>
              <button className={`journal-filter-btn ${activeFilter==='poor' ? "journal-filter-btn--active":""}`} 
              onClick={()=>{
                setActiveFilter('poor')
              }}>Poor+</button>
              <button className={`journal-filter-btn ${activeFilter==='month' ? "journal-filter-btn--active":""}`}
              onClick={()=>{
                setActiveFilter('month')
              }}>This month</button>
            </div>
          </div>

          <div className="journal-entries-list">
            {displaying?.map((each,index) => {
        
              return (
                  <div className="journal-entry-card" key={index}>
                    <div className="journal-entry-left">
                      <div
                        className="journal-entry-aqi-bar"
                        style={{ background: getAQIColorPm10(pollu.PM10) }}
                      ></div>
                    </div>
                    <div className="journal-entry-body">
                      <div className="journal-entry-top">
                        <div className="journal-entry-meta">
                          <span className="journal-entry-date">
                            {new Date(each.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </span>
                          <div className="journal-entry-badges">
                            <span
                              className="journal-aqi-chip"
                              style={{ background: getAQIColorPm10(pollu.PM10) }}
                            >
                              {pollu.PM10}
                            </span>
                            <span className="journal-status-chip">
                              {getAQIStatusPm10(pollu.PM10)}
                            </span>
                          </div>
                        </div>
                        <div className="journal-entry-actions">
                          <button
                            className="journal-action-btn"
                            onClick={() => {
                              setJournaltext(each.text);
                              setEntryindex(index);
                            }}
                          >
                            ✎
                          </button>
                          <button
                            className="journal-action-btn journal-action-btn--delete"
                            onClick={() => deleteEntry(index)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <p className="journal-entry-text">{each.text}</p>
                      <div className="journal-entry-footer">
                        <span className="journal-entry-city">
                          ◎ {userr.city}
                        </span>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="mobile-bottom-nav">
        <Link to="/dashboard" className="mobile-nav-item">
          <span className="mobile-nav-icon">◈</span>
          <span className="mobile-nav-label">Dashboard</span>
        </Link>
        <Link to="/watchlist" className="mobile-nav-item">
          <span className="mobile-nav-icon">◉</span>
          <span className="mobile-nav-label">Watchlist</span>
        </Link>
        <Link to="/journal" className="mobile-nav-item mobile-nav-item--active">
          <span className="mobile-nav-icon">◎</span>
          <span className="mobile-nav-label">Journal</span>
        </Link>
        <Link to="/settings" className="mobile-nav-item">
          <span className="mobile-nav-icon">◌</span>
          <span className="mobile-nav-label">Settings</span>
        </Link>
      </nav>
    </div>
  );
}

export default JournalPage;
