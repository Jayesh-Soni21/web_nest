import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        
        {/* About JobPortal */}
        <div style={sectionStyle}>
          <h3 style={titleStyle}>About JobPortal</h3>
          <p style={textStyle}>
            WorkNest is your trusted platform for discovering top job opportunities across various industries.
            Connect with employers and advance your career today.
          </p>
        </div>

        {/* Follow Us Section */}
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Follow Us</h3>
          <div style={socialStyle}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={copyrightStyle}>
        © 2024 WorkNest. All Rights Reserved.
      </div>
    </footer>
  );
};

// Inline Styles
const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px 0',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '1200px',
  margin: 'auto',
  flexWrap: 'wrap',
  gap: '20px',
};

const sectionStyle = {
  flex: '1',
  minWidth: '200px',
};

const titleStyle = {
  marginBottom: '10px',
  fontSize: '18px',
};

const textStyle = {
  fontSize: '14px',
  color: '#ccc',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#ccc',
};

const socialStyle = {
  display: 'flex',
  gap: '10px',
};

const copyrightStyle = {
  textAlign: 'center',
  paddingTop: '10px',
  fontSize: '14px',
  color: '#ccc',
};

export default Footer;
