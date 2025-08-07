import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useJobs } from '../JobContext';
import { FiArrowRight, FiUsers, FiBriefcase, FiTrendingUp, FiStar } from 'react-icons/fi';

const HomePage: React.FC = () => {
  const { dispatch } = useJobs();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigateToJobs = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'jobs' });
  };

  const navigateToAuth = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'auth' });
  };

  return (
    <div className="home-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div 
          className="floating-circle circle-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="floating-circle circle-2"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        />
        <div 
          className="floating-circle circle-3"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="container">
          <motion.div
            className="hero-content"
            style={{ y: y1, opacity }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <motion.span 
                className="brand-name"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
              >
                wAwO
              </motion.span>
              <motion.span 
                className="tagline"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                wanna work?
              </motion.span>
            </motion.h1>
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              Your AI-powered career companion. Find your dream job, get personalized insights, 
              and accelerate your career with intelligent matching and expert guidance.
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            >
              <motion.button 
                className="cta-primary glass-button" 
                onClick={navigateToJobs}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                whileHover={{ scale: 1.08, y: -4, boxShadow: "0 20px 40px rgba(102, 126, 234, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Jobs</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiArrowRight />
                </motion.div>
                <div className="button-glow"></div>
              </motion.button>
              <motion.button 
                className="cta-secondary glass-button" 
                onClick={navigateToAuth}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
                whileHover={{ scale: 1.08, y: -4, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <div className="button-glow"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-background">
          <div className="mesh-gradient"></div>
        </div>
        <div className="container">
          <motion.h2
            className="section-title glass-text"
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Why Choose wAwO?
          </motion.h2>
          <div className="features-grid">
            <motion.div
              className="feature-card glass-card"
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ 
                y: -15, 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(102, 126, 234, 0.3)"
              }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="card-glow"></div>
              <div className="feature-icon">
                <FiTrendingUp />
              </div>
              <h3>AI-Powered Matching</h3>
              <p>Get personalized job recommendations with skill match percentages based on your resume and preferences.</p>
            </motion.div>

            <motion.div
              className="feature-card glass-card"
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ 
                y: -15, 
                scale: 1.05, 
                rotateY: -5,
                boxShadow: "0 25px 50px rgba(255, 215, 0, 0.3)"
              }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="card-glow"></div>
              <div className="feature-icon">
                <FiStar />
              </div>
              <h3>Resume Rating</h3>
              <p>Get instant feedback on your resume with detailed scoring and improvement suggestions.</p>
            </motion.div>

            <motion.div
              className="feature-card glass-card"
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ 
                y: -15, 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(76, 175, 80, 0.3)"
              }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="card-glow"></div>
              <div className="feature-icon">
                <FiBriefcase />
              </div>
              <h3>Career Coaching</h3>
              <p>Access personalized interview questions, cover letter templates, and career guidance.</p>
            </motion.div>

            <motion.div
              className="feature-card glass-card"
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ 
                y: -15, 
                scale: 1.05, 
                rotateY: -5,
                boxShadow: "0 25px 50px rgba(233, 30, 99, 0.3)"
              }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="card-glow"></div>
              <div className="feature-icon">
                <FiUsers />
              </div>
              <h3>Top Companies</h3>
              <p>Access opportunities from 30+ leading tech companies including FAANG and unicorn startups.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              viewport={{ once: true }}
            >
              <h3>150+</h3>
              <p>Active Job Listings</p>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
              viewport={{ once: true }}
            >
              <h3>30+</h3>
              <p>Partner Companies</p>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
              viewport={{ once: true }}
            >
              <h3>95%</h3>
              <p>Match Accuracy</p>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "backOut" }}
              viewport={{ once: true }}
            >
              <h3>24/7</h3>
              <p>AI Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2>Ready to Find Your Dream Job?</h2>
            <p>Join thousands of professionals who found their perfect match with wAwO</p>
            <motion.button 
              className="cta-primary" 
              onClick={navigateToAuth}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.08, 
                y: -5,
                boxShadow: "0 20px 40px rgba(102, 126, 234, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Start Your Journey 
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <FiArrowRight />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;