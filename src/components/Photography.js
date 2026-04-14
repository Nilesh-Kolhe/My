import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import './Photography.css';

// Import all gallery images
import img1 from '../assets/gallery/IMG_3567.jpeg';
import img2 from '../assets/gallery/IMG_0346.jpeg';
import img3 from '../assets/gallery/IMG_2398.jpeg';
import img4 from '../assets/gallery/IMG_0507.JPG';
import img5 from '../assets/gallery/IMG_20260402_182240559_HDR~2.jpg';
import img6 from '../assets/gallery/IMG_6824.JPG';
import img7 from '../assets/gallery/IMG_0343.jpeg';
import img8 from '../assets/gallery/IMG_4961.jpeg';
import img9 from '../assets/gallery/IMG_3881.JPG';
import img10 from '../assets/gallery/IMG_9738.jpeg';

const Photography = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const galleryRef = useRef(null);

  const photos = [
    { id: 1, src: img1 },
    { id: 2, src: img2 },
    { id: 3, src: img3 },
    { id: 4, src: img4 },
    { id: 5, src: img5 },
    { id: 6, src: img6 },
    { id: 7, src: img7 },
    { id: 8, src: img8 },
    { id: 9, src: img9 },
    { id: 10, src: img10 },
  ];

  const handlePrev = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft -= 455;
    }
  };

  const handleNext = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft += 455;
    }
  };

  const handleLightboxPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleLightboxNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="photography" id="photography">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Gallery</h2>

          <p className="section-subtitle">
            A collection of moments captured through my lens
          </p>

          <div className="carousel-wrapper">
            <motion.button
              className="carousel-button"
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft size={24} />
            </motion.button>

            <div className="gallery" ref={galleryRef}>
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="gallery-item"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedIndex(index)}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="photo-container">
                    <img
                      src={photo.src}
                      alt={`Gallery ${index + 1}`}
                      className="gallery-photo"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <div className="photo-overlay">
                    <button className="view-fullscreen">View</button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="carousel-button"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight size={24} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelectedIndex(null)}
              >
                <FiX size={32} />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={photos[selectedIndex].src}
                  alt={`Gallery ${selectedIndex + 1}`}
                  className="lightbox-image"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              <div className="lightbox-nav">
                <motion.button
                  className="nav-btn"
                  onClick={handleLightboxPrev}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiChevronLeft size={20} />
                </motion.button>
                <span>{selectedIndex + 1} / {photos.length}</span>
                <motion.button
                  className="nav-btn"
                  onClick={handleLightboxNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiChevronRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Photography;
