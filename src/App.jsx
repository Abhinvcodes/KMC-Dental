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


const App = () => {
  return (
    <Router>
    <div>
      <h1 className="dental-care-heading">KMC Dental Care</h1>
      <Routes>

      <Route path="/" element={<Front />} /> {/* Use your component here */}
      
      <Route path="/Cavity" element={<Cavity />} />

      
      <Route path="/Toothache" element={<Toothache /> } />

      
      <Route path="/ToothSensitivity" element={<ToothSensitivity /> } />

      
      <Route path="/Gum" element={<Gum /> } />  

      
      <Route path="/Abscess" element={<Abscess /> } /> 

      
      <Route path="/Fractures" element={<Fractures />} /> 

      
      <Route path="/Erosion" element={<Erosion /> } />

      
      <Route path="/Grinding" element={<Grinding /> } /> 

      
      <Route path="/ImpactedWisdom" element={<ImpactedWisdom /> } /> 

      
      <Route path="/Malocclusion" element={<Malocclusion />} />  

      
      <Route path="/BrokenTeeth" element={<BrokenTeeth /> } />

      
      <Route path="/Ulcers" element={<Ulcers />} /> 

      
      <Route path="/Stained" element={<Stained /> } />

      
      <Route path="/Xerostomia" element={<Xerostomia />} />   

      
      <Route path="/Infection" element={<Infection />} />  

      
      <Route path="/LooseTeeth" element={<LooseTeeth /> } />

      
      <Route path="/DentalTrauma" element={<DentalTrauma />} />  

      
      <Route path="/RootCanal" element={<RootCanal /> } />

      
      <Route path="/TMJDisorders" element={<TMJDisorders /> } />

      
      <Route path="/Hypoplasia" element={<Hypoplasia />} />

      <Route path="/DentalForm" element={<DentalForm />} />

      </Routes>
    </div>
    </Router>
  );
  
};

export default App;
