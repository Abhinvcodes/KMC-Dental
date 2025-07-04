import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import "./AdminPage.css";

const initialConsultations = [
  {
    id: 1,
    patientName: "John Doe",
    department: "Cardiology",
    doctor: "Dr. Smith",
    date: "2025-06-10",
    time: "10:00",
  },
];

const initialDepartments = {
  Cardiology: ["Dr. Smith", "Dr. Johnson"],
  Pediatrics: ["Dr. Adams", "Dr. Miller"],
  Orthopedics: ["Dr. Brown", "Dr. Wilson"],
};

const ConsultationPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [consultations, setConsultations] = useState(initialConsultations);
  const [departments] = useState(initialDepartments);
  const [newAppointment, setNewAppointment] = useState({
    id: null,
    patientName: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
  });
  const [editingConsultation, setEditingConsultation] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const deleteConsultation = (id) => {
    if (window.confirm("Are you sure you want to delete this consultation?")) {
      setConsultations(consultations.filter((c) => c.id !== id));
    }
  };

  const editConsultation = (id) => {
    const consultation = consultations.find((c) => c.id === id);
    setEditingConsultation(consultation);
    setNewAppointment(consultation);
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const isEdit = !!editingConsultation;
    const msg = isEdit
      ? "Are you sure you want to update this appointment?"
      : "Are you sure you want to create this appointment?";
    if (!window.confirm(msg)) return;

    if (isEdit) {
      setConsultations(
        consultations.map((c) =>
          c.id === editingConsultation.id ? newAppointment : c
        )
      );
    } else {
      const newId = Date.now();
      setConsultations([...consultations, { ...newAppointment, id: newId }]);
    }
    setNewAppointment({
      id: null,
      patientName: "",
      department: "",
      doctor: "",
      date: "",
      time: "",
    });
    setEditingConsultation(null);
  };

  const toggleMenu = () => {
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
    navigate("/login");
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
          <button className="menu-toggle" onClick={toggleMenu}>
            <FaBars />
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
          <section className="consultation-table">
            <h2 className="section-title slide-in">Consultation Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((c) => (
                  <tr key={c.id}>
                    <td>{c.patientName}</td>
                    <td>{c.department}</td>
                    <td>{c.doctor}</td>
                    <td>{c.date}</td>
                    <td>{c.time || "--"}</td>
                    <td>
                      <IconButton
  aria-label="edit consultation"
  onClick={() => editConsultation(c.id)}
  size="small"
  sx={{
    '&:hover svg': { color: '#005f61' }
  }}
>
  <EditIcon fontSize="small" sx={{ color: '#fff' }} />
</IconButton>
<IconButton
  aria-label="delete consultation"
  onClick={() => deleteConsultation(c.id)}
  size="small"
  sx={{
    '&:hover svg': { color: '#a31515' }
  }}
>
  <DeleteIcon fontSize="small" sx={{ color: '#c62828' }} />
</IconButton>



                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;