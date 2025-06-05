import React from "react";
import "./AppointmentDetails.css";

const appointments = [
  {
    id: 101,
    doctorName: "Dr. Jane Smith",
    date: "2025-06-15",
    time: "2:30 PM",
    status: "pending",
    reason: "Tooth pain",
  },
  {
    id: 102,
    doctorName: "Dr. Michael Johnson",
    date: "2025-06-20",
    time: "11:00 AM",
    status: "confirmed",
    reason: "Routine checkup",
  },
  {
    id: 103,
    doctorName: "Dr. Sarah Williams",
    date: "2025-07-01",
    time: "4:00 PM",
    status: "cancelled",
    reason: "Wisdom tooth removal consultation",
  },
];

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "status-confirmed";
    case "pending":
      return "status-pending";
    case "cancelled":
      return "status-cancelled";
    default:
      return "";
  }
};

const AppointmentDetails = () => {
  return (
    <div className="appointments-list-container">
      <h2 className="appointments-list-header">My Appointments</h2>
      {appointments.map((appt) => (
        <div key={appt.id} className="appointment-details-container">
          <h3 className="appointment-id">Appointment #{appt.id}</h3>
          <div className="details-row">
            <div className="details-label">Doctor:</div>
            <div className="details-value">{appt.doctorName}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Date:</div>
            <div className="details-value">{appt.date}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Time:</div>
            <div className="details-value">{appt.time}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Reason:</div>
            <div className="details-value">{appt.reason}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Status:</div>
            <div className="details-value">
              <span className={`status ${getStatusClass(appt.status)}`}>
                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="button-container">
            {/* <button
              className="action-button"
              onClick={() => alert(`Reschedule feature for appointment #${appt.id} coming soon!`)}
            >
              Reschedule
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentDetails;
