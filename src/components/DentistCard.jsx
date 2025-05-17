// src/components/DentistCard.js
import React from "react";

const DentistCard = ({ dentist }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <img
        src={dentist.profilePicture}
        alt={dentist.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-xl font-bold mt-4">{dentist.name}</h2>
      <p className="text-gray-600">{dentist.designation}</p>
      <p className="text-gray-600">{dentist.qualifications}</p>
      <p className="text-gray-600">{dentist.yearsOfExperience} years of experience</p>
    </div>
  );
};

export default DentistCard;