import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { consultationAPI } from '../services/api';
import './DentalForm.css';

const DentalForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    comments: '',
  });
  const [images, setImages] = useState([]);
  const [disclaimer, setDisclaimer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!disclaimer) {
      setError('Please accept the disclaimer to continue.');
      return;
    }

    if (!images[0] || !images[1] || !images[2]) {
      setError('Please upload all three required images.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to submit a consultation');
        navigate('/Login');
        return;
      }

      const submitData = new FormData();

      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      images.forEach(image => {
        submitData.append('images', image);
      });

      await consultationAPI.createConsultation(submitData);

      alert('Your consultation request has been submitted successfully!');
      navigate('/'); // Redirect to Front.jsx page
    } catch (error) {
      setError(error.message || 'Failed to submit consultation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dental-form-container">
      <div className="dental-form-header">
        <span className="form-title" style={{ textAlign: 'center'}}>Dental Consultation Form</span>
      </div>

      <p className="subheading">
        Simply complete the below form and attach a minimum of 3 clear photos as specified. Our Dentists will be in touch with feedback, advice, and options for you.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comments">Supporting Comments / Questions (optional)</label>
          <textarea id="comments" name="comments" rows="4" value={formData.comments} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>Image 1: Front View Smile / Close Up</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 0)} required />
        </div>

        <div className="form-group">
          <label>Image 2: Side View / Natural Smile</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 1)} required />
        </div>

        <div className="form-group">
          <label>Image 3: Close up Area of Concern</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 2)} required />
        </div>

        <div className="form-group checkbox-group">
          <input type="checkbox" id="disclaimer" name="disclaimer" checked={disclaimer} onChange={() => setDisclaimer(!disclaimer)} required />
          <label htmlFor="disclaimer">
            By submitting the above information, I understand that any advice or feedback received from Dentist is subject to a further clinic-based consultation.
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'SEND'}
        </button>
      </form>
    </div>
  );
};

export default DentalForm;
