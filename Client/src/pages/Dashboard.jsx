import '../App.css';
import { Link,Navigate,useNavigate } from 'react-router-dom';



const fakeAQI = {
  city: "Trichy",
  lastUpdated: "10:45 AM",

  aqi: 247,
  status: "Poor",

  pollutants: {
    pm25: 112,
    pm10: 168,
    no2: 28,
    so2: 44,
    co: 0.8,
    o3: 62
  }
};




 
function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("Currentuser"));

  const handlelogout = ()=>{
   localStorage.removeItem("Currentuser");
   navigate("/login");
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
          <Link to="/dashboard" className="nav-item nav-item--active">
            <span className="nav-icon">◈</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/watchlist" className="nav-item">
            <span className="nav-icon">◉</span>
            <span>Watchlist</span>
          </Link>
          <Link to="/journal" className="nav-item">
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
            <div className="sidebar-avatar">{user.name.charAt(0)}</div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">{user.name}</p>
              <p className="sidebar-user-city">{user.city}</p>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handlelogout}>↩</button>
        </div>
      </aside>
 
      {/* ── Main content ── */}
      <main className="dashboard-main">
 
        {/* ── Topbar ── */}
        <header className="dashboard-topbar">
 
          {/* Left: mobile logo + page heading */}
          <div className="topbar-left">
            <div className="mobile-logo">
              <span className="sidebar-logo-icon">⬡</span>
              <span className="sidebar-logo-text">AQI Buddy</span>
            </div>
            <div className="topbar-heading-block">
              <div className="topbar-heading-row">
                <h2 className="topbar-title">Dashboard</h2>
                <span className="topbar-live-dot"></span>
                <span className="topbar-live-label">Live</span>
              </div>
              <p className="topbar-subtitle">
                <span className="topbar-subtitle-dot">◎</span>
                {user.city} · Last updated {fakeAQI.lastUpdated}
              </p>
            </div>
          </div>
 
          {/* Right: threshold + mobile user avatar + logout */}
          <div className="topbar-right">
            <div className="topbar-threshold-badge">
              <span className="threshold-label">Threshold</span>
              <span className="threshold-value">150</span>
            </div>
 
            {/* Mobile only — avatar + logout */}
            <div className="mobile-user-cluster">
              <div className="mobile-avatar">A</div>
              <button className="mobile-logout-btn" onClick={handlelogout}>↩</button>
            </div>
          </div>
 
        </header>
 
        {/* Warning Banner */}
        <div className="aqi-warning-banner">
          <span className="warning-icon">⚠️</span>
          <p>AQI has crossed your personal limit of <strong>150</strong>. Avoid outdoor activity.</p>
        </div>
 
        {/* Hero AQI card */}
        <section className="aqi-hero-section">
          <div className="aqi-hero-card">
            <div className="aqi-hero-left">
              <p className="aqi-hero-label">Air Quality Index</p>
              <div className="aqi-hero-number aqi-number" style={{ color: 'var(--aqi-poor)' }}>247</div>
              <div className="aqi-status-badge aqi-status-badge--poor">Poor</div>
              <p className="aqi-hero-city">{user.city}, {user.state}</p>
            </div>
            <div className="aqi-hero-right">
              <div className="aqi-gauge-ring" style={{ '--aqi-color': 'var(--aqi-poor)', '--aqi-pct': '62%' }}>
                <div className="aqi-gauge-inner">
                  <span className="aqi-gauge-value aqi-number">247</span>
                  <span className="aqi-gauge-label">AQI</span>
                </div>
              </div>
            </div>
          </div>
 
          {/* AQI scale legend */}
          <div className="aqi-scale-legend">
            <div className="scale-legend-item">
              <span className="scale-legend-dot" style={{ background: 'var(--aqi-good)' }}></span>
              <span>Good</span><span className="scale-range">0–50</span>
            </div>
            <div className="scale-legend-item">
              <span className="scale-legend-dot" style={{ background: 'var(--aqi-satisfactory)' }}></span>
              <span>Satisfactory</span><span className="scale-range">51–100</span>
            </div>
            <div className="scale-legend-item">
              <span className="scale-legend-dot" style={{ background: 'var(--aqi-moderate)' }}></span>
              <span>Moderate</span><span className="scale-range">101–200</span>
            </div>
            <div className="scale-legend-item">
              <span className="scale-legend-dot" style={{ background: 'var(--aqi-poor)' }}></span>
              <span>Poor</span><span className="scale-range">201–300</span>
            </div>
            <div className="scale-legend-item">
              <span className="scale-legend-dot" style={{ background: 'var(--aqi-very-poor)' }}></span>
              <span>Very Poor</span><span className="scale-range">301–400</span>
            </div>
            <div className="scale-legend-item">
              <span className="scale-legend-dot" style={{ background: 'var(--aqi-severe)' }}></span>
              <span>Severe</span><span className="scale-range">401+</span>
            </div>
          </div>
        </section>
 
        {/* Pollutant cards */}
        <section className="pollutants-section">
          <h3 className="section-title">Pollutant Breakdown</h3>
          <div className="pollutants-grid">
 
            <div className="pollutant-card">
              <div className="pollutant-top">
                <span className="pollutant-name">PM2.5</span>
                <span className="pollutant-status" style={{ color: 'var(--aqi-poor)' }}>Poor</span>
              </div>
              <div className="pollutant-value aqi-number">112 <span className="pollutant-unit">µg/m³</span></div>
              <div className="pollutant-bar-track">
                <div className="pollutant-bar-fill" style={{ width: '74%', background: 'var(--aqi-poor)' }}></div>
              </div>
              <p className="pollutant-desc">Fine particulate matter</p>
              <div className="pollutant-cause">
                <span className="cause-icon">🔥</span>
                <span>Main cause — Crop burning, vehicle exhaust</span>
              </div>
            </div>
 
            <div className="pollutant-card">
              <div className="pollutant-top">
                <span className="pollutant-name">PM10</span>
                <span className="pollutant-status" style={{ color: 'var(--aqi-moderate)' }}>Moderate</span>
              </div>
              <div className="pollutant-value aqi-number">168 <span className="pollutant-unit">µg/m³</span></div>
              <div className="pollutant-bar-track">
                <div className="pollutant-bar-fill" style={{ width: '55%', background: 'var(--aqi-moderate)' }}></div>
              </div>
              <p className="pollutant-desc">Coarse particulate matter</p>
              <div className="pollutant-cause">
                <span className="cause-icon">🏗️</span>
                <span>Main cause — Dust, construction sites</span>
              </div>
            </div>
 
            <div className="pollutant-card">
              <div className="pollutant-top">
                <span className="pollutant-name">NO₂</span>
                <span className="pollutant-status" style={{ color: 'var(--aqi-good)' }}>Good</span>
              </div>
              <div className="pollutant-value aqi-number">28 <span className="pollutant-unit">µg/m³</span></div>
              <div className="pollutant-bar-track">
                <div className="pollutant-bar-fill" style={{ width: '18%', background: 'var(--aqi-good)' }}></div>
              </div>
              <p className="pollutant-desc">Nitrogen dioxide</p>
              <div className="pollutant-cause">
                <span className="cause-icon">🚗</span>
                <span>Main cause — Vehicle engines, power plants</span>
              </div>
            </div>
 
            <div className="pollutant-card">
              <div className="pollutant-top">
                <span className="pollutant-name">SO₂</span>
                <span className="pollutant-status" style={{ color: 'var(--aqi-satisfactory)' }}>Satisfactory</span>
              </div>
              <div className="pollutant-value aqi-number">44 <span className="pollutant-unit">µg/m³</span></div>
              <div className="pollutant-bar-track">
                <div className="pollutant-bar-fill" style={{ width: '30%', background: 'var(--aqi-satisfactory)' }}></div>
              </div>
              <p className="pollutant-desc">Sulphur dioxide</p>
              <div className="pollutant-cause">
                <span className="cause-icon">🏭</span>
                <span>Main cause — Factories, burning coal & oil</span>
              </div>
            </div>
 
            <div className="pollutant-card">
              <div className="pollutant-top">
                <span className="pollutant-name">CO</span>
                <span className="pollutant-status" style={{ color: 'var(--aqi-good)' }}>Good</span>
              </div>
              <div className="pollutant-value aqi-number">0.8 <span className="pollutant-unit">mg/m³</span></div>
              <div className="pollutant-bar-track">
                <div className="pollutant-bar-fill" style={{ width: '12%', background: 'var(--aqi-good)' }}></div>
              </div>
              <p className="pollutant-desc">Carbon monoxide</p>
              <div className="pollutant-cause">
                <span className="cause-icon">🚘</span>
                <span>Main cause — Vehicle smoke, generators</span>
              </div>
            </div>
 
            <div className="pollutant-card">
              <div className="pollutant-top">
                <span className="pollutant-name">O₃</span>
                <span className="pollutant-status" style={{ color: 'var(--aqi-satisfactory)' }}>Satisfactory</span>
              </div>
              <div className="pollutant-value aqi-number">62 <span className="pollutant-unit">µg/m³</span></div>
              <div className="pollutant-bar-track">
                <div className="pollutant-bar-fill" style={{ width: '38%', background: 'var(--aqi-satisfactory)' }}></div>
              </div>
              <p className="pollutant-desc">Ground-level ozone</p>
              <div className="pollutant-cause">
                <span className="cause-icon">☀️</span>
                <span>Main cause — Sunlight reacting with exhaust fumes</span>
              </div>
            </div>
 
          </div>
        </section>
 
        {/* Quick journal entry */}
        <section className="quick-journal-section">
          <h3 className="section-title">Today's Journal</h3>
          <div className="quick-journal-card">
            <textarea
              className="quick-journal-input"
              placeholder="How are you feeling today? Note any symptoms, outdoor plans, or observations about the air..."
              rows={3}
            />
            <div className="quick-journal-footer">
              <span className="quick-journal-stamp">AQI 247 will be auto-attached</span>
              <button className="btn-primary quick-journal-btn">Save Entry</button>
            </div>
          </div>
        </section>
 
      </main>
 
      {/* ── Bottom nav (mobile only) ── */}
      <nav className="mobile-bottom-nav">
        <Link to="/dashboard" className="mobile-nav-item mobile-nav-item--active">
          <span className="mobile-nav-icon">◈</span>
          <span className="mobile-nav-label">Dashboard</span>
        </Link>
        <Link to="/watchlist" className="mobile-nav-item">
          <span className="mobile-nav-icon">◉</span>
          <span className="mobile-nav-label">Watchlist</span>
        </Link>
        <Link to="/journal" className="mobile-nav-item">
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
 
export default Dashboard;
 