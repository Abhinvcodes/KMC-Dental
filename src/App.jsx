import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Front from './components/Front';
import Cavity from './components/Cavity';
import Toothache from './components/Toothache';
import ToothSensitivity from './components/ToothSensitivity';
import Gum from './components/Gum';
import Abscess from './components/Abscess';
import Fractures from './components/Fractures';
import Erosion from './components/Erosion';
import Grinding from './components/Grinding';
import ImpactedWisdom from './components/ImpactedWisdom';
import Malocclusion from './components/Malocclusion';
import BrokenTeeth from './components/BrokenTeeth';
import Ulcers from './components/Ulcers';
import Stained from './components/Stained';
import Xerostomia from './components/Xerostomia';
import Infection from './components/Infection';
import LooseTeeth from './components/LooseTeeth';
import DentalTrauma from './components/DentalTrauma';
import RootCanal from './components/RootCanal';
import TMJDisorders from './components/TMJDisorders';
import Hypoplasia from './components/Hypoplasia';
import DentalForm from './components/DentalForm';
import Login from './components/Login';
import DentistConsultationPage from './components/DentistConsultationPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './components/UserDashboard';
import DoctorDashboard from "./components/DoctorDashboard";
import ChatWindow from "./components/ChatWindow";
import PaymentScreen from "./components/PaymentScreen";
import AppointmentDetails from './components/AppointmentDetails';
import AdminPage from './components/AdminPage';


const App = () => {
  return (
    <Router>
      <div>
        <h1 className="dental-care-heading">KMC Dental Care</h1>
        <Routes>
          <Route path="/" element={<Front />} />
          <Route path="/Cavity" element={<Cavity />} />
          <Route path="/Toothache" element={<Toothache />} />
          <Route path="/ToothSensitivity" element={<ToothSensitivity />} />
          <Route path="/Gum" element={<Gum />} />
          <Route path="/Abscess" element={<Abscess />} />
          <Route path="/Fractures" element={<Fractures />} />
          <Route path="/Erosion" element={<Erosion />} />
          <Route path="/Grinding" element={<Grinding />} />
          <Route path="/ImpactedWisdom" element={<ImpactedWisdom />} />
          <Route path="/Malocclusion" element={<Malocclusion />} />
          <Route path="/BrokenTeeth" element={<BrokenTeeth />} />
          <Route path="/Ulcers" element={<Ulcers />} />
          <Route path="/Stained" element={<Stained />} />
          <Route path="/Xerostomia" element={<Xerostomia />} />
          <Route path="/Infection" element={<Infection />} />
          <Route path="/LooseTeeth" element={<LooseTeeth />} />
          <Route path="/DentalTrauma" element={<DentalTrauma />} />
          <Route path="/RootCanal" element={<RootCanal />} />
          <Route path="/TMJDisorders" element={<TMJDisorders />} />
          <Route path="/Hypoplasia" element={<Hypoplasia />} />
          <Route path="/Login" element={<Login />} />
           <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/chat/:patientId" element={<ChatWindow />} />
          <Route path="/PaymentScreen" element={<PaymentScreen />} />
          <Route path="/AppointmentDetails" element={<AppointmentDetails />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/DentalForm" element={
            <DentalForm />
          } />
          <Route path="/DentistConsultationPage" element={
            <DentistConsultationPage />
          } />
          <Route path="/dashboard" element={
             <UserDashboard />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
