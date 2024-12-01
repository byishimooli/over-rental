import React from "react";
import './Form.css';

// Replace these imports with your actual image paths
import appStoreImage from "../componets/images/app-store-og-twitter.png";
import googlePlayImage from "../componets/images/Google-Play-Logo.png";
import instagramIcon from "../componets/images/instagram.png";
import linkedinIcon from "../componets/images/linkdin.png";
import facebookIcon from "../componets/images/facebbook.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h4>About Over rentals</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our News</a></li>
            <li><a href="#">For Partners</a></li>
            <li><a href="#">For Investors</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* For Tenants Section */}
        <div className="footer-section">
          <h4>For Tenants</h4>
          <ul>
            <li><a href="#">Negotiate Rent</a></li>
            <li><a href="#">Pay Rent</a></li>
            <li><a href="#">eSign Lease</a></li>
            <li><a href="#">Insurance</a></li>
          </ul>
        </div>

        {/* For Landlords Section */}
        <div className="footer-section">
          <h4>For Landlords</h4>
          <ul>
            <li><a href="#">List a Property</a></li>
            <li><a href="#">Tenant Screening</a></li>
            <li><a href="#">Collect Rent</a></li>
          </ul>
        </div>

        {/* Social Media & App Links */}
        <div className="footer-section">
          <h4>Mobile Application:</h4>
          <div className="app-links">
            <a href="#">
              <img src={appStoreImage} alt="App Store" />
            </a>
            <a href="#">
              <img src={googlePlayImage} alt="Google Play" />
            </a>
          </div>
          <h4>Join us:</h4>
          <div className="social-icons">
            <a href="#">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="#">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a href="#">
              <img src={facebookIcon} alt="Facebook" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
