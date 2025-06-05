import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const redirectToDashboard = (userRole) => {
  if (userRole === "Doctor") {
    navigate("/doctor-dashboard");
  } else {
    navigate("/dashboard"); 
  }
};

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const user = await login(email, password);
      redirectToDashboard(user.role);
    } catch (error) {
      setMessage(error.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setMessage("Password reset functionality will be implemented in future updates.");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const newUser = await register({
        name,
        email,
        password,
        phoneNumber,
        gender,
        role,
        specialization: role === "Doctor" ? specialization : null,
      });
      redirectToDashboard(newUser.role);
    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {!isSignup ? (
        !isForgotPassword ? (
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            {message && <p className="error-message">{message}</p>}
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <p className="forgot-password-link" onClick={() => setIsForgotPassword(true)}>
              Forgot Password?
            </p>
            <p className="signup-link" onClick={() => { setIsSignup(true); setMessage(""); }}>
              Don't have an account? Sign Up
            </p>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <h2>Forgot Password</h2>
            {message && <p className="error-message">{message}</p>}
            <p>Enter your registered email to receive your password.</p>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button type="submit">Send Password</button>
            <p className="back-to-login-link" onClick={() => { setIsForgotPassword(false); setMessage(""); }}>
              Back to Login
            </p>
          </form>
        )
      ) : (
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          {message && <p className="error-message">{message}</p>}
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Phone Number:
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Doctor">Doctor</option>
            </select>
          </label>
          {role === "Doctor" && (
            <label>
              Specialization:
              <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
            </label>
          )}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="back-to-login-link" onClick={() => { setIsSignup(false); setMessage(""); }}>
            Back to Login
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
