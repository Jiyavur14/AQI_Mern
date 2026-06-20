import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const INDIAN_STATES = [
  "TamilNadu",
  "Kerala",
  "Up",
  "Delhi",
  "Telugana",
  "Gujarat",
  "Karnataka",
  "Jarkant",
  "Jammu",
];

/* List of major Indian cities for the home city dropdown */
const INDIAN_CITIES = [
  "Ahmedabad",
  "Bengaluru",
  "Bhopal",
  "Chennai",
  "Coimbatore",
  "Faridabad",
  "Ghaziabad",
  "Gurugram",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Kanpur",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Ludhiana",
  "Mumbai",
  "Nagpur",
  "Patna",
  "Pune",
  "Rajkot",
  "Surat",
  "Thane",
  "Varanasi",
  "Visakhapatnam",
];

function RegisterPage({
  setUsers,
  users,
  showpassword,
  setShowpassword,
  formdata,
  setFormdata,
}) {
  const [errormsg, setErrormsg] = useState("");
  const [loading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const timeref = useRef(null);

  const handlechange = (e) => {
    setErrormsg("");
    const { name, value } = e.target;

    setUsers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const check = await fetch("http://localhost:5000/users");

    const allusers = await check.json();

    if (users.password !== users.confirm_password) {
      setErrormsg("Password Doesn't Match");
      return;
    }

    const email_existence = allusers.find((c) => c.email === users.email);

    if (email_existence) {
      setErrormsg("User Already Exist");
      setIsloading(false);
      return;
    }

    setIsloading(true);

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users),
      });

      const savedUser = await res.json();

      console.log("Stored", savedUser);

      setUsers({
        name: "",
        email: "",
        state: "",
        city: "",
        password: "",
        confirm_password: "",
      });

      alert("You've successfully registered");
      console.log(allusers);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrormsg("Registration failed");
    } finally {
      setIsloading(false);
    }
  };

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
            Join thousands of Indians tracking
            <br />
            the air they breathe, every day.
          </p>
        </div>

        <div className="aqi-scale-strip">
          <span
            className="scale-dot"
            style={{ background: "var(--aqi-good)" }}
          />
          <span
            className="scale-dot"
            style={{ background: "var(--aqi-satisfactory)" }}
          />
          <span
            className="scale-dot"
            style={{ background: "var(--aqi-moderate)" }}
          />
          <span
            className="scale-dot"
            style={{ background: "var(--aqi-poor)" }}
          />
          <span
            className="scale-dot"
            style={{ background: "var(--aqi-very-poor)" }}
          />
          <span
            className="scale-dot"
            style={{ background: "var(--aqi-severe)" }}
          />
        </div>

        <p className="auth-left-footer">
          Data sourced from India's Central Pollution Control Board via
          data.gov.in
        </p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-card-header">
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">
              Start tracking your air quality today
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                value={users.name}
                onChange={handlechange}
                type="text"
                className="form-input"
                placeholder="Arjun Sharma"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                value={users.email}
                onChange={handlechange}
                type="email"
                className="form-input"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="state">
                State
              </label>
              <select
                name="state"
                value={users.state}
                onChange={handlechange}
                required
                id="city"
                className="form-input form-select"
              >
                <option value="" disabled>
                  Select your state
                </option>
                {INDIAN_STATES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="city">
                Home city
              </label>
              <select
                name="city"
                value={users.city}
                onChange={handlechange}
                required
                id="city"
                className="form-input form-select"
              >
                <option value="" disabled>
                  Select your city
                </option>
                {INDIAN_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={users.password}
                onChange={handlechange}
                className="form-input"
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group fg">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showpassword ? "text" : "password"}
                name="confirm_password"
                value={users.confirm_password}
                onChange={handlechange}
                className="form-input"
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
              <span>
                <i
                  className="fa-regular fa-eye"
                  onClick={() => setShowpassword((cv) => !cv)}
                ></i>
              </span>
            </div>

            {errormsg && <div className="errormsg">{errormsg}</div>}

            <button
              type="submit"
              className="btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-switch-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
