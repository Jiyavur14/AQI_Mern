import { useState } from "react";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ showpassword, setShowpassword }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    setErrormessage("");

    try {
      const res = await fetch("https://aqi-mern.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrormessage(errorData.message || "Invalid Credentials");
        return;
      }

      const savedUser = await res.json();
      const { token, ...userObj } = savedUser;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("Currentuser", JSON.stringify(userObj));
      navigate("/dashboard");
    } catch (e) {
      console.log("Login Failed", e);
      setErrormessage("An error occurred during login. Please try again.");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ── Left panel: branding — desktop only ── */}
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo">
            <span className="auth-logo-icon">⬡</span>
            <span className="auth-logo-text">AQI Buddy</span>
          </div>
          <p className="auth-tagline">
            Your personal air quality journal.<br />
            Track, understand, breathe better.
          </p>
        </div>
        <div className="aqi-scale-strip">
          <span className="scale-dot" style={{ background: 'var(--aqi-good)' }} />
          <span className="scale-dot" style={{ background: 'var(--aqi-satisfactory)' }} />
          <span className="scale-dot" style={{ background: 'var(--aqi-moderate)' }} />
          <span className="scale-dot" style={{ background: 'var(--aqi-poor)' }} />
          <span className="scale-dot" style={{ background: 'var(--aqi-very-poor)' }} />
          <span className="scale-dot" style={{ background: 'var(--aqi-severe)' }} />
        </div>
        <p className="auth-left-footer">
          Data sourced from India's Central Pollution Control Board via data.gov.in
        </p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="auth-right">
        <div className="auth-card">

          {/* ── Mobile-only hero banner ── */}
          <div className="mobile-auth-hero">
            <div className="mobile-hero-logo">
              <span className="mobile-hero-icon">⬡</span>
              <span className="mobile-hero-name">AQI Buddy</span>
            </div>
            <p className="mobile-hero-headline">Know the air you breathe.</p>
            <p className="mobile-hero-sub">
              Live AQI for your city, personal health journal,
              and alerts when pollution crosses your limit.
            </p>
            <div className="mobile-hero-pills">
              <span className="mobile-pill">
                <span className="pill-dot" style={{ background: 'var(--aqi-good)' }}></span>
                Live AQI
              </span>
              <span className="mobile-pill">
                <span className="pill-dot" style={{ background: 'var(--aqi-moderate)' }}></span>
                Health Journal
              </span>
              <span className="mobile-pill">
                <span className="pill-dot" style={{ background: 'var(--aqi-poor)' }}></span>
                Smart Alerts
              </span>
            </div>
          </div>

          <div className="auth-card-header">
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to your AQI Buddy account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                id="email"
                value={email}
                type="email"
                className="form-input"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrormessage("");
                }}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label" htmlFor="password">Password</label>
              </div>
              <div className="password-box flex justify-between">
                <input
                  id="password"
                  value={password}
                  type={showpassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrormessage("");
                  }}
                  autoComplete="current-password"
                  required
                  minLength={8}
                />
                <span>
                  <i className="fa-regular fa-eye" onClick={() => setShowpassword((cv) => !cv)}></i>
                </span>
              </div>
              {errormessage && (
                <div className="errormsg">
                  <i className="fa-solid fa-exclamation block"></i>
                  <p>{errormessage}</p>
                </div>
              )}
              <Link to="/forgot-password" className="form-link-small">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={isloading}>
              {isloading ? "Logging in..." : "Sign in"}
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register" className="auth-switch-link">Create one</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default LoginPage;