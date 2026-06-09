import { useState } from "react";
import '../App.css';
import {Link,Navigate, useNavigate} from 'react-router-dom';

function LoginPage({showpassword,setShowpassword}){

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState(''); 
  const [isloading,setIsloading] = useState(false);
  const [errormessage,setErrormessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setIsloading(true)
   try{
    const data = await fetch("http://localhost:5000/users");
    const allUsers = await data.json();
    console.log("Returned: ",allUsers);

    const email_existence = allUsers.find((c)=>{
        return c.email === email
    })

    if(email_existence)
    {
              if(email_existence.password === password)
              {
               navigate("/dashboard"); 
              }else
                {setErrormessage("Invalid Credentials");
                 return;
                }   
    }
    else{
      setErrormessage("you don't have account");
      return;
    }

}catch(e){
console.log("Login Failed");
}finally{
    setIsloading(false);
}

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
                  setErrormessage("")
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
                  setErrormessage("")
                }}
                autoComplete="current-password"
                required
              />
              <span>
                <i className="fa-regular fa-eye" onClick={()=>setShowpassword((cv)=>!cv)} ></i>
              </span>
              
              </div>
              { errormessage &&
              <div className="errormsg">
                <i className="fa-solid fa-exclamation block"></i>
                <p>{errormessage}</p>
              </div>
              }
              <Link to="/forgot-password" className="form-link-small">Forgot password?</Link>
            </div>
 
            <button type="submit" className="btn-primary btn-full" disabled={isloading}>
              {isloading ? "Logging in..." : "sign in"}
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