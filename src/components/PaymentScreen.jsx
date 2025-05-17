// src/components/PaymentScreen.js
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import DentalForm from './DentalForm';

const PaymentScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure location.state exists to avoid errors
  const dentist = location.state?.dentist || { name: "Unknown Dentist" };

  const handleProceedAfterPayment = () => {
    navigate("/DentalForm", { state: { dentist } });
    // Redirect to DentalForm
  };

  const handleCompletePayment = async () => {
    try {
      // Example payment details
      const paymentDetails = {
        method: 'bank_transfer',
        date: new Date().toISOString(),
        amount: 50.00 // Example amount
      };

      // Create appointment first
      const appointmentData = {
        dentistId: dentist.id,
        appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Example: 1 week from now
        reason: 'Online consultation'
      };

      const appointment = await appointmentAPI.createAppointment(appointmentData);

      // Then process payment for that appointment
      await appointmentAPI.processPayment(appointment.id, paymentDetails);

      // Now redirect to dental form
      navigate("/DentalForm", { state: { dentist } });
    } catch (error) {
      console.error('Payment error:', error);
      alert('There was an error processing your payment. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Payment Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full md:mr-8">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <p className="text-gray-600 mb-4">
          Please transfer the consultation fee to the following bank account:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-gray-800">Bank Name: XYZ Bank</p>
          <p className="text-gray-800">Account Number: 1234567890</p>
          <p className="text-gray-800">IFSC Code: XYZB0001234</p>
        </div>
        <p className="text-gray-700 mb-4">
          Payment for: <span className="font-semibold">{dentist.name}</span>
        </p>
        <button
          onClick={handleProceedAfterPayment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
        >
          Proceed after Payment
        </button>
      </div>

      {/* Image Section */}
      <div className="hidden md:block max-w-md w-full mt-8 md:mt-0">
        <img
          // src="https://via.placeholder.com/500" // Replace with your image URL
          alt="Payment Illustration"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default PaymentScreen;