import { useState, useEffect } from "react";
import "../App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAQIData } from "../redux/aqiSlice";



function Dashboard({
  fetchAqi,
  handlelogout,
  journaltext,
  setJournaltext,
  handledown,
  savingentry,
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
  getAQIBadgeClassPm10,
  getAQIBadgeClassPm25,
  getAQIBadgeClassNo2,
  getAQIBadgeClassO3,
  getAQIBadgeClassCo,
  getAQIBadgeClassSo2,
  isLoading,
  setIsLoading
}) {
  const user = JSON.parse(localStorage.getItem("Currentuser"));

  const dispatch = useDispatch();

  const polludata = useSelector((state) => state.aqi.polluData);

  const { PM10 } = polludata;

  const aqiVal = PM10;

  const {lastUpdated} = polludata;

  const navigate = useNavigate();

  function getAQIPercentage(aqi) {
    return `${(aqi / 500) * 100}%`;
  }

  useEffect(() => {
    fetchAqi();
  }, []);

  return (

    <div className="dashboard-layout">

       {isLoading && (
        <div className="loading-overlay">
          <div className="loading-circle"></div>
        </div>
      )}

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
          <button className="sidebar-logout" onClick={handlelogout}>
            ↩
          </button>
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
                {user.city} · Last updated {lastUpdated}
              </p>
            </div>
          </div>

          {/* Right: threshold + mobile user avatar + logout */}
          <div className="topbar-right">
            <div className="topbar-threshold-badge">
              <span className="threshold-label">Threshold</span>
              <span className="threshold-value">{user.Threshold || 150}</span>
            </div>

            {/* Mobile only — avatar + logout */}
            <div className="mobile-user-cluster">
              <div className="mobile-avatar">A</div>
              <button className="mobile-logout-btn" onClick={handlelogout}>
                ↩
              </button>
            </div>
          </div>
        </header>

        {/* Warning Banner */}
        {aqiVal > Number(user.Threshold || 150)  && (
          <div className="aqi-warning-banner">
            <span className="warning-icon">⚠️</span>
            <p>
              AQI has crossed your personal limit of{" "}
              <strong>{user.Threshold || 150}</strong>. Avoid outdoor activity.
            </p>
          </div>
        )}

        {/* Hero AQI card */}
        <section className="aqi-hero-section">
          <div className="aqi-hero-card">
            <div className="aqi-hero-left">
              <p className="aqi-hero-label">Air Quality Index</p>
              <div
                className="aqi-hero-number aqi-number"
                style={{ color: getAQIColorPm10(aqiVal) }}
              >
                {Math.floor(aqiVal)}
              </div>
              <div
                className={`aqi-status-badge ${getAQIBadgeClassPm10(aqiVal)}`}
              >
                {getAQIStatusPm10(aqiVal)}
              </div>
              <p className="aqi-hero-city">{user.city}</p>
            </div>
            <div className="aqi-hero-right">
              <div
                className="aqi-gauge-ring"
                style={{
                  "--aqi-color": getAQIColorPm10(aqiVal),
                  "--aqi-pct": getAQIPercentage(aqiVal),
                }}
              >
                <div className="aqi-gauge-inner">
                  <span className="aqi-gauge-value aqi-number">
                    {Math.floor(aqiVal)}
                  </span>
                  <span className="aqi-gauge-label">AQI</span>
                </div>
              </div>
            </div>
          </div>

          {/* AQI scale legend */}
          <div className="aqi-scale-legend">
            <div className="scale-legend-item">
              <span
                className="scale-legend-dot"
                style={{ background: "var(--aqi-good)" }}
              ></span>
              <span>Good</span>
              <span className="scale-range">0–50</span>
            </div>
            <div className="scale-legend-item">
              <span
                className="scale-legend-dot"
                style={{ background: "var(--aqi-satisfactory)" }}
              ></span>
              <span>Satisfactory</span>
              <span className="scale-range">51–100</span>
            </div>
            <div className="scale-legend-item">
              <span
                className="scale-legend-dot"
                style={{ background: "var(--aqi-moderate)" }}
              ></span>
              <span>Moderate</span>
              <span className="scale-range">101–250</span>
            </div>
            <div className="scale-legend-item">
              <span
                className="scale-legend-dot"
                style={{ background: "var(--aqi-poor)" }}
              ></span>
              <span>Poor</span>
              <span className="scale-range">251–350</span>
            </div>
            <div className="scale-legend-item">
              <span
                className="scale-legend-dot"
                style={{ background: "var(--aqi-very-poor)" }}
              ></span>
              <span>Very Poor</span>
              <span className="scale-range">351–430</span>
            </div>
            <div className="scale-legend-item">
              <span
                className="scale-legend-dot"
                style={{ background: "var(--aqi-severe)" }}
              ></span>
              <span>Severe</span>
              <span className="scale-range">431+</span>
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
                <span
                  className="pollutant-status"
                  style={{ color: getAQIColorPm25(aqiVal) }}
                >
                  {getAQIStatusPm25(aqiVal)}
                </span>
              </div>
              <div className="pollutant-value aqi-number">
                {polludata.PM25} <span className="pollutant-unit">µg/m³</span>
              </div>
              <div className="pollutant-bar-track">
                <div
                  className="pollutant-bar-fill"
                  style={{
                    width: `${(polludata.PM25 / 250) * 100}%`,
                    background: getAQIColorPm25(aqiVal),
                  }}
                ></div>
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
                <span
                  className="pollutant-status"
                  style={{ color: getAQIColorPm10(aqiVal) }}
                >
                  {getAQIStatusPm10(aqiVal)}
                </span>
              </div>
              <div className="pollutant-value aqi-number">
                {polludata.PM10} <span className="pollutant-unit">µg/m³</span>
              </div>
              <div className="pollutant-bar-track">
                <div
                  className="pollutant-bar-fill"
                  style={{
                    width: `${(polludata.PM10 / 430) * 100}%`,
                    background: getAQIColorPm10(aqiVal),
                  }}
                ></div>
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
                <span
                  className="pollutant-status"
                  style={{ color: getAQIColorNo2(aqiVal) }}
                >
                  {getAQIStatusNo2(aqiVal)}
                </span>
              </div>
              <div className="pollutant-value aqi-number">
                {polludata.NO2} <span className="pollutant-unit">µg/m³</span>
              </div>
              <div className="pollutant-bar-track">
                <div
                  className="pollutant-bar-fill"
                  style={{
                    width: `${(polludata.NO2 / 400) * 100}%`,
                    background: getAQIColorNo2(aqiVal),
                  }}
                ></div>
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
                <span
                  className="pollutant-status"
                  style={{ color: getAQIColorSo2(aqiVal) }}
                >
                  {getAQIStatusSo2(aqiVal)}
                </span>
              </div>
              <div className="pollutant-value aqi-number">
                {polludata.SO2} <span className="pollutant-unit">µg/m³</span>
              </div>
              <div className="pollutant-bar-track">
                <div
                  className="pollutant-bar-fill"
                  style={{
                    width: `${(polludata.SO2 / 1600) * 100}%`,
                    background: getAQIColorSo2(aqiVal),
                  }}
                ></div>
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
                <span
                  className="pollutant-status"
                  style={{ color: getAQIColorCo(aqiVal) }}
                >
                  {getAQIStatusCo(aqiVal)}
                </span>
              </div>
              <div className="pollutant-value aqi-number">
                {polludata.CO} <span className="pollutant-unit">mg/m³</span>
              </div>
              <div className="pollutant-bar-track">
                <div
                  className="pollutant-bar-fill"
                  style={{
                    width: `${(polludata.CO / 34) * 100}%`,
                    background: getAQIColorCo(aqiVal),
                  }}
                ></div>
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
                <span
                  className="pollutant-status"
                  style={{ color: getAQIColorO3(aqiVal) }}
                >
                  {getAQIStatusO3(aqiVal)}
                </span>
              </div>
              <div className="pollutant-value aqi-number">
                {polludata.O3} <span className="pollutant-unit">µg/m³</span>
              </div>
              <div className="pollutant-bar-track">
                <div
                  className="pollutant-bar-fill"
                  style={{
                    width: `${(polludata.O3 / 748) * 100}%`,
                    background: getAQIColorO3(aqiVal),
                  }}
                ></div>
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
              value={journaltext}
              onChange={(e) => setJournaltext(e.target.value)}
              onKeyDown={handledown}
              className="quick-journal-input"
              placeholder="How are you feeling today? Note any symptoms, outdoor plans, or observations about the air..."
              rows={3}
            />
            <div className="quick-journal-footer">
              <span className="quick-journal-stamp">
                AQI {aqiVal} will be auto-attached
              </span>
              <button
                className="btn-primary quick-journal-btn"
                onClick={savingentry}
              >
                Save Entry
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Bottom nav (mobile only) ── */}
      <nav className="mobile-bottom-nav">
        <Link
          to="/dashboard"
          className="mobile-nav-item mobile-nav-item--active"
        >
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
        <Link to="/settings" className="mobile-nav-item">
          <span className="mobile-nav-icon">◌</span>
          <span className="mobile-nav-label">Settings</span>
        </Link>
      </nav>
    </div>
  );
}

export default Dashboard;
