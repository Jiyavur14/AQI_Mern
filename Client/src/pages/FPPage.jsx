import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
 
function ForgotPasswordPage() {
  // 'email' | 'otp' | 'success'
  const [step, setStep] = useState('email');
 
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
 
      {/* ── Right panel ── */}
      <div className="auth-right">
        <div className="auth-card">
 
          {/* ── Step 1: Enter email ── */}
          {step === 'email' && (
            <>
              <div className="auth-card-header">
                <div className="fp-icon-wrap">
                  <span className="fp-icon">🔑</span>
                </div>
                <h1 className="auth-title">Forgot password?</h1>
                <p className="auth-subtitle">
                  Enter your registered email and we'll send you a reset code.
                </p>
              </div>
 
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
 
                {/* Wire this button to your API call, then call setStep('otp') on success */}
                <button
                  type="submit"
                  className="btn-primary btn-full"
                  onClick={() => setStep('otp')}
                >
                  Send reset code
                </button>
              </div>
 
              <p className="auth-switch">
                Remember your password?{' '}
                <Link to="/login" className="auth-switch-link">Sign in</Link>
              </p>
            </>
          )}
 
          {/* ── Step 2: Enter OTP + new password ── */}
          {step === 'otp' && (
            <>
              <div className="auth-card-header">
                <div className="fp-icon-wrap">
                  <span className="fp-icon">📩</span>
                </div>
                <h1 className="auth-title">Check your email</h1>
                <p className="auth-subtitle">
                  We sent a 6-digit code to your email. Enter it below along with your new password.
                </p>
              </div>
 
              <div className="auth-form">
 
                {/* OTP boxes */}
                <div className="form-group">
                  <label className="form-label">Reset code</label>
                  <div className="otp-group">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <input
                        key={i}
                        type="text"
                        className="otp-input"
                        maxLength={1}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                      />
                    ))}
                  </div>
                </div>
 
                <div className="form-group">
                  <label className="form-label" htmlFor="newPassword">New password</label>
                  <input
                    id="newPassword"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </div>
 
                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">Confirm new password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </div>
 
                {/* Wire this to your API call, then call setStep('success') on success */}
                <button
                  type="submit"
                  className="btn-primary btn-full"
                  onClick={() => setStep('success')}
                >
                  Reset password
                </button>
              </div>
 
              <p className="auth-switch">
                Didn't receive the code?{' '}
                <button
                  className="auth-switch-link fp-resend-btn"
                  onClick={() => setStep('email')}
                >
                  Resend
                </button>
              </p>
            </>
          )}
 
          {/* ── Step 3: Success ── */}
          {step === 'success' && (
            <div className="fp-success">
              <div className="fp-success-icon">✓</div>
              <h1 className="auth-title">Password reset!</h1>
              <p className="auth-subtitle">
                Your password has been updated successfully. You can now sign in with your new password.
              </p>
              <Link to="/login" className="btn-primary btn-full fp-success-btn">
                Back to sign in
              </Link>
            </div>
          )}
 
        </div>
      </div>
 
    </div>
  );
}
 
export default ForgotPasswordPage;