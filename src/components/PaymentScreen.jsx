import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './PaymentScreen.css'; 

const PaymentScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dentist = location.state?.dentist || { name: "Unknown Dentist" };

  const handleProceedAfterPayment = () => {
    navigate("/AppointmentDetails", { state: { dentist } });
  };

 return (
  <div className="payment-screen-container">
    <div className="payment-details">
      <h2>Payment Details</h2>
      <p>Please transfer the consultation fee to the following bank account:</p>
      <div className="bank-info">
        <p>Bank Name: XYZ Bank</p>
        <p>Account Number: 1234567890</p>
        <p>IFSC Code: XYZB0001234</p>
      </div>
      <p className="payment-for">
        Payment for: <span className="font-semibold">{dentist.name}</span>
      </p>
      <button
        onClick={handleProceedAfterPayment}
        className="proceed-btn"
      >
        Proceed after Payment
      </button>
    </div>

    <div className="payment-image-container">
      <img
        src="https://via.placeholder.com/400x300?text=Payment+Illustration" 
        alt="Payment Illustration"
      />
    </div>
  </div>
);
};

export default PaymentScreen;
