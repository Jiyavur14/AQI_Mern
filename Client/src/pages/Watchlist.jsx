import '../App.css';
import { Link } from 'react-router-dom';
 
function Watchlist() {
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
          <Link to="/watchlist" className="nav-item nav-item--active">
            <span className="nav-icon">◉</span>
            <span>Watchlist</span>
          </Link>
          <a href="/journal" className="nav-item">
            <span className="nav-icon">◎</span>
            <span>Journal</span>
          </a>
          <a href="/history" className="nav-item">
            <span className="nav-icon">◇</span>
            <span>History</span>
          </a>
          <a href="/settings" className="nav-item">
            <span className="nav-icon">◌</span>
            <span>Settings</span>
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">A</div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">Arjun Sharma</p>
              <p className="sidebar-user-city">Chennai</p>
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
                <h2 className="topbar-title">City Watchlist</h2>
                <span className="topbar-live-dot"></span>
                <span className="topbar-live-label">Live</span>
              </div>
              <p className="topbar-subtitle">
                <span className="topbar-subtitle-dot">◎</span>
                Monitor up to 5 cities · Sorted worst first
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
 
        {/* ── Add city bar ── */}
        <div className="watchlist-add-bar">
          <div className="watchlist-add-inner">
            <span className="watchlist-add-icon">◉</span>
            <input
              type="text"
              className="watchlist-add-input"
              placeholder="Type a city name — e.g. Mumbai, Kolkata, Jaipur..."
            />
            <button className="watchlist-add-btn">
              <span>+ Add City</span>
            </button>
          </div>
          <p className="watchlist-add-hint">
            2 of 5 cities added
          </p>
        </div>
 
        {/* ── Slot indicators ── */}
        <div className="watchlist-slots">
          <div className="slot slot--filled">
            <span className="slot-dot slot-dot--filled"></span>
          </div>
          <div className="slot slot--filled">
            <span className="slot-dot slot-dot--filled"></span>
          </div>
          <div className="slot slot--empty">
            <span className="slot-dot slot-dot--empty"></span>
          </div>
          <div className="slot slot--empty">
            <span className="slot-dot slot-dot--empty"></span>
          </div>
          <div className="slot slot--empty">
            <span className="slot-dot slot-dot--empty"></span>
          </div>
        </div>
 
        {/* ── City cards ── */}
        <section className="watchlist-section">
          <h3 className="section-title">Your Cities</h3>
          <div className="watchlist-grid">
 
            {/* Card 1 — Worst (Delhi) */}
            <div className="city-card city-card--very-poor">
              <div className="city-card-rank">01</div>
              <div className="city-card-header">
                <div className="city-card-info">
                  <h3 className="city-card-name">Delhi</h3>
                  <p className="city-card-state">Delhi NCR</p>
                </div>
                <button className="city-card-remove">×</button>
              </div>
 
              <div className="city-card-aqi-row">
                <span className="city-card-aqi-number aqi-number" style={{ color: 'var(--aqi-very-poor)' }}>318</span>
                <div className="city-card-status-col">
                  <span className="aqi-status-badge aqi-status-badge--very-poor">Very Poor</span>
                  <span className="city-card-updated">Updated 11:02 AM</span>
                </div>
              </div>
 
              <div className="city-card-bar-track">
                <div className="city-card-bar-fill" style={{ width: '79%', background: 'var(--aqi-very-poor)' }}></div>
              </div>
 
              <div className="city-card-pollutants">
                <div className="city-mini-pollutant">
                  <span className="cmp-label">PM2.5</span>
                  <span className="cmp-value aqi-number" style={{ color: 'var(--aqi-very-poor)' }}>189</span>
                </div>
                <div className="city-mini-pollutant">
                  <span className="cmp-label">PM10</span>
                  <span className="cmp-value aqi-number" style={{ color: 'var(--aqi-poor)' }}>241</span>
                </div>
                <div className="city-mini-pollutant">
                  <span className="cmp-label">NO₂</span>
                  <span className="cmp-value aqi-number" style={{ color: 'var(--aqi-moderate)' }}>112</span>
                </div>
                <div className="city-mini-pollutant">
                  <span className="cmp-label">SO₂</span>
                  <span className="cmp-value aqi-number" style={{ color: 'var(--aqi-satisfactory)' }}>58</span>
                </div>
              </div>
 
              <div className="city-card-warning">
                <span>⚠️</span>
                <span>Above your threshold of 150</span>
              </div>
            </div>
 
            {/* Card 2 — Chennai */}
            <div className="city-card city-card--poor">
              <div className="city-card-rank">02</div>
              <div className="city-card-header">
                <div className="city-card-info">
                  <h3 className="city-card-name">Chennai</h3>
                  <p className="city-card-state">Tamil Nadu</p>
                </div>
                <button className="city-card-remove">×</button>
              </div>
 
              <div className="city-card-aqi-row">
                <span className="city-card-aqi-number aqi-number" style={{ color: 'var(--aqi-poor)' }}>247</span>
                <div className="city-card-status-col">
                  <span className="aqi-status-badge aqi-status-badge--poor">Poor</span>
                  <span className="city-card-updated">Updated 10:45 AM</span>
                </div>
              </div>
 
              <div className="city-card-bar-track">
                <div className="city-card-bar-fill" style={{ width: '62%', background: 'var(--aqi-poor)' }}></div>
              </div>
 
              <div className="city-card-pollutants">
                <div className="city-mini-pollutant">
                  <span className="cmp-label">PM2.5</span>
                  <span className="cmp-value aqi-number" style={{ color: 'var(--aqi-poor)' }}>112</span>
                </div>
                <div className="city-mini-pollutant">
                  <span className="cmp-label">PM10</span>
                  <span className="cmp-value aqi-number" style={{ color: 'var(--aqi-moderate)' }}>168</span>
                </div>
                <div className="city-mini-pollutant">
                  <span className="cmp-label">NO₂</span>
                  <span className="cmp-value aqi-number" style={{ color: 'var(--aqi-good)' }}>28</span>
                </div>
                <div className="city-mini-pollutant">
                  <span className="cmp-label">SO₂</span>
                  <span className="cmp-value aqi-number" style={{ color: 'var(--aqi-satisfactory)' }}>44</span>
                </div>
              </div>
 
              <div className="city-card-warning">
                <span>⚠️</span>
                <span>Above your threshold of 150</span>
              </div>
            </div>
 
          </div>
        </section>
 
        {/* ── Empty slots section ── */}
        <section className="watchlist-empty-slots">
          <h3 className="section-title">Available Slots</h3>
          <div className="empty-slots-grid">
 
            <div className="empty-city-card">
              <div className="empty-card-inner">
                <span className="empty-card-plus">+</span>
                <p className="empty-card-text">Add a city</p>
                <p className="empty-card-hint">Type above to search</p>
              </div>
            </div>
 
            <div className="empty-city-card">
              <div className="empty-card-inner">
                <span className="empty-card-plus">+</span>
                <p className="empty-card-text">Add a city</p>
                <p className="empty-card-hint">Type above to search</p>
              </div>
            </div>
 
            <div className="empty-city-card">
              <div className="empty-card-inner">
                <span className="empty-card-plus">+</span>
                <p className="empty-card-text">Add a city</p>
                <p className="empty-card-hint">Type above to search</p>
              </div>
            </div>
 
          </div>
        </section>
 
        {/* ── AQI scale legend ── */}
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
 
      </main>
 
      {/* ── Mobile bottom nav ── */}
      <nav className="mobile-bottom-nav">
        <a href="/dashboard" className="mobile-nav-item">
          <span className="mobile-nav-icon">◈</span>
          <span className="mobile-nav-label">Dashboard</span>
        </a>
        <a href="/watchlist" className="mobile-nav-item mobile-nav-item--active">
          <span className="mobile-nav-icon">◉</span>
          <span className="mobile-nav-label">Watchlist</span>
        </a>
        <a href="/journal" className="mobile-nav-item">
          <span className="mobile-nav-icon">◎</span>
          <span className="mobile-nav-label">Journal</span>
        </a>
        <a href="/history" className="mobile-nav-item">
          <span className="mobile-nav-icon">◇</span>
          <span className="mobile-nav-label">History</span>
        </a>
        <a href="/settings" className="mobile-nav-item">
          <span className="mobile-nav-icon">◌</span>
          <span className="mobile-nav-label">Settings</span>
        </a>
      </nav>
 
    </div>
  );
}
 
export default Watchlist;