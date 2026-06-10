import { Link } from 'react-router-dom';
import '../App.css';
 
function JournalPage() {
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
                <h2 className="topbar-title">Health Journal</h2>
              </div>
              <p className="topbar-subtitle">
                <span className="topbar-subtitle-dot">◎</span>
                Chennai · AQI auto-stamped on every entry
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
                <span className="journal-write-date">Tuesday, 9 June 2026</span>
                <div className="journal-write-aqi-stamp">
                  <span className="journal-stamp-dot" style={{ background: 'var(--aqi-poor)' }}></span>
                  <span className="journal-stamp-text">Today's AQI <strong style={{ color: 'var(--aqi-poor)' }}>247</strong> · Poor</span>
                </div>
              </div>
            </div>
 
            <textarea
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
              <button className="btn-primary journal-save-btn">Save Entry</button>
            </div>
 
          </div>
        </section>
 
        {/* ── Stats row ── */}
        <div className="journal-stats-row">
          <div className="journal-stat-card">
            <span className="journal-stat-value aqi-number">12</span>
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
 
            {/* Entry 1 */}
            <div className="journal-entry-card">
              <div className="journal-entry-left">
                <div className="journal-entry-aqi-bar" style={{ background: 'var(--aqi-very-poor)' }}></div>
              </div>
              <div className="journal-entry-body">
                <div className="journal-entry-top">
                  <div className="journal-entry-meta">
                    <span className="journal-entry-date">Monday, 8 June 2026</span>
                    <div className="journal-entry-badges">
                      <span className="journal-aqi-chip aqi-chip--very-poor">AQI 318</span>
                      <span className="journal-status-chip">Very Poor</span>
                    </div>
                  </div>
                  <div className="journal-entry-actions">
                    <button className="journal-action-btn">✎</button>
                    <button className="journal-action-btn journal-action-btn--delete">✕</button>
                  </div>
                </div>
                <p className="journal-entry-text">
                  Woke up with a dry throat and burning eyes. Skipped my morning walk entirely.
                  Stayed indoors all day and kept the windows shut. The sky had that familiar
                  grey-brown haze over the city again.
                </p>
                <div className="journal-entry-footer">
                  <span className="journal-entry-city">◎ Chennai</span>
                </div>
              </div>
            </div>
 
            {/* Entry 2 */}
            <div className="journal-entry-card">
              <div className="journal-entry-left">
                <div className="journal-entry-aqi-bar" style={{ background: 'var(--aqi-poor)' }}></div>
              </div>
              <div className="journal-entry-body">
                <div className="journal-entry-top">
                  <div className="journal-entry-meta">
                    <span className="journal-entry-date">Sunday, 7 June 2026</span>
                    <div className="journal-entry-badges">
                      <span className="journal-aqi-chip aqi-chip--poor">AQI 247</span>
                      <span className="journal-status-chip">Poor</span>
                    </div>
                  </div>
                  <div className="journal-entry-actions">
                    <button className="journal-action-btn">✎</button>
                    <button className="journal-action-btn journal-action-btn--delete">✕</button>
                  </div>
                </div>
                <p className="journal-entry-text">
                  Mild headache by afternoon. Had to cancel our evening plans to visit the
                  beach. Kids were disappointed. Took my inhaler twice today which is unusual
                  for a weekend.
                </p>
                <div className="journal-entry-footer">
                  <span className="journal-entry-city">◎ Chennai</span>
                </div>
              </div>
            </div>
 
            {/* Entry 3 — editing state */}
            <div className="journal-entry-card journal-entry-card--editing">
              <div className="journal-entry-left">
                <div className="journal-entry-aqi-bar" style={{ background: 'var(--aqi-moderate)' }}></div>
              </div>
              <div className="journal-entry-body">
                <div className="journal-entry-top">
                  <div className="journal-entry-meta">
                    <span className="journal-entry-date">Saturday, 6 June 2026</span>
                    <div className="journal-entry-badges">
                      <span className="journal-aqi-chip aqi-chip--moderate">AQI 165</span>
                      <span className="journal-status-chip">Moderate</span>
                    </div>
                  </div>
                  <div className="journal-entry-actions">
                    <button className="journal-action-btn journal-action-btn--confirm">✓ Save</button>
                    <button className="journal-action-btn">✕ Cancel</button>
                  </div>
                </div>
                {/* inline edit textarea */}
                <textarea
                  className="journal-edit-input"
                  rows={3}
                  defaultValue="Felt okay today, slightly congested in the morning but cleared up by noon. Went for a short walk in the evening."
                />
                <div className="journal-entry-footer">
                  <span className="journal-entry-city">◎ Chennai</span>
                </div>
              </div>
            </div>
 
            {/* Entry 4 */}
            <div className="journal-entry-card">
              <div className="journal-entry-left">
                <div className="journal-entry-aqi-bar" style={{ background: 'var(--aqi-good)' }}></div>
              </div>
              <div className="journal-entry-body">
                <div className="journal-entry-top">
                  <div className="journal-entry-meta">
                    <span className="journal-entry-date">Friday, 5 June 2026</span>
                    <div className="journal-entry-badges">
                      <span className="journal-aqi-chip aqi-chip--good">AQI 42</span>
                      <span className="journal-status-chip">Good</span>
                    </div>
                  </div>
                  <div className="journal-entry-actions">
                    <button className="journal-action-btn">✎</button>
                    <button className="journal-action-btn journal-action-btn--delete">✕</button>
                  </div>
                </div>
                <p className="journal-entry-text">
                  Great day! Went for a 5km run in the morning. Air felt genuinely fresh —
                  no burning sensation. Days like this are rare now.
                </p>
                <div className="journal-entry-footer">
                  <span className="journal-entry-city">◎ Chennai</span>
                </div>
              </div>
            </div>
 
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