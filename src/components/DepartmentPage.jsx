import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import "./DepartmentPage.css";

const initialDepartments = {
  Cardiology: ["Dr. Smith", "Dr. Johnson"],
  Pediatrics: ["Dr. Adams", "Dr. Miller"],
  Orthopedics: ["Dr. Brown", "Dr. Wilson"],
};

const DepartmentPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [departments, setDepartments] = useState(initialDepartments);
  const [newDepartment, setNewDepartment] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editDeptName, setEditDeptName] = useState("");
  const [newDoctor, setNewDoctor] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addDepartment = () => {
    if (newDepartment.trim() === "") return;
    if (departments[newDepartment]) return alert("Department already exists");
    setDepartments({ ...departments, [newDepartment]: [] });
    setNewDepartment("");
  };

  const editDepartmentName = (oldName, newName) => {
    if (newName.trim() === "" || oldName === newName) {
      setEditingDepartment(null);
      return;
    }
    const updatedDepartments = { ...departments };
    updatedDepartments[newName] = updatedDepartments[oldName];
    delete updatedDepartments[oldName];
    setDepartments(updatedDepartments);
    setEditingDepartment(null);
  };

  const deleteDepartment = (dept) => {
    const updatedDepartments = { ...departments };
    delete updatedDepartments[dept];
    setDepartments(updatedDepartments);
  };

  const addDoctor = (dept) => {
    const doctorName = newDoctor[dept];
    if (!doctorName || doctorName.trim() === "") return;

    const updatedDoctors = [...departments[dept], doctorName.trim()];
    setDepartments({ ...departments, [dept]: updatedDoctors });
    setNewDoctor({ ...newDoctor, [dept]: "" });
  };

  const deleteDoctor = (dept, doctor) => {
    const updatedDoctors = departments[dept].filter((d) => d !== doctor);
    setDepartments({ ...departments, [dept]: updatedDoctors });
  };

  const toggleHamburger = () => {
    setIsMenuOpen(!isMenuOpen);
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
    navigate("/"); // Updated to match other components
    setIsMenuOpen(false);
  };

  return (
    <div className="admin-page-root">
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
      <div className="admin-bg">
        <div className="admin-overlay" />
        <div className="admin-content-container fade-in">
          <section className="department-management">
            <h2 className="section-title slide-in">Department Management</h2>
            <div className="add-department">
              <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                placeholder="New department name"
              />
              <Button
                className="cta-button"
                onClick={addDepartment}
                variant="contained"
                sx={{
                  backgroundColor: "#007dab !important",
                  "&:hover": { backgroundColor: "#007399 !important" },
                }}
              >
                Add Department
              </Button>
            </div>
            <div className="department-grid">
              {Object.entries(departments).map(([dept, doctors]) => (
                <div key={dept} className="department-card">
                  <div className="department-header">
                    {editingDepartment === dept ? (
                      <input
                        value={editDeptName}
                        onChange={(e) => setEditDeptName(e.target.value)}
                      />
                    ) : (
                      <h3>{dept}</h3>
                    )}
                    <div className="department-actions">
                      {editingDepartment === dept ? (
                        <>
                          <IconButton
                            aria-label="save"
                            onClick={() => editDepartmentName(dept, editDeptName)}
                            sx={{
                              color: "#007dab",
                              "&:hover": { color: "#007399" },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            aria-label="cancel"
                            onClick={() => setEditingDepartment(null)}
                            sx={{
                              color: "#c62828",
                              "&:hover": { color: "#b71c1c" },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            aria-label="edit"
                            onClick={() => {
                              setEditingDepartment(dept);
                              setEditDeptName(dept);
                            }}
                            sx={{
                              color: "#007dab",
                              "&:hover": { color: "#007399" },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                        aria-label="delete consultation"
                        onClick={() => deleteConsultation(c.id)}
                        size="small"
                        sx={{
                          color: "#DC143C",
                          backgroundColor: "#DC143C !important",
                          "&:hover": { color: "#b71c1c", backgroundColor: "#B22222 !important" },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="doctor-management">
                    <input
                      type="text"
                      value={newDoctor[dept] || ""}
                      onChange={(e) =>
                        setNewDoctor({ ...newDoctor, [dept]: e.target.value })
                      }
                      placeholder="New doctor name"
                    />
                    <Button
                      className="add-doctor-btn cta-button"
                      onClick={() => addDoctor(dept)}
                      variant="contained"
                      sx={{
                        backgroundColor: "#007dab !important",
                        "&:hover": { backgroundColor: "#007399 !important" },
                      }}
                    >
                      Add Doctor
                    </Button>
                    <ul className="doctor-list">
                      {doctors.map((doctor) => (
                        <li key={doctor} className="doctor-item">
                          <span className="doctor-badge">MD</span>
                          {doctor}
                           <IconButton
                            aria-label="delete consultation"
                            onClick={() => deleteConsultation(c.id)}
                            size="small"
                            sx={{
                              color: "#DC143C",
                              backgroundColor: "#DC143C !important",
                              "&:hover": { color: "#b71c1c", backgroundColor: "#B22222 !important" },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;