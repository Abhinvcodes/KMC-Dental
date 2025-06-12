import React, { useState } from 'react';
import './AdminPage.css';

const initialDepartments = {
  Cardiology: ['Dr. Smith', 'Dr. Johnson'],
  Pediatrics: ['Dr. Adams', 'Dr. Miller'],
  Orthopedics: ['Dr. Brown', 'Dr. Wilson'],
};

const DepartmentPage = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editDeptName, setEditDeptName] = useState('');
  const [newDoctor, setNewDoctor] = useState({}); // { Cardiology: '', ... }

  const addDepartment = () => {
    if (!newDepartment.trim()) return;
    if (departments[newDepartment]) return;
    if (window.confirm(`Are you sure you want to add department "${newDepartment}"?`)) {
      setDepartments({ ...departments, [newDepartment]: [] });
      setNewDepartment('');
    }
  };

  const deleteDepartment = (dept) => {
    if (window.confirm(`Are you sure you want to delete department "${dept}"?`)) {
      const updated = { ...departments };
      delete updated[dept];
      setDepartments(updated);
    }
  };

  const editDepartmentName = (oldName, newName) => {
    if (!newName.trim() || departments[newName]) return;
    if (window.confirm(`Are you sure you want to rename "${oldName}" to "${newName}"?`)) {
      const updated = { ...departments };
      updated[newName] = updated[oldName];
      delete updated[oldName];
      setDepartments(updated);
      setEditingDepartment(null);
      setEditDeptName('');
    }
  };

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

  return (
    <div className="app admin-page">
      <h1 className="admin-header">Department Management</h1>
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
    </div>
  );
};

export default DepartmentPage;
