import React, { useState } from 'react';
import './AdminPage.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const initialConsultations = [
  {
    id: 1,
    patientName: 'John Doe',
    department: 'Cardiology',
    doctor: 'Dr. Smith',
    date: '2025-06-10',
    time: '10:00',
  },
];

const initialDepartments = {
  Cardiology: ['Dr. Smith', 'Dr. Johnson'],
  Pediatrics: ['Dr. Adams', 'Dr. Miller'],
  Orthopedics: ['Dr. Brown', 'Dr. Wilson'],
};

const ConsultationPage = () => {
  const [consultations, setConsultations] = useState(initialConsultations);
  const [departments] = useState(initialDepartments);
  const [newAppointment, setNewAppointment] = useState({
    id: null,
    patientName: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
  });
  const [editingConsultation, setEditingConsultation] = useState(null);
  const navigate = useNavigate();

  const deleteConsultation = (id) => {
    if (window.confirm('Are you sure you want to delete this consultation?')) {
      setConsultations(consultations.filter(c => c.id !== id));
    }
  };

  const editConsultation = (id) => {
    const consultation = consultations.find(c => c.id === id);
    setEditingConsultation(consultation);
    setNewAppointment(consultation);
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const isEdit = !!editingConsultation;
    const msg = isEdit
      ? 'Are you sure you want to update this appointment?'
      : 'Are you sure you want to create this appointment?';
    if (!window.confirm(msg)) return;

    if (isEdit) {
      setConsultations(consultations.map(c =>
        c.id === editingConsultation.id ? newAppointment : c
      ));
    } else {
      const newId = Date.now();
      setConsultations([...consultations, { ...newAppointment, id: newId }]);
    }
    setNewAppointment({ id: null, patientName: '', department: '', doctor: '', date: '', time: '' });
    setEditingConsultation(null);
  };

  return (
    <div className="app admin-page">
      {/* Header with title */}
      <header className="admin-header-wrapper">
        <div className="admin-header-row">
          <h1 className="admin-header">Consultation Management</h1>
        </div>
        <nav className="admin-nav-links">
          <Button
            color="black"
            variant="text"
            onClick={() => navigate('/doctor-dashboard')}
          >
            Dashboard
          </Button>
          <Button
            color="black"
            variant="text"
            onClick={() => navigate('/admin')}
          >
            Consultation
          </Button>
          <Button
            color="black"
            variant="text"
            onClick={() => navigate('/departments')}
          >
            Departments
          </Button>
          <Button
            color="black"
            variant="text"
            onClick={() => navigate('/createappointment')}
          >
            Create Appointment
          </Button>
        </nav>
      </header>

      {/* Consultations Table */}
      <section className="consultation-table">
        <h2>Consultations</h2>
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
                <td>{c.time || '--'}</td>
                <td>
                  <IconButton
                    aria-label="edit consultation"
                    onClick={() => editConsultation(c.id)}
                    color="primary"
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete consultation"
                    onClick={() => deleteConsultation(c.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ConsultationPage;
