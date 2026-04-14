import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { SiMedium } from 'react-icons/si';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact::after"></div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Get In Touch</h2>

          <p className="contact-intro">
            Whether you have a question or just want to say hi, feel free to get in touch !
          </p>

          <div className="contact-content">
            {/* Contact Info */}
            <div className="contact-info-section">
              <h3>Contact Information</h3>

              <div className="contact-cards">
                <motion.a
                  href="mailto:kolhe.nilesh@rocketmail.com"
                  className="contact-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-icon">
                    <FiMail size={24} />
                  </div>
                  <div className="card-content">
                    <h4>Email</h4>
                    <p>kolhe.nilesh@rocketmail.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+919673973040"
                  className="contact-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-icon">
                    <FiPhone size={24} />
                  </div>
                  <div className="card-content">
                    <h4>Phone</h4>
                    <p>+91 967 397 3040</p>
                  </div>
                </motion.a>

                <motion.div
                  className="contact-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-icon">
                    <FiMapPin size={24} />
                  </div>
                  <div className="card-content">
                    <h4>Location</h4>
                    <p>Pune, India</p>
                  </div>
                </motion.div>
              </div>

              <div className="social-section">
                <h4>Follow Me</h4>
                <div className="social-icons">
                  <motion.a
                    href="https://github.com/nilesh-kolhe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="GitHub"
                  >
                    <FiGithub size={20} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/nilesh-kolhe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="LinkedIn"
                  >
                    <FiLinkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="https://medium.com/@nilesh_kolhe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="Medium"
                  >
                    <SiMedium size={20} />
                  </motion.a>
                  <motion.a
                    href="https://nileshkolhe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="Website"
                  >
                    <span>🌐</span>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Send a Message</h3>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSend size={20} />
                Send Message
              </motion.button>

              {submitted && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for your message! I'll get back to you soon.
                </motion.div>
              )}
            </motion.form>
          </div>

          <div className="contact-footer">
            <p>Open to relocation and visa sponsorship</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
