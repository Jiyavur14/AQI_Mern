import { useState } from "react";
import '../App.css';

function LoginPage(){
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
 
          {/* Replace with your controlled form */}
          <div className="auth-form">
 
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
 
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label" htmlFor="password">Password</label>
              </div>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <a href="/forgot-password" className="form-link-small">Forgot password?</a>
            </div>
 
            <button type="submit" className="btn-primary btn-full">
              Sign in
            </button>
 
          </div>
 
          <p className="auth-switch">
            Don't have an account?{' '}
            <a href="/register" className="auth-switch-link">Create one</a>
          </p>
 
        </div>
      </div>
 
    </div>
  );
}

export default LoginPage;