import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAQIData } from "../redux/aqiSlice";

const INDIAN_CITIES = [
  "Guwahati",
  "Visakhapatnam",
  "Gaya",
  "Patna",
  "Raipur",
  "Cuddalore",
  "Chennai",
  "Hyderabad",
  "Agra",
  "Noida",
  "Varanasi",
  "Howrah",
  "Kolkata",
  "Meerut",
  "Lucknow",
  "Navi Mumbai",
  "Asansol",
  "Mumbai",
  "Faridabad",
  "Navi Mumbai",
  "Delhi",
  "Dehradun",
  "Moradabad",
  "Ghaziabad",
  "Gummidipoondi",
  "Bareilly",
];

function Watchlist({
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
  getAQIBadgeClassPm10,
  getAQIBadgeClassPm25,
  getAQIBadgeClassNo2,
  getAQIBadgeClassO3,
  getAQIBadgeClassCo,
  getAQIBadgeClassSo2,
  cities,
  setCities,
  cityinput,
  setCityinput,
}) {
  const [warning, setWarning] = useState(false);

  const [samp, setSamp] = useState([1, 1, 1, 1, 1]);

  const addcity = () => {
    if (!cityinput.trim()) return;
    else {
      if (cities.length >= 5) return alert("Maximum limit has reached");
      else {
        setSamp(() => samp.slice(0, -1));
        const newentry = {
          city: cityinput,
          aqi: Math.floor(Math.random() * 500),
          pm: Math.floor(Math.random() * 500),
          pn: Math.floor(Math.random() * 500),
          no: Math.floor(Math.random() * 500),
          so: Math.floor(Math.random() * 500),
          state: "TamilNadu",
          updatedAt: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        };

        const updatedcities = [...cities, newentry];

        setCities(updatedcities);

        localStorage.setItem("cities", JSON.stringify(updatedcities));

        setCityinput("");
      }
    }
  };

  const userrr = JSON.parse(localStorage.getItem("Currentuser"));

  const deletecity = (indexToDelete) => {
    setSamp(() => [...samp, 1]);
    const newupdate = cities.filter((each, index) => {
      return index !== indexToDelete;
    });

    setCities(newupdate);

    localStorage.setItem("cities", JSON.stringify(newupdate));
  };

  const handledown = (e) => {
    if (e.key === "Enter") addcity();
  };

 const filteredCities = INDIAN_CITIES.filter(
  city =>(
    city.toLowerCase().startsWith(cityinput.toLowerCase()) &&
    city.toLowerCase() !== cityinput.toLowerCase())
);

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
            <div className="sidebar-avatar">{userrr.name.charAt(0)}</div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">{userrr.name}</p>
              <p className="sidebar-user-city">Chennai</p>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handlelogout}>
            ↩
          </button>
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
              <span className="threshold-value">{userrr.Threshold || 150}</span>
            </div>
            <div className="mobile-user-cluster">
              <div className="mobile-avatar">A</div>
              <button className="mobile-logout-btn">↩</button>
            </div>
          </div>
        </header>

        {/* ── Add city bar ── */}
        <div className="watchlist-add-bar flex flex-col">
          <div className="watchlist-add-inner">
            <span className="watchlist-add-icon">◉</span>
            <input
              type="text"
              value={cityinput}
              onChange={(e) => setCityinput(e.target.value)}
              onKeyDown={handledown}
              className="watchlist-add-input"
              placeholder="Type a city name — e.g. Chennai, Kolkata, Mumbai..."
            />
            <button className="watchlist-add-btn" onClick={addcity}>
              <span>+ Add City</span>
            </button>
          </div>
            {cityinput && (
              <div className="city-suggestions">
                {filteredCities.map((city) => (
                  <div
                    key={city}
                    className="city-suggestion-item"
                    onClick={() => setCityinput(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          <p className="watchlist-add-hint">
            {cities.length} of 5 cities added
          </p>
        </div>

        {/* ── Slot indicators ── */}
        <div className="watchlist-slots">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`slot ${
                index < cities.length ? "slot--filled" : "slot--empty"
              }`}
            >
              <span
                className={`slot-dot ${
                  index < cities.length ? "slot-dot--filled" : "slot-dot--empty"
                }`}
              ></span>
            </div>
          ))}
        </div>

        {/* ── City cards ── */}
        <section className="watchlist-section">
          <h3 className="section-title">Your Cities</h3>
          <div className="watchlist-grid">

            {cities.map((each, index) => {
              const isThresholdCrossed = each.aqi >= 150;

              return (
                <>
                  {/* Card 1 — Worst (Delhi) */}
                  <div className="city-card city-card--very-poor" key={index}>
                    <div className="city-card-rank">{index + 1}</div>
                    <div className="city-card-header">
                      <div className="city-card-info">
                        <h3 className="city-card-name">{each.city}</h3>
                      </div>
                      <button
                        className="city-card-remove"
                        onClick={() => deletecity(index)}
                      >
                        ×
                      </button>
                    </div>

                    <div className="city-card-aqi-row">
                      <span
                        className="city-card-aqi-number aqi-number"
                        style={{ color: getAQIColorPm10(each.aqi) }}
                      >
                        {each.aqi}
                      </span>
                      <div className="city-card-status-col">
                        <span
                          className={`aqi-status-badge ${getAQIBadgeClassPm10(each.aqi)}`}
                        >
                          {getAQIStatusPm10(each.aqi)}
                        </span>
                        <span className="city-card-updated">
                          Updated {each.updatedAt}
                        </span>
                      </div>
                    </div>

                    <div className="city-card-bar-track">
                      <div
                        className="city-card-bar-fill"
                        style={{
                          width: `${(each.aqi / 500) * 100}%`,
                          background: getAQIColorPm10(each.aqi),
                        }}
                      ></div>
                    </div>

                    <div className="city-card-pollutants">
                      <div className="city-mini-pollutant">
                        <span className="cmp-label">PM2.5</span>
                        <span
                          className="cmp-value aqi-number"
                          style={{ color: getAQIColorPm25(each.pm) }}
                        >
                          {each.pm}
                        </span>
                      </div>
                      <div className="city-mini-pollutant">
                        <span className="cmp-label">PM10</span>
                        <span
                          className="cmp-value aqi-number"
                          style={{ color: getAQIColorPm10(each.pn) }}
                        >
                          {each.pn}
                        </span>
                      </div>
                      <div className="city-mini-pollutant">
                        <span className="cmp-label">NO₂</span>
                        <span
                          className="cmp-value aqi-number"
                          style={{ color: getAQIColorNo2(each.no) }}
                        >
                          {each.no}
                        </span>
                      </div>
                      <div className="city-mini-pollutant">
                        <span className="cmp-label">SO₂</span>
                        <span
                          className="cmp-value aqi-number"
                          style={{ color: getAQIColorSo2(each.so) }}
                        >
                          {each.so}
                        </span>
                      </div>
                    </div>

                    {isThresholdCrossed && (
                      <div className="city-card-warning">
                        <span>⚠️</span>
                        <span>Above your threshold of 150</span>
                      </div>
                    )}

                    {!isThresholdCrossed && (
                      <div
                        className="city-card-warning"
                        style={{
                          background: "rgba(90, 217, 64, 0.08)",
                          border: "1px solid rgba(128, 217, 64, 0.2)",
                        }}
                      >
                        <span>✅</span>
                        <span>
                          Air Quality is in {getAQIStatusPm10(each.aqi)} Level
                        </span>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </section>

        {/* ── Empty slots section ── */}
        {cities.length < 5 && (
          <section className="watchlist-empty-slots">
            <h3 className="section-title">Available Slots</h3>
            <div className="empty-slots-grid">
              {Array.from({ length: 5 - cities.length }).map((_, index) => (
                <div className="empty-city-card" key={index}>
                  <div className="empty-card-inner">
                    <span className="empty-card-plus">+</span>
                    <p className="empty-card-text">Add a city</p>
                    <p className="empty-card-hint">Type above to search</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── AQI scale legend ── */}
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
            <span className="scale-range">101–200</span>
          </div>
          <div className="scale-legend-item">
            <span
              className="scale-legend-dot"
              style={{ background: "var(--aqi-poor)" }}
            ></span>
            <span>Poor</span>
            <span className="scale-range">201–300</span>
          </div>
          <div className="scale-legend-item">
            <span
              className="scale-legend-dot"
              style={{ background: "var(--aqi-very-poor)" }}
            ></span>
            <span>Very Poor</span>
            <span className="scale-range">301–400</span>
          </div>
          <div className="scale-legend-item">
            <span
              className="scale-legend-dot"
              style={{ background: "var(--aqi-severe)" }}
            ></span>
            <span>Severe</span>
            <span className="scale-range">401+</span>
          </div>
        </div>
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="mobile-bottom-nav">
        <Link to="/dashboard" className="mobile-nav-item">
          <span className="mobile-nav-icon">◈</span>
          <span className="mobile-nav-label">Dashboard</span>
        </Link>
        <Link
          to="/watchlist"
          className="mobile-nav-item mobile-nav-item--active"
        >
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

export default Watchlist;
