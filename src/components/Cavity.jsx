import React from 'react';
import './Cavity.css';
import { Card, CardContent, Typography, Grid, IconButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const handleBookConsultationClick = () => {
  window.location.href = '/book-appointment';
};

const Cavity = () => (
  <div className="cavity-root">
    {/* Header Section */}
    <header className="cavity-header-section">
      <h1 className="dental-care-heading">KMC Dental Care</h1>
      <a href="/" aria-label="Home" className="cavity-home-btn">
        <IconButton color="primary" aria-label="home" size="large">
          <HomeIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </a>
    </header>

    {/* Main Content */}
    <Grid container justifyContent="center" alignItems="center" className="cavity-main-grid">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card className="cavity-card" elevation={8}>
          <CardContent>
            <Typography variant="h3" component="h1" className="cavity-title">
              Understanding Cavities
            </Typography>
            <Divider sx={{ my: 3, backgroundColor: '#009e60' }} />
            <Typography variant="body1" className="cavity-text" gutterBottom>
              A cavity, also known as dental caries or tooth decay, is permanent damage to the tooth's hard surface, resulting in tiny holes or openings. It occurs when bacteria in the mouth interact with sugars and starches from food, producing acids that erode the protective enamel. Over time, these acid attacks can break down enamel, forming cavities.
            </Typography>
            <Typography variant="h5" className="cavity-section-title" gutterBottom>
              Common Causes
            </Typography>
            <Typography variant="body1" className="cavity-text" gutterBottom>
              Poor oral hygiene is a primary cause of cavities. Inadequate brushing and flossing allow plaque—a sticky bacterial film—to accumulate on teeth. Sugary or starchy foods and drinks, like candy, soda, or processed snacks, fuel acid-producing bacteria. Dry mouth, caused by reduced saliva production, also heightens cavity risk, as saliva neutralizes acids and clears food particles.
            </Typography>
            <Typography variant="h5" className="cavity-section-title" gutterBottom>
              Age Groups Most Affected
            </Typography>
            <Typography variant="body1" className="cavity-text">
              Cavities can affect anyone, but children and teenagers are particularly susceptible due to their diets, developing teeth, and sometimes inconsistent brushing habits. Older adults face higher risks due to gum recession and medication-induced dry mouth. Toddlers are also prone to "baby bottle tooth decay" from prolonged exposure to sugary drinks or milk.
            </Typography>
            <button
              className="cavity-cta-button"
              onClick={handleBookConsultationClick}
            >
              Book an Appointment
            </button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* Footer */}
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <p>📞 +1-800-HEALTH</p>
          <p>✉️ support@healthcareplus.com</p>
        </div>
        <div className="social-proof">
          <p>👨‍⚕️ 10,000+ Patients Helped</p>
          <p>✅ 99% Satisfaction Rate</p>
          <p><b>Opening Hours</b><br />
            Mon-Sat: 10 am - 5:00 pm<br />
            Sun: CLOSED
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default Cavity;
