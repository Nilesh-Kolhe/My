import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiMedium } from 'react-icons/si';
import './Navbar.css';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'My Work', href: '#projects' },
    { label: 'Gallery', href: '#photography' },
    { label: 'Reach Me', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com/nilesh-kolhe', label: 'GitHub' },
    { icon: FiLinkedin, url: 'https://linkedin.com/in/nilesh-kolhe', label: 'LinkedIn' },
    { icon: SiMedium, url: 'https://medium.com/@nilesh_kolhe', label: 'Medium' },
    { icon: FiMail, url: 'mailto:kolhe.nilesh@rocketmail.com', label: 'Email' },
  ];

  return (
    <nav className="navbar">
      <motion.div
        className="nav-container container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.a
          href="#home"
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveSection('home')}
        >
          NK
        </motion.a>

        {/* Desktop Menu */}
        <div className="nav-menu">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="nav-link"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ color: 'var(--accent-blue)' }}
              onClick={() => {
                setActiveSection(item.href.substring(1));
                setIsOpen(false);
              }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="nav-social">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1.2, color: 'var(--accent-blue)' }}
                whileTap={{ scale: 0.9 }}
                title={link.label}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="mobile-link"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.href.substring(1));
                setIsOpen(false);
                // Delay scroll until menu collapse animation finishes
                setTimeout(() => {
                  const target = document.querySelector(item.href);
                  if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
                    window.scrollTo({ top: targetTop, behavior: 'smooth' });
                  }
                }, 350);
              }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
