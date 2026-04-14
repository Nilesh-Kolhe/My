import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import profilePhoto from '../assets/Photo.jpeg';
import './About.css';
import resume from '../assets/Fullstack-Developer-Nilesh-Kolhe.pdf';

const About = () => {
  const skills = [
    { category: 'Frontend', items: ['React', 'Angular', 'HTML', 'CSS', 'JavaScript', 'TypeScript'] },
    { category: 'Backend', items: ['C#', '.NET Core', 'ASP.NET Web API', 'Python', 'FastAPI'] },
    { category: 'AI/ML', items: ['LangChain', 'Ollama', 'FastAPI Streaming', 'RAG Systems', 'Vector DB'] },
    { category: 'Cloud', items: ['Azure', 'AWS', 'Azure Functions', 'App Service', 'Blob Storage'] },
    { category: 'Databases', items: ['SQL Server', 'Entity Framework', 'MongoDB', 'LINQ'] },
    { category: 'Tools & DevOps', items: ['Git', 'Azure DevOps', 'CI/CD', 'Docker', 'Postman'] },
  ];

  return (
    <section className="about" id="about">
      <div className="about::before"></div>

      <div className="container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="about-image">
            <motion.div
              className="image-wrapper"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="profile-image-placeholder">
                <img src={profilePhoto} alt="Nilesh Kolhe" className="profile-image" />
              </div>
              <div className="image-border"></div>
            </motion.div>
          </div>

          <div className="about-text">
            <h2>About Me</h2>
            <p>
              I'm an AI-Enabled Fullstack Developer with 11+ years of hands-on experience building production-grade web applications. My expertise spans Angular, React, C#, .NET Core, Azure, and AWS, with a strong focus on modern AI/ML technologies.
            </p>
            <p>
              I specialize in creating scalable, high-performing systems for FinTech, Healthcare, and EdTech domains. I'm passionate about code quality, user experience, and leveraging emerging technologies like LangChain and vector databases to solve real-world problems.
            </p>
            <p>
              When I'm not coding, you'll find me chasing my daughter Keya around the house — she's 1.5 and already debugging my patience! I also enjoy photography, exploring new technologies, and contributing to the developer community through blogs and mentoring.
            </p>

            <div className="about-location">
              📍 Pune, India | Open to relocation and visa sponsorship
            </div>

            <motion.a
              href={resume}
              className="btn btn-primary"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload size={20} />
              Download Resume
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="skills-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="skills-title">Technical Skills</h3>
          <div className="skills-grid">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                className="skill-group-container"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4>{skillGroup.category}</h4>
                <div className="skill-group">
                  {skillGroup.items.map((skill, i) => (
                    <motion.span
                      key={i}
                      className="skill-tag"
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
