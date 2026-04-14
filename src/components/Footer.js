import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';  

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-background"></div>

      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="footer-text">
            <p>
              Designed & Built with <span className="heart">❤️</span> by Nilesh Kolhe
            </p>
            {/* <p className="dedication">
              Dedicated to my little sunshine, Keya 🌟
            </p> */}
            <p className="copyright">
              &copy; {currentYear}{' '}
              <a href="https://nileshkolhe.com" target="_blank" rel="noopener noreferrer">
                nileshkolhe.com
              </a>
              . All rights reserved.
            </p>
          </div>

          <div className="footer-links">
            <a href="https://github.com/nilesh-kolhe" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
            <a href="https://linkedin.com/in/nilesh-kolhe" target="_blank" rel="noopener noreferrer" className="footer-link">
              LinkedIn
            </a>
            <a href="https://medium.com/@nilesh_kolhe" target="_blank" rel="noopener noreferrer" className="footer-link">
              Blog
            </a>
            <a href="mailto:kolhe.nilesh@rocketmail.com" className="footer-link">
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
