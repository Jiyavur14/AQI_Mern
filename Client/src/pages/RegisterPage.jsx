import '../App.css';
 
/* List of major Indian cities for the home city dropdown */
const INDIAN_CITIES = [
  'Ahmedabad', 'Bengaluru', 'Bhopal', 'Chennai', 'Coimbatore',
  'Delhi', 'Faridabad', 'Ghaziabad', 'Gurugram', 'Hyderabad',
  'Indore', 'Jaipur', 'Kanpur', 'Kochi', 'Kolkata',
  'Lucknow', 'Ludhiana', 'Mumbai', 'Nagpur', 'Patna',
  'Pune', 'Rajkot', 'Surat', 'Thane', 'Varanasi',
  'Visakhapatnam',
];
 
function RegisterPage() {
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
            Join thousands of Indians tracking<br />
            the air they breathe, every day.
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
 
          <div className="auth-card-header">
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Start tracking your air quality today</p>
          </div>
 
          <div className="auth-form">
 
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="Arjun Sharma"
                autoComplete="name"
              />
            </div>
 
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
              <label className="form-label" htmlFor="city">Home city</label>
              <select id="city" className="form-input form-select">
                <option value="" disabled selected>Select your city</option>
                {INDIAN_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
 
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
 
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                className="form-input"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
 
            <button type="submit" className="btn-primary btn-full">
              Create account
            </button>
 
          </div>
 
          <p className="auth-switch">
            Already have an account?{' '}
            <a href="/login" className="auth-switch-link">Sign in</a>
          </p>
 
        </div>
      </div>
 
    </div>
  );
}
 
export default RegisterPage;