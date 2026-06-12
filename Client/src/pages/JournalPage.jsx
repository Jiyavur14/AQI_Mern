import { Link } from 'react-router-dom';
import '../App.css';
import { useState } from 'react';

const fakeAQI = {
  city: "Trichy",
  lastUpdated: "10:45 AM",

  aqi: 161,

  pollutants: {
    pm25: 115,
    pm10: 100,
    no2: 75,
    so2: 50,
    co: 0.8,
    o3: 25,
  },
};

const date = new Date();

const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
};

const formattedDate = date.toLocaleDateString("en-GB", options);


function JournalPage({entryindex,setEntryindex,entries,setEntries,journaltext,setJournaltext,savingentry,handledown,getAQIStatus,getAQIColor}) {

 

  const entri = JSON.parse(localStorage.getItem("entries"));

  
  const deleteEntry = (indexToDelete) => {

  if(confirm("Do you wanna Delete this entry?")){

  const updatedentries = entri.filter((each,index)=>index !== indexToDelete)

  setEntries(updatedentries);

  localStorage.setItem("entries",JSON.stringify(updatedentries));}
  else{return;}
}


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
          <Link to="/history" className="nav-item">
            <span className="nav-icon">◇</span>
            <span>History</span>
          </Link>
          <Link to="/settings" className="nav-item">
            <span className="nav-icon">◌</span>
            <span>Settings</span>
          </Link>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">A</div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">Arjun Sharma</p>
              <p className="sidebar-user-city">{fakeAQI.city}</p>
            </div>
          </div>
          <button className="sidebar-logout">↩</button>
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
                {fakeAQI.city} · AQI auto-stamped on every entry
              </p>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-threshold-badge">
              <span className="threshold-label">Threshold</span>
              <span className="threshold-value">150</span>
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
                  <span className="journal-stamp-dot" style={{ background: getAQIColor(fakeAQI.aqi)}}></span>
                  <span className="journal-stamp-text">Today's AQI <strong style={{ color: getAQIColor(fakeAQI.aqi) }}>{fakeAQI.aqi}</strong> · {getAQIStatus(fakeAQI.aqi)}</span>
                </div>
              </div>
            </div>
 
            <textarea
              value={journaltext}
              onChange={(e)=>setJournaltext(e.target.value)}
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
              <button className="btn-primary journal-save-btn" onClick={savingentry} onKeyDown={handledown}>Save Entry</button>
            </div>
 
          </div>
        </section>
 
        {/* ── Stats row ── */}
        <div className="journal-stats-row">
          <div className="journal-stat-card">
            <span className="journal-stat-value aqi-number">{JSON.parse(localStorage.getItem("entries")).length}</span>
            <span className="journal-stat-label">Total entries</span>
          </div>
          <div className="journal-stat-card">
            <span className="journal-stat-value aqi-number" style={{ color: 'var(--aqi-poor)' }}>218</span>
            <span className="journal-stat-label">Avg AQI this month</span>
          </div>
          <div className="journal-stat-card">
            <span className="journal-stat-value aqi-number" style={{ color: 'var(--aqi-very-poor)' }}>318</span>
            <span className="journal-stat-label">Worst day recorded</span>
          </div>
        </div>
 
        {/* ── Past entries ── */}
        <section className="journal-entries-section">
          <div className="journal-entries-header">
            <h3 className="section-title">Past Entries</h3>
            <div className="journal-filter-row">
              <button className="journal-filter-btn journal-filter-btn--active">All</button>
              <button className="journal-filter-btn">Poor+</button>
              <button className="journal-filter-btn">This month</button>
            </div>
          </div>
 
          <div className="journal-entries-list">
  
  

          {entries.map((each,index)=>{
                 {/* Entry 1 */}
            return (<>
            
            <div className="journal-entry-card">
              <div className="journal-entry-left">
                <div className="journal-entry-aqi-bar" style={{ background: getAQIColor(each.aqi) }}></div>
              </div>
              <div className="journal-entry-body">
                <div className="journal-entry-top">
                  <div className="journal-entry-meta">
                    <span className="journal-entry-date">{new Date(each.createdAt).toLocaleDateString("en-GB", {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                              })}</span>
                    <div className="journal-entry-badges">
                      <span className="journal-aqi-chip" style={{ background: getAQIColor(fakeAQI.aqi)}}>{each.aqi}</span>
                      <span className="journal-status-chip">{getAQIStatus(each.aqi)}</span>
                    </div>
                  </div>
                  <div className="journal-entry-actions">
                    <button className="journal-action-btn" onClick={()=>{
                      setJournaltext(each.text);
                      setEntryindex(index);
                    }}>✎</button>
                    <button className="journal-action-btn journal-action-btn--delete" onClick={()=>deleteEntry(index)}>✕</button>
                  </div>
                </div>
                <p className="journal-entry-text">
                 {each.text}
                </p>
                <div className="journal-entry-footer">
                  <span className="journal-entry-city">◎ {fakeAQI.city}</span>
                </div>
              </div>
            </div>
            </>)

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
        <Link to="/history" className="mobile-nav-item">
          <span className="mobile-nav-icon">◇</span>
          <span className="mobile-nav-label">History</span>
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