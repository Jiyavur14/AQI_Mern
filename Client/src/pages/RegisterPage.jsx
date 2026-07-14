import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import states from '../assets/states.json';
/* List of major Indian cities for the home city dropdown */

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
  let stateVal = "";
  const handlechange = (e) => {
    setErrormsg("");
    const { name, value } = e.target;

    setUsers((prev) => ({
      ...prev,
      [name]: value
    }));

    if(name === "state")
      stateVal = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    

    try {
      // Find the state corresponding to the selected city from states.json
      const foundStateObj = states.States.find((stat) =>
        stat.districts.includes(users.city)
      );
      const userState = foundStateObj ? foundStateObj.state : "";

      // Construct payload with required keys
      const payload = {
        name: users.name,
        email: users.email,
        state: userState,
        city: users.city,
        password: users.password,
        confirm_password: users.confirm_password,
      };

      const res = await fetch("https://aqi-mern.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrormsg(errorData.message || "Registration failed");
        return;
      }

      const savedUser = await res.json();

      console.log("Stored", savedUser);

      // Extract JWT token and user details to store separately
      const { token, ...userObj } = savedUser;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userObj));
      // Save under Currentuser as well to maintain compatibility with existing protected routes
      localStorage.setItem("Currentuser", JSON.stringify(userObj));

      setUsers({
        name: "",
        email: "",
        state: "",
        city: "",
        password: "",
        confirm_password: "",
      });

      alert("You've successfully registered");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrormsg("Registration failed");
    } finally {
      setIsloading(false);
    }
  };

  const selectedState = states.States.find((stat) =>
             stat.state === users.state)

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
                  {INDIAN_CITIES.map((each) =>
                  <option key={each} value={each}>
                    {each}
                  </option>)}
                
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
                minLength={8}
                
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
                minLength={8}
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
