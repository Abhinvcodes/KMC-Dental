// src/pages/DentistConsultationPage.js
import React from "react";
import DentistCard from "./DentistCard";

const dentists = [
  {
    id: 1,
    //profilePicture: "",
    name: "Dr. John Doe",
    designation: "Senior Dentist",
    qualifications: "BDS, MDS",
    yearsOfExperience: 10,
  },
  {
    id: 2,
    // profilePicture: "",
    name: "Dr. Jane Smith",
    designation: "Orthodontist",
    qualifications: "BDS, MDS, PhD",
    yearsOfExperience: 15,
  },
  // Add more dentists here - add at least one more to test 3 columns
  {
    id: 3,
    // profilePicture: "",
    name: "Dr. Michael Johnson",
    designation: "Periodontist",
    qualifications: "BDS, MDS",
    yearsOfExperience: 12,
  },
  {
    id: 4,
    // profilePicture: "",
    name: "Dr. Sarah Williams",
    designation: "Endodontist",
    qualifications: "BDS, MDS, Cert. Endo",
    yearsOfExperience: 8,
  },
  {
    id: 5,
    name: "Dr. Robert Brown",
    designation: "Oral Surgeon",
    qualifications: "BDS, MDS, FDSRCS",
    yearsOfExperience: 18,
  },
];

const DentistConsultationPage = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Meet Our Dentists</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {dentists.map((dentist) => (
          <div key={dentist.id} style={{ width: 'calc(33.333% - 14px)', minWidth: '250px' }}>
            <DentistCard dentist={dentist} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DentistConsultationPage;