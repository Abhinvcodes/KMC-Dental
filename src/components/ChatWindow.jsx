import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ChatWindow = () => {
  const { patientId } = useParams();
  const location = useLocation();
  const { patientName, doctorName } = location.state || {};

  return (
    <div className="chat-container">
      <h2>Chat with {patientName || "Patient"}</h2>
      <div className="chat-info">
        <p><strong>Doctor:</strong> {doctorName || "Dr. Smith"}</p>
        <p><strong>Patient ID:</strong> {patientId}</p>
      </div>
      
      <div className="chat-messages">
        <div className="message">
          <p><strong>Doctor:</strong> Hello, I'm here to help you today.</p>
        </div>
        <div className="message">
          <p><strong>Patient:</strong> Thank you, doctor!</p>
        </div>
        <div className="message">
          <p><strong>Doctor:</strong> Let me know any concerns you have.</p>
        </div>
      </div>
      
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Type your message..." 
        />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;