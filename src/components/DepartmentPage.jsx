import React, { useState } from 'react';
import './AdminPage.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

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
  const [newDoctor, setNewDoctor] = useState({});
  const navigate = useNavigate();

  const addDepartment = () => {
    if (newDepartment.trim() === '') return;
    if (departments[newDepartment]) return alert("Department already exists");
    setDepartments({ ...departments, [newDepartment]: [] });
    setNewDepartment('');
  };

  const editDepartmentName = (oldName, newName) => {
    if (newName.trim() === '' || oldName === newName) {
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
    if (!doctorName || doctorName.trim() === '') return;

    const updatedDoctors = [...departments[dept], doctorName.trim()];
    setDepartments({ ...departments, [dept]: updatedDoctors });
    setNewDoctor({ ...newDoctor, [dept]: '' });
  };

  const deleteDoctor = (dept, doctor) => {
    const updatedDoctors = departments[dept].filter((d) => d !== doctor);
    setDepartments({ ...departments, [dept]: updatedDoctors });
  };

  return (
    <div className="app admin-page">
      <header className="admin-header-wrapper">
        <div className="admin-header-row">
          <h1 className="admin-header">Department Management</h1>
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
                      <IconButton
                        aria-label="save"
                        onClick={() => editDepartmentName(dept, editDeptName)}
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="cancel"
                        onClick={() => setEditingDepartment(null)}
                        color="error"
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
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteDepartment(dept)}
                        color="error"
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
                      <IconButton
                        aria-label="delete doctor"
                        onClick={() => deleteDoctor(dept, doctor)}
                        color="error"
                        size="small"
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
  );
};

export default DepartmentPage;
