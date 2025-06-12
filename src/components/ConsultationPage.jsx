import React, { useState } from 'react';
import './AdminPage.css';

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

  const deleteConsultation = (id) => {
    if (window.confirm('Are you sure you want to delete this consultation?')) {
      setConsultations(consultations.filter(c => c.id !== id));
    }
  };

  const editConsultation = (consultation) => {
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
      <h1 className="admin-header">Consultation Management</h1>
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
                  <button onClick={() => editConsultation(c)}>✎</button>
                  <button onClick={() => deleteConsultation(c.id)}>🗑</button>
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
