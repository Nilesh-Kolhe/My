import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'PDF ChatBot',
      subtitle: 'Ollama + FastAPI + LangChain',
      description: 'Full-stack AI-powered application enabling intelligent PDF document interaction through natural language processing. Built with 100% local inference using React, Ollama Qwen2.5:14B, and FAISS vectors.',
      highlights: [
        'Drag-and-drop PDF upload with PyPDF chunking',
        'Streaming Q&A with source citations',
        'Vector similarity search with k=12',
      ],
      technologies: ['React', 'FastAPI', 'LangChain', 'Ollama', 'FAISS', 'Python'],
      link: 'https://github.com/Nilesh-Kolhe/PDF-ChatBot',
      github: 'https://github.com/Nilesh-Kolhe/PDF-ChatBot',
    },
    {
      title: 'N8N GitHub PR Guard',
      subtitle: 'n8n + Groq AI + GitHub Webhooks',
      description: 'Intelligent PR review automation workflow integrating n8n orchestration and Groq LLM to analyze code differences and deliver structured AI-driven feedback.',
      highlights: [
        'Automated PR analysis on GitHub',
        'AI-powered code quality assessment',
        'Slack notifications for team awareness',
      ],
      technologies: ['n8n', 'Groq AI', 'GitHub API', 'Slack Integration', 'JSON Processing'],
      link: 'https://github.com/Nilesh-Kolhe/N8N-GitHub-PR-Guard',
      github: 'https://github.com/Nilesh-Kolhe/N8N-GitHub-PR-Guard',
    },
  ];

  return (
    <section className="projects" id="projects">
      <div className="projects::after"></div>

      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <div className="image-placeholder">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                  >
                    {index === 0 ? '📄' : index === 1 ? '🔍' : '🏥'}
                  </motion.div>
                </div>
              </div>

              <div className="project-content">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* <div className="project-highlights">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="highlight">
                      <div className="dot"></div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div> */}

                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <motion.a
                    href={project.link}
                    target='_blank'
                    className="project-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink size={18} />
                    View Project
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target='_blank'
                    className="project-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub size={18} />
                    GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="projects-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>Interested in more projects?</p>
          <a href="https://github.com/nilesh-kolhe" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Visit My GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
