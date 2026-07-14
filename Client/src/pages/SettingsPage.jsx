import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


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
    "Faridabad",
    "Navi Mumbai",
    "Delhi",
    "Dehradun",
    "Moradabad",
    "Ghaziabad",
    "Gummidipoondi",
    "Bareilly",
];


function SettingsPage({
  handlelogout,
  getAQIColor,
  getAQIStatus,
  getAQIBadgeClass,
  deleteJournals,
  deleteAccount,
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
}) {
  const [password, setpassword] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");

  const [currentpassword, setCurrentPassword] = useState("");

  const [errmsg, setErrMsg] = useState("");

  const [updatePassword, setUpdatePassword] = useState(false);

  const [editThreshold, setEditThreshold] = useState(false);

  const nowUser = JSON.parse(localStorage.getItem("Currentuser"))

  const [meter, setMeter] = useState(Number(nowUser.Threshold) || 150);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Currentuser")) || []);

  const [editStatus, setEditStatus] = useState(true);

  const handleedit = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const updateUser = await fetch(`https://aqi-mern.onrender.com/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          city: user.city,
        }),
      });

      if (!updateUser.ok) {
        const errorData = await updateUser.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const res = await updateUser.json();
      localStorage.setItem("Currentuser", JSON.stringify(res));
      localStorage.setItem("user", JSON.stringify(res));
      setUser(res);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to update profile");
    }
  };

  const handlePassword = async () => {
    if (password !== confirmpassword) {
      alert("Password Mismatched");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const patchWork = await axios.patch(
        `https://aqi-mern.onrender.com/users/${user.id}`,
        {
          currentPassword: currentpassword,
          password: password,
          confirm_password: confirmpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.setItem("Currentuser", JSON.stringify(patchWork.data));
      localStorage.setItem("user", JSON.stringify(patchWork.data));
      setUser(patchWork.data);
      alert("New password has been set!");
      setCurrentPassword("");
      setpassword("");
      setConfirmPassword("");
      setUpdatePassword(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update password");
    }
  };

  const handleDeleteJournals = async () => {
    if (confirm("Do you wanna clear all journal entries?")) {
      try {
        const token = localStorage.getItem("token");
        const patchWork = await axios.patch(
          `https://aqi-mern.onrender.com/users/${user.id}`,
          { ...user, journalEntries: [] },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        localStorage.setItem("Currentuser", JSON.stringify(patchWork.data));
        localStorage.setItem("user", JSON.stringify(patchWork.data));
        setUser(patchWork.data);
        alert("Journal Has been Cleared!");
        window.location.reload(); // Force full reload to synchronize parent state in App.jsx
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Failed to clear journal");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Do You want to delete your Account?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://aqi-mern.onrender.com/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.removeItem("Currentuser");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        handlelogout();
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Failed to delete account");
      }
    }
  };

  const handledown = (e) => {
    if (e.Key === "Enter") handlePassword();
  };

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
              <button className="mobile-logout-btn" onClick={handlelogout}>↩</button>
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
                name="name"
                disabled={editStatus}
                onChange={handleedit}
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
                name="email"
                onChange={handleedit}
                disabled={editStatus}
                placeholder="you@example.com"
              />
            </div>

            {/* Home city field */}
            <div className="settings-field">
              <label className="settings-label">Home city</label>
              <select
                className="settings-input settings-select"
                name="city"
                disabled={editStatus}
                onChange={handleedit}
              >
               <option value="" disabled>
                  Select your city
                </option>
                  {INDIAN_CITIES.map((each) =>
                  <option key={each} value={each}>
                    {each}
                  </option>)}
                
              </select>
              <p className="settings-field-hint">
                This city's AQI is shown on your dashboard and auto-stamped on
                journal entries
              </p>
            </div>

            <div className="settings-card-footer">
              <button
                className="btn-primary settings-save-btn"
                onClick={() => {
                  setEditStatus((prev) => !prev);
                  if (!editStatus) updateUserProfile();
                }}
              >
                {editStatus ? "Edit" : "Save"} Profile
              </button>
            </div>
          </div>
        </section>

        {/* ── AQI Threshold section ── */}
        <section className="settings-section">
          <div className="settings-section-header">
            <h3 className="settings-section-title">Personal AQI Threshold</h3>
            <p className="settings-section-desc">
              Get warned when air crosses your personal limit
            </p>
          </div>

          <div className="settings-card">
            {/* Threshold display */}
            <div className="threshold-display-row">
              <div className="threshold-display-left">
                <span className="threshold-current-label">
                  Your current threshold
                </span>
                <span
                  className="threshold-current-value aqi-number"
                  style={{ color: getAQIColorPm10(meter) }}
                >
                  {meter}
                </span>
                <span className={`aqi-status-badge ${getAQIBadgeClassPm10(meter)}`}>
                  {getAQIStatusPm10(meter)} zone
                </span>
              </div>
              <div className="threshold-display-right">
                <p className="threshold-tip">
                  ⚠️ Warning fires when AQI exceeds this value
                </p>
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
                value={meter}
                onChange={(e) => setMeter(e.target.value)}
                className="threshold-slider"
                disabled={!editThreshold}
              />
              <div className="threshold-scale-strip">
                <span
                  className="threshold-scale-seg"
                  style={{ background: getAQIColorPm10(meter) }}
                ></span>
                <span
                  className="threshold-scale-seg"
                  style={{ background: getAQIColorPm10(meter) }}
                ></span>
                <span
                  className="threshold-scale-seg"
                  style={{ background: getAQIColorPm10(meter) }}
                ></span>
                <span
                  className="threshold-scale-seg"
                  style={{ background: getAQIColorPm10(meter) }}
                ></span>
                <span
                  className="threshold-scale-seg"
                  style={{ background: getAQIColorPm10(meter) }}
                ></span>
                <span
                  className="threshold-scale-seg"
                  style={{ background: getAQIColorPm10(meter) }}
                ></span>
              </div>
            </div>

            {/* Who should set what */}
            <div className="threshold-guide">
              <div className="threshold-guide-item">
                <span
                  className="threshold-guide-dot"
                  style={{ background: "var(--aqi-good)" }}
                ></span>
                <span>
                  <strong>50–100</strong> — Asthma patients, elderly, children
                </span>
              </div>
              <div className="threshold-guide-item">
                <span
                  className="threshold-guide-dot"
                  style={{ background: "var(--aqi-moderate)" }}
                ></span>
                <span>
                  <strong>100–200</strong> — Sensitive individuals
                </span>
              </div>
              <div className="threshold-guide-item">
                <span
                  className="threshold-guide-dot"
                  style={{ background: "var(--aqi-poor)" }}
                ></span>
                <span>
                  <strong>200–300</strong> — Healthy adults
                </span>
              </div>
            </div>

            <div className="settings-card-footer">
              <button
                onClick={async () => {
                  setEditThreshold((prev) => !prev);
                  if (editThreshold) {
                    try {
                      const token = localStorage.getItem("token");
                      const patchWork = await axios.patch(
                        `https://aqi-mern.onrender.com/users/${user.id}`,
                        { Threshold: meter },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`
                          }
                        }
                      );
                      localStorage.setItem("Currentuser", JSON.stringify(patchWork.data));
                      localStorage.setItem("user", JSON.stringify(patchWork.data));
                      setUser(patchWork.data);
                      alert("New Threshold Saved");
                    } catch (error) {
                      console.error(error);
                      alert(error.response?.data?.message || "Failed to save threshold");
                    }
                  }
                }}
                className="btn-primary settings-save-btn"
              >
                {editThreshold ? "Save" : "Edit"} Threshold
              </button>
            </div>
          </div>
        </section>

        {/* ── Password section ── */}
        <section className="settings-section">
          <div className="settings-section-header">
            <h3 className="settings-section-title">Change Password</h3>
            <p className="settings-section-desc">
              Update your account password
            </p>
          </div>

          <div className="settings-card">
            <div className="settings-field">
              <label className="settings-label">Current password</label>
              <input
                type="password"
                className="settings-input"
                placeholder="••••••••"
                disabled={!updatePassword}
                value={currentpassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="settings-field">
              <label className="settings-label">New password</label>
              <input
                type="password"
                className="settings-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                disabled={!updatePassword}
              />
            </div>

            <div className="settings-field">
              <label className="settings-label">Confirm new password</label>
              <input
                type="password"
                className="settings-input"
                placeholder="••••••••"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={!updatePassword}
              />
            </div>

            <div className="settings-card-footer">
              <button
                className="btn-primary settings-save-btn"
                onClick={() => {
                  if (updatePassword) {
                    handlePassword();
                  } else {
                    setUpdatePassword(true);
                  }
                }}
              >
                {updatePassword ? "Set New" : "Update"} Password
              </button>
            </div>
          </div>
        </section>

        {/* ── Danger zone ── */}
        <section className="settings-section">
          <div className="settings-section-header">
            <h3 className="settings-section-title settings-section-title--danger">
              Danger Zone
            </h3>
            <p className="settings-section-desc">
              Irreversible actions — proceed with caution
            </p>
          </div>

          <div className="settings-card settings-card--danger">
            <div className="danger-row">
              <div className="danger-row-info">
                <p className="danger-row-title">Clear all journal entries</p>
                <p className="danger-row-desc">
                  Permanently deletes all your health journal entries and AQI
                  history. Cannot be undone.
                </p>
              </div>
              <button className="settings-danger-btn" onClick={handleDeleteJournals}>Clear Journal</button>
            </div>

            <div className="settings-divider"></div>

            <div className="danger-row">
              <div className="danger-row-info">
                <p className="danger-row-title">Delete account</p>
                <p className="danger-row-desc">
                  Permanently deletes your account, all journal entries, and
                  watchlist data. Cannot be undone.
                </p>
              </div>
              <button className="settings-danger-btn settings-danger-btn--hard" onClick={handleDeleteAccount}>
                Delete Account
              </button>
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
