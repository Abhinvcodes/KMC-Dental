import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { consultationAPI } from "../services/api";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  LinearProgress,
} from "@mui/material";
import { FaTooth, FaBars } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "./DentalForm.css";

const DentalForm = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    comments: "",
  });
  const [images, setImages] = useState([]);
  const [disclaimer, setDisclaimer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleHamburger = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!disclaimer) {
      setError("Please accept the disclaimer to continue.");
      return;
    }

    if (!images[0] || !images[1] || !images[2]) {
      setError("Please upload all three required images.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to submit a consultation");
        navigate("/Login");
        return;
      }

      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
      images.forEach((image) => {
        submitData.append("images", image);
      });

      await consultationAPI.createConsultation(submitData);

      alert("Your consultation request has been submitted successfully!");
      navigate("/");
    } catch (error) {
      setError(error.message || "Failed to submit consultation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToKeyServices = () => {
    navigate("/");
    setTimeout(() => {
      const keyServicesSection = document.getElementById("key-services");
      if (keyServicesSection) {
        keyServicesSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  const scrollToHowCanWeHelp = () => {
    navigate("/");
    setTimeout(() => {
      const helpSection = document.getElementById("how-can-we-help");
      if (helpSection) {
        helpSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <Box className="dental-form-root">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <FaTooth className="logo-icon" /> KMC Dental Care
          </div>
          <button
            className={`hamburger${isMenuOpen ? " open" : ""}`}
            onClick={toggleHamburger}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            type="button"
          >
            <FaBars
              className="hamburger-icon"
              style={{
                transition: "transform 0.3s",
                transform: isMenuOpen ? "rotate(180deg)" : "none",
              }}
            />
          </button>
          <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <li className="nav-item" onClick={scrollToHowCanWeHelp}>
              About Us
            </li>
            <li className="nav-item" onClick={scrollToKeyServices}>
              Services
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item" onClick={() => navigate("/dashboard")}>
                  My Dashboard
                </li>
                <li className="nav-item" onClick={handleLogout}>
                  Logout
                </li>
              </>
            ) : (
              <li className="nav-item" onClick={() => navigate("/Login")}>
                Login
              </li>
            )}
          </ul>
        </div>
      </header>

      {/* Main Content */}
      <Box className="dental-form-bg">
        <Box className="dental-form-overlay" />
        <Box className="dental-form-content-container">
          <Paper elevation={4} className="dental-form-card fade-in" sx={{ borderRadius: 4, p: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              letterSpacing={1}
              className="dental-form-title"
              sx={{ color: "#007FAE", mb: 3, textAlign: "center" }}
            >
              Dental Consultation Form
            </Typography>
            <Typography
              className="dental-form-description slide-in"
              sx={{ color: "#222", mb: 3, textAlign: "center", fontSize: "1.2rem" }}
            >
              Complete the form below and attach three clear photos as specified. Our dentists will provide feedback, advice, and treatment options.
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#b3e6fa" },
                        "&:hover fieldset": { borderColor: "#007FAE" },
                        "&.Mui-focused fieldset": { borderColor: "#007FAE" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#b3e6fa" },
                        "&:hover fieldset": { borderColor: "#007FAE" },
                        "&.Mui-focused fieldset": { borderColor: "#007FAE" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#b3e6fa" },
                        "&:hover fieldset": { borderColor: "#007FAE" },
                        "&.Mui-focused fieldset": { borderColor: "#007FAE" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#b3e6fa" },
                        "&:hover fieldset": { borderColor: "#007FAE" },
                        "&.Mui-focused fieldset": { borderColor: "#007FAE" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Supporting Comments / Questions (optional)"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#b3e6fa" },
                        "&:hover fieldset": { borderColor: "#007FAE" },
                        "&.Mui-focused fieldset": { borderColor: "#007FAE" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={600} sx={{ color: "#007FAE", mb: 1 }}>
                    Image 1: Front View Smile / Close Up
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 0)}
                    required
                    className="file-input"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={600} sx={{ color: "#007FAE", mb: 1 }}>
                    Image 2: Side View / Natural Smile
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 1)}
                    required
                    className="file-input"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={600} sx={{ color: "#007FAE", mb: 1 }}>
                    Image 3: Close Up Area of Concern
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 2)}
                    required
                    className="file-input"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={disclaimer}
                        onChange={() => setDisclaimer(!disclaimer)}
                        required
                        sx={{
                          color: "#007FAE",
                          "&.Mui-checked": { color: "#007FAE" },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" color="#222">
                        By submitting the above information, I understand that any advice or feedback received from Dentist is subject to a further clinic-based consultation.
                      </Typography>
                    }
                  />
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography
                      color="error"
                      align="center"
                      sx={{ fontWeight: 500, mb: 2 }}
                      className="error"
                    >
                      {error}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="cta-button"
                    sx={{
                      background: "#007dab !important", // Theme: button background
                      color: "#fff !important", // Theme: button color
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: 2,
                      "&:hover": {
                        background: "#007399 !important", // Theme: button hover
                        color: "#fff !important",
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 20px rgba(0, 127, 174, 0.2)",
                      },
                      "&:disabled": {
                        opacity: 0.7,
                        cursor: "not-allowed",
                      },
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "SEND"}
                  </Button>
                  {isSubmitting && <LinearProgress sx={{ mt: 2, borderRadius: 2 }} />}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DentalForm;