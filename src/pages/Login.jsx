import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

function Login(){

    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    const handleLogin=async(e)=>{
        e.preventDefault();
        setError("");

        try{
            setLoading(true);
            await loginUser(email,password);

            navigate("/dashboard");
        }catch(err){
            setError("Invalid email or password.");
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="auth-container">

            <div className="auth-card">

                <h1>Welcome Back 👋</h1>

                <p>Login to continue your study planner.</p>

                {error && <div className="error">{error}</div>}

                <form className="auth-form" onSubmit={handleLogin}>

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

                    <button className="auth-button">
                        {loading ? "Logging In..." : "Login"}
                    </button>

                </form>

                <div className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/signup">Sign Up</Link>
                </div>

            </div>

        </div>
    )
}

export default Login;