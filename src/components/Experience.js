import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiChevronDown } from 'react-icons/fi';
import './Experience.css';

const Experience = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const experience = {
    company: 'CES',
    position: 'Lead Software Technologist (Fullstack Developer)',
    location: 'Remote',
    period: 'Dec 2024 - Present',
    summary: 'Led design and delivery of enterprise solutions using Angular 19 and .NET Core while modernizing existing applications through clean architecture. Championed automated testing practices with Playwright and mentored junior developers on modern frontend architecture. Collaborated across product and QA teams to translate business requirements into scalable solutions.',
    technologies: ['Angular 19', 'React', '.NET Core', 'TypeScript', 'AWS', 'Playwright', 'Azure DevOps'],
  };

  return (
    <section className="experience" id="experience">
      <div className="experience::before"></div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Experience</h2>

          <motion.div
            className="experience-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div
              className="experience-header-clickable"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="experience-header">
                <div className="experience-title">
                  <FiBriefcase className="icon" size={24} />
                  <div>
                    <p className="location-label">{experience.location}</p>
                    <h3>{experience.company}</h3>
                    <p className="position-label">{experience.position}</p>
                  </div>
                </div>
                <div className="experience-meta">
                  <div className="meta-item">
                    <span>{experience.period}</span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="toggle-icon"
              >
                <FiChevronDown size={24} />
              </motion.div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="experience-content"
                >
                  <div className="experience-summary">
                    <p>{experience.summary}</p>
                  </div>

                  <div className="experience-tech">
                    <div className="tech-tags">
                      {experience.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="tech-tag"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="experience-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>Interested in my full experience history?</p>
            <a href="/nilesh-kolhe-resume.pdf" className="btn" download>
              Download Full Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
