import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const CreateAppointment = ({
  departments = {}, // default to empty object
  consultations = [],
  setConsultations = () => {}
}) => {
  const navigate = useNavigate();
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to create this appointment?')) {
      const newId = Date.now();
      setConsultations([...consultations, { 
        ...newAppointment, 
        id: newId,
        status: 'Scheduled'
      }]);
      navigate('/consultations');
    }
  };

  return (
    <div className="app admin-page">
      <h1 className="admin-header">Create New Appointment</h1>
      <section className="appointment-form">
        <h2>Create Appointment</h2>
        <form onSubmit={handleSubmit}>
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
            {departments && Object.keys(departments).map((dept) => (
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
            {departments && departments[newAppointment.department] &&
              departments[newAppointment.department].map((doc) => (
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
          <input
            type="time"
            value={newAppointment.time}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, time: e.target.value })
            }
            required
          />
          <div className="form-actions">
            <button type="submit" className="btn primary">
              Create Appointment
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate('/consultations')}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateAppointment;
