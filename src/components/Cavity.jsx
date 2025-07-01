import React from 'react';
import './Cavity.css';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

const Cavity = () => {
  return (
    <div className="container">
      <header>
        <div className="header-content">
          <a href="/" className="home-link" aria-label="Home">
            <IconButton color="primary" aria-label="home" size="large">
              <HomeIcon style={{ color: 'white', fontSize: 32 }} />
            </IconButton>
          </a>
          <h1>Cavities</h1>
        </div>
      </header>
      <section className="content">
        {/* <img src="src/components/cavityteeth.jpg" alt="Cavities" className="cavity-image" /> */}
        <p>
          A cavity, also known as dental caries or tooth decay, is a permanent damage to the hard surface of the tooth that develops into tiny holes or openings. It is caused by the interaction of sugars and starches from food with bacteria in the mouth. When these bacteria digest the sugars, they produce acids that erode the protective enamel on the tooth. Over time, repeated acid attacks can lead to the breakdown of enamel, eventually forming cavities.
        </p>
        <h1>Common Causes:</h1>
        <p>
          Poor oral hygiene is one of the leading causes of cavities. Failing to brush and floss regularly allows plaque—a sticky film of bacteria—to build up on teeth. Consuming sugary or starchy foods and beverages, such as candy, soft drinks, or processed snacks, further fuels the bacteria responsible for acid production. Dry mouth, where there is reduced saliva production, also increases cavity risk because saliva helps wash away food particles and neutralize acid.
        </p>
        <h1>Age Groups More Affected:</h1>
        <p>
          Cavities can affect people of all ages, but children and teenagers are particularly vulnerable due to their diet, developing teeth, and sometimes insufficient brushing habits. Older adults are also at a higher risk because of gum recession and medication-related dry mouth. Additionally, toddlers and young children are prone to "baby bottle tooth decay" if they consume sugary drinks or milk in a bottle for prolonged periods.
          <br /><br />
          By practicing good oral hygiene, limiting sugary foods and drinks, and visiting a dentist regularly, cavities can be prevented or managed in their early stages.
        </p>
      </section>
    </div>
  );
};

export default Cavity;
