import { useState } from "react";
import '../App.css';
import RegisterPage from "./RegisterPage";
import {Link} from 'react-router-dom';

function LoginPage(){

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showpassword,setShowpassword] = useState(false);  
  const handleSubmit = (e)=>{
    e.preventDefault();
  console.log(email);
  console.log(password);
  }

   return (
    <div className="auth-page">
 
      {/* ── Left panel: branding ── */}
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
 
        {/* decorative AQI scale strip */}
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
                onChange={(e)=>{
                  setEmail(e.target.value)
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
                type={showpassword ?"text":"password"}
                className="form-input"
                placeholder="••••••••"
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                autoComplete="current-password"
                required
              />
              <span>
                <i class="fa-regular fa-eye" onClick={()=>setShowpassword((cv)=>!cv)} ></i>
              </span>
              
              </div>
              <Link to="/forgot-password" className="form-link-small">Forgot password?</Link>
            </div>
 
            <button type="submit" className="btn-primary btn-full">
              Sign in
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