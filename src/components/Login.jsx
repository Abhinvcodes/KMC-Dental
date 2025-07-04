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
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  // Updated to handle users with multiple roles
  const redirectToDashboard = (user) => {
    // If user is both admin and dentist, show role selection dialog
    if (user.isAdmin && user.isDentist) {
      setShowRoleSelection(true);
    }
    // If user is admin only
    else if (user.isAdmin) {
      navigate("/admin-dashboard");
    }
    // If user is dentist only
    else if (user.isDentist) {
      navigate("/doctor-dashboard");
    }
    // Regular user
    else {
      navigate("/dashboard");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const user = await login(email, password);
      redirectToDashboard(user);
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
      // Always register as a regular user (not dentist, not admin)
      const newUser = await register({
        name,
        email,
        password,
        phoneNumber,
        gender,
        isDentist: false, // Regular patient only
        isAdmin: false    // Not an admin
      });

      // Always navigate to patient dashboard after registration
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {showRoleSelection && (
        <div className="role-selection-modal">
          <div className="role-selection-content">
            <h2>Select Dashboard</h2>
            <p>You have access to multiple dashboards. Please select one:</p>
            <button onClick={() => navigate("/admin-dashboard")}>
              Admin Dashboard
            </button>
            <button onClick={() => navigate("/doctor-dashboard")}>
              Doctor Dashboard
            </button>
            <button onClick={() => setShowRoleSelection(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
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
