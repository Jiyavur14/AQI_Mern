import '../App.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';

function SettingsPage({handlelogout}) {



    const [user,setUser] = useState(JSON.parse(localStorage.getItem("Currentuser")));

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
          <Link to="/journal" className="nav-item">
            <span className="nav-icon">◎</span>
            <span>Journal</span>
          </Link>
          <Link to="/settings" className="nav-item nav-item--active">
            <span className="nav-icon">◌</span>
            <span>Settings</span>
          </Link>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">A</div>
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

        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <div className="mobile-logo">
              <span className="sidebar-logo-icon">⬡</span>
              <span className="sidebar-logo-text">AQI Buddy</span>
            </div>
            <div className="topbar-heading-block">
              <div className="topbar-heading-row">
                <h2 className="topbar-title">Settings</h2>
              </div>
              <p className="topbar-subtitle">
                <span className="topbar-subtitle-dot">◎</span>
                Manage your profile and preferences
              </p>
            </div>
          </div>
          <div className="topbar-right">
            <div className="mobile-user-cluster">
              <div className="mobile-avatar">A</div>
              <button className="mobile-logout-btn">↩</button>
            </div>
          </div>
        </header>

        {/* ── Profile section ── */}
        <section className="settings-section">
          <div className="settings-section-header">
            <h3 className="settings-section-title">Profile</h3>
            <p className="settings-section-desc">Your personal information</p>
          </div>

          <div className="settings-card">

            {/* Avatar row */}
            <div className="settings-avatar-row">
              <div className="settings-avatar-big">A</div>
              <div className="settings-avatar-info">
                <p className="settings-avatar-name">{user.name}</p>
                <p className="settings-avatar-email">{user.email}</p>
              </div>
            </div>

            <div className="settings-divider"></div>

            {/* Name field */}
            <div className="settings-field">
              <label className="settings-label">Full name</label>
              <input
                type="text"
                className="settings-input"
                value={user.name}
                placeholder="Your full name"
              />
            </div>

            {/* Email field */}
            <div className="settings-field">
              <label className="settings-label">Email address</label>
              <input
                type="email"
                className="settings-input"
                value={user.email}
                placeholder="you@example.com"
              />
            </div>

            {/* Home city field */}
            <div className="settings-field">
              <label className="settings-label">Home city</label>
              <select className="settings-input settings-select">
                <option value={user.city} selected>{user.city}</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Lucknow">Lucknow</option>
              </select>
              <p className="settings-field-hint">This city's AQI is shown on your dashboard and auto-stamped on journal entries</p>
            </div>

            <div className="settings-card-footer">
              <button className="btn-primary settings-save-btn">Edit Profile</button>
            </div>

          </div>
        </section>

        {/* ── AQI Threshold section ── */}
        <section className="settings-section">
          <div className="settings-section-header">
            <h3 className="settings-section-title">Personal AQI Threshold</h3>
            <p className="settings-section-desc">Get warned when air crosses your personal limit</p>
          </div>

          <div className="settings-card">

            {/* Threshold display */}
            <div className="threshold-display-row">
              <div className="threshold-display-left">
                <span className="threshold-current-label">Your current threshold</span>
                <span className="threshold-current-value aqi-number" style={{ color: 'var(--aqi-poor)' }}>150</span>
                <span className="aqi-status-badge aqi-status-badge--poor">Poor zone</span>
              </div>
              <div className="threshold-display-right">
                <p className="threshold-tip">⚠️ Warning fires when AQI exceeds this value</p>
              </div>
            </div>

            {/* Slider */}
            <div className="settings-field">
              <div className="threshold-slider-labels">
                <span>50</span>
                <span>Sensitive</span>
                <span>400</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                defaultValue="150"
                className="threshold-slider"
              />
              <div className="threshold-scale-strip">
                <span className="threshold-scale-seg" style={{ background: 'var(--aqi-good)' }}></span>
                <span className="threshold-scale-seg" style={{ background: 'var(--aqi-satisfactory)' }}></span>
                <span className="threshold-scale-seg" style={{ background: 'var(--aqi-moderate)' }}></span>
                <span className="threshold-scale-seg" style={{ background: 'var(--aqi-poor)' }}></span>
                <span className="threshold-scale-seg" style={{ background: 'var(--aqi-very-poor)' }}></span>
                <span className="threshold-scale-seg" style={{ background: 'var(--aqi-severe)' }}></span>
              </div>
            </div>

            {/* Who should set what */}
            <div className="threshold-guide">
              <div className="threshold-guide-item">
                <span className="threshold-guide-dot" style={{ background: 'var(--aqi-good)' }}></span>
                <span><strong>50–100</strong> — Asthma patients, elderly, children</span>
              </div>
              <div className="threshold-guide-item">
                <span className="threshold-guide-dot" style={{ background: 'var(--aqi-moderate)' }}></span>
                <span><strong>100–200</strong> — Sensitive individuals</span>
              </div>
              <div className="threshold-guide-item">
                <span className="threshold-guide-dot" style={{ background: 'var(--aqi-poor)' }}></span>
                <span><strong>200–300</strong> — Healthy adults</span>
              </div>
            </div>

            <div className="settings-card-footer">
              <button className="btn-primary settings-save-btn">Save Threshold</button>
            </div>

          </div>
        </section>

        {/* ── Password section ── */}
        <section className="settings-section">
          <div className="settings-section-header">
            <h3 className="settings-section-title">Change Password</h3>
            <p className="settings-section-desc">Update your account password</p>
          </div>

          <div className="settings-card">

            <div className="settings-field">
              <label className="settings-label">Current password</label>
              <input
                type="password"
                className="settings-input"
                placeholder="••••••••"
              />
            </div>

            <div className="settings-field">
              <label className="settings-label">New password</label>
              <input
                type="password"
                className="settings-input"
                placeholder="••••••••"
              />
            </div>

            <div className="settings-field">
              <label className="settings-label">Confirm new password</label>
              <input
                type="password"
                className="settings-input"
                placeholder="••••••••"
              />
            </div>

            <div className="settings-card-footer">
              <button className="btn-primary settings-save-btn">Update Password</button>
            </div>

          </div>
        </section>

        {/* ── Danger zone ── */}
        <section className="settings-section">
          <div className="settings-section-header">
            <h3 className="settings-section-title settings-section-title--danger">Danger Zone</h3>
            <p className="settings-section-desc">Irreversible actions — proceed with caution</p>
          </div>

          <div className="settings-card settings-card--danger">

            <div className="danger-row">
              <div className="danger-row-info">
                <p className="danger-row-title">Clear all journal entries</p>
                <p className="danger-row-desc">Permanently deletes all your health journal entries and AQI history. Cannot be undone.</p>
              </div>
              <button className="settings-danger-btn">Clear Journal</button>
            </div>

            <div className="settings-divider"></div>

            <div className="danger-row">
              <div className="danger-row-info">
                <p className="danger-row-title">Delete account</p>
                <p className="danger-row-desc">Permanently deletes your account, all journal entries, and watchlist data. Cannot be undone.</p>
              </div>
              <button className="settings-danger-btn settings-danger-btn--hard">Delete Account</button>
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
        <Link to="/journal" className="mobile-nav-item">
          <span className="mobile-nav-icon">◎</span>
          <span className="mobile-nav-label">Journal</span>
        </Link>
        <Link to="/settings" className="mobile-nav-item mobile-nav-item--active">
          <span className="mobile-nav-icon">◌</span>
          <span className="mobile-nav-label">Settings</span>
        </Link>
      </nav>

    </div>
  );
}

export default SettingsPage;