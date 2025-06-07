import React, { useState } from 'react';
import './AdminPage.css';

const initialConsultations = [
  {
    id: 1,
    patientName: 'John Doe',
    department: 'Cardiology',
    doctor: 'Dr. Smith',
    date: '2025-06-10',
  },
];

const initialDepartments = {
  Cardiology: ['Dr. Smith', 'Dr. Johnson'],
  Pediatrics: ['Dr. Adams', 'Dr. Miller'],
  Orthopedics: ['Dr. Brown', 'Dr. Wilson'],
};

const AdminPage = () => {
  const [consultations, setConsultations] = useState(initialConsultations);
  const [departments, setDepartments] = useState(initialDepartments);
  const [newAppointment, setNewAppointment] = useState({
    id: null,
    patientName: '',
    department: '',
    doctor: '',
    date: '',
  });
  const [editingConsultation, setEditingConsultation] = useState(null);

  // For department add/edit
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editDeptName, setEditDeptName] = useState('');

  // For doctor add/edit, use an object keyed by department
  const [newDoctor, setNewDoctor] = useState({}); // { Cardiology: '', ... }

  // --- Consultations CRUD ---
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
    setNewAppointment({ id: null, patientName: '', department: '', doctor: '', date: '' });
    setEditingConsultation(null);
  };

  // --- Departments CRUD ---
  const addDepartment = () => {
    if (!newDepartment.trim()) return;
    if (departments[newDepartment]) return;
    if (window.confirm(`Are you sure you want to add department "${newDepartment}"?`)) {
      setDepartments({ ...departments, [newDepartment]: [] });
      setNewDepartment('');
    }
  };

  const deleteDepartment = (dept) => {
    if (window.confirm(`Are you sure you want to delete department "${dept}"? All its consultations will be removed.`)) {
      const updated = { ...departments };
      delete updated[dept];
      setDepartments(updated);
      setConsultations(consultations.filter(c => c.department !== dept));
    }
  };

  const editDepartmentName = (oldName, newName) => {
    if (!newName.trim() || departments[newName]) return;
    if (window.confirm(`Are you sure you want to rename "${oldName}" to "${newName}"?`)) {
      const updated = { ...departments };
      updated[newName] = updated[oldName];
      delete updated[oldName];
      setDepartments(updated);
      setConsultations(consultations.map(c =>
        c.department === oldName ? { ...c, department: newName } : c
      ));
      setEditingDepartment(null);
      setEditDeptName('');
    }
  };

  // --- Doctors CRUD ---
  const addDoctor = (dept) => {
    const doctorName = (newDoctor[dept] || '').trim();
    if (!doctorName) return;
    if (departments[dept].includes(doctorName)) return;
    if (window.confirm(`Are you sure you want to add doctor "${doctorName}" to "${dept}"?`)) {
      setDepartments({
        ...departments,
        [dept]: [...departments[dept], doctorName]
      });
      setNewDoctor({ ...newDoctor, [dept]: '' });
    }
  };

  const deleteDoctor = (dept, doctor) => {
    if (window.confirm(`Are you sure you want to delete doctor "${doctor}" from "${dept}"?`)) {
      setDepartments({
        ...departments,
        [dept]: departments[dept].filter(d => d !== doctor)
      });
    }
  };

  // --- Rendering ---
  return (
    <div className="app admin-page">
      <h1 className="admin-header">Admin Dashboard</h1>

      {/* Department Management */}
      <section className="department-management">
        <h2>Departments</h2>
        <div className="add-department">
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="New department name"
          />
          <button onClick={addDepartment}>Add Department</button>
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
                      <button onClick={() => editDepartmentName(dept, editDeptName)}>✓</button>
                      <button onClick={() => setEditingDepartment(null)}>✕</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => {
                        setEditingDepartment(dept);
                        setEditDeptName(dept);
                      }}>✎</button>
                      <button onClick={() => deleteDepartment(dept)}>🗑</button>
                    </>
                  )}
                </div>
              </div>
              <div className="doctor-management">
                <input
                  type="text"
                  value={newDoctor[dept] || ''}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, [dept]: e.target.value })
                  }
                  placeholder="New doctor name"
                />
                <button
                  className="add-doctor-btn"
                  onClick={() => addDoctor(dept)}
                  type="button"
                >
                  Add Doctor
                </button>
                <ul className="doctor-list">
                  {doctors.map((doctor) => (
                    <li key={doctor} className="doctor-item">
                      <span className="doctor-badge">MD</span>
                      {doctor}
                      <button
                        className="delete-doctor-btn"
                        onClick={() => deleteDoctor(dept, doctor)}
                        type="button"
                      >
                        🗑
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultations */}
      <section className="consultation-table">
  <h2>Consultations</h2>
  <table>
    <thead>
      <tr>
        <th>Patient</th>
        <th>Department</th>
        <th>Doctor</th>
        <th>Date</th>
        <th>Time</th> {/* Added Time column */}
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
          <td>{c.time || '--'}</td> {/* Display time, or -- if missing */}
          <td>
            <button onClick={() => editConsultation(c)}>✎</button>
            <button onClick={() => deleteConsultation(c.id)}>🗑</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</section>


      {/* Appointment Form */}
      <section className="appointment-form">
  <h2>{editingConsultation ? 'Edit' : 'Create'} Appointment</h2>
  <form onSubmit={handleAddAppointment}>
    <input
      type="text"
      placeholder="Patient Name"
      value={newAppointment.patientName}
      onChange={(e) =>
        setNewAppointment({ ...newAppointment, patientName: e.target.value })
      }
      required
    />
    <select
      value={newAppointment.department}
      onChange={(e) =>
        setNewAppointment({
          ...newAppointment,
          department: e.target.value,
          doctor: '',
        })
      }
      required
    >
      <option value="">Select Department</option>
      {Object.keys(departments).map((dept) => (
        <option key={dept} value={dept}>{dept}</option>
      ))}
    </select>
    <select
      value={newAppointment.doctor}
      onChange={(e) =>
        setNewAppointment({ ...newAppointment, doctor: e.target.value })
      }
      required
    >
      <option value="">Select Doctor</option>
      {departments[newAppointment.department]?.map((doc) => (
        <option key={doc} value={doc}>{doc}</option>
      ))}
    </select>
    <input
      type="date"
      value={newAppointment.date}
      onChange={(e) =>
        setNewAppointment({ ...newAppointment, date: e.target.value })
      }
      required
    />
    {/* Add this input for time selection */}
    <input
      type="time"
      value={newAppointment.time || ''}
      onChange={(e) =>
        setNewAppointment({ ...newAppointment, time: e.target.value })
      }
      required
    />
    <button type="submit">
      {editingConsultation ? 'Update' : 'Create'} Appointment
    </button>
    {editingConsultation && (
      <button
        type="button"
        onClick={() => {
          setEditingConsultation(null);
          setNewAppointment({ id: null, patientName: '', department: '', doctor: '', date: '', time: '' });
        }}
      >
        Cancel Edit
      </button>
    )}
  </form>
</section>

    </div>
  );
};

export default AdminPage;
