import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

function SignUp() {
  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit = async(e)=>{
      e.preventDefault();
      setError("");

      if(password.length<6){
          setError("Password must be at least 6 characters.");
          return;
      }

      if(password!==confirmPassword){
          setError("Passwords do not match.");
          return;
      }

      try{
          setLoading(true);
          await registerUser(email,password);

          alert("Account created successfully!");

          navigate("/dashboard");
      }catch(err){
          setError(err.message);
      }finally{
          setLoading(false);
      }
  }

  return(
      <div className="auth-container">
          <div className="auth-card">

              <h1>Create Account</h1>
              <p>Sign up to start managing your study tasks.</p>

              {error && <div className="error">{error}</div>}

              <form className="auth-form" onSubmit={handleSubmit}>

                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />

                  <label>Password</label>

                  <div className="password-box">
                      <input
                        type={showPassword ? "text":"password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                      />

                      <button
                        type="button"
                        className="show-btn"
                        onClick={()=>setShowPassword(!showPassword)}
                      >
                          {showPassword ? "🙈":"👁️"}
                      </button>
                  </div>

                  <label>Confirm Password</label>

                  <input
                    type={showPassword ? "text":"password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    required
                  />

                  <button className="auth-button">
                      {loading ? "Creating Account..." : "Create Account"}
                  </button>

              </form>

              <div className="auth-footer">
                  Already have an account?{" "}
                  <Link to="/login">Login</Link>
              </div>

          </div>
      </div>
  )
}

export default SignUp;