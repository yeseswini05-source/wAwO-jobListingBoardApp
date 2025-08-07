import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../JobContext';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

const AuthPage: React.FC = () => {
  const { dispatch } = useJobs();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Validate password strength
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      // Validate passwords match for signup
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Validate name for signup
      if (!isLogin && !formData.name.trim()) {
        throw new Error('Name is required for registration');
      }
      
      // Mock authentication - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const user = {
        id: Date.now().toString(),
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        skills: [],
        experience: '',
        location: ''
      };

      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      dispatch({ type: 'SET_CURRENT_PAGE', payload: 'profile' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div
          className="auth-card glass-card"
          initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 80, damping: 20 }}
          whileHover={{ y: -8, scale: 1.02, rotateY: 2, boxShadow: "0 30px 60px rgba(102, 126, 234, 0.3)" }}
        >
          <div className="card-glow"></div>
          <motion.div 
            className="auth-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.h1 
              className="brand-name"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
            >
              wAwO
            </motion.h1>
            <motion.p 
              className="auth-subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              {isLogin ? 'Welcome back!' : 'Join the community'}
            </motion.p>
          </motion.div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <motion.form 
            onSubmit={handleSubmit} 
            className="auth-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            {!isLogin && (
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              >
                <motion.div 
                  className="input-wrapper"
                  whileFocus={{ scale: 1.02, boxShadow: "0 10px 25px rgba(102, 126, 234, 0.2)" }}
                >
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </motion.div>
              </motion.div>
            )}

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: isLogin ? 1.1 : 1.3, ease: "easeOut" }}
            >
              <motion.div 
                className="input-wrapper"
                whileFocus={{ scale: 1.02, boxShadow: "0 10px 25px rgba(102, 126, 234, 0.2)" }}
              >
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: isLogin ? 1.3 : 1.5, ease: "easeOut" }}
            >
              <motion.div 
                className="input-wrapper"
                whileFocus={{ scale: 1.02, boxShadow: "0 10px 25px rgba(102, 126, 234, 0.2)" }}
              >
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <motion.button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </motion.button>
              </motion.div>
            </motion.div>

            {!isLogin && (
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.7, ease: "easeOut" }}
              >
                <motion.div 
                  className="input-wrapper"
                  whileFocus={{ scale: 1.02, boxShadow: "0 10px 25px rgba(102, 126, 234, 0.2)" }}
                >
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </motion.div>
              </motion.div>
            )}

            <motion.button 
              type="submit" 
              className="auth-submit-btn glass-button"
              disabled={isLoading}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: isLogin ? 1.5 : 1.9, ease: "easeOut" }}
              whileHover={!isLoading ? { 
                scale: 1.08, 
                y: -4, 
                boxShadow: "0 20px 40px rgba(102, 126, 234, 0.4)"
              } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              <span>
                {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </span>
              <div className="button-glow"></div>
            </motion.button>
          </motion.form>

          <motion.div 
            className="auth-switch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: isLogin ? 1.7 : 2.1, ease: "easeOut" }}
          >
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <motion.button
                type="button"
                className="switch-btn"
                onClick={() => setIsLogin(!isLogin)}
                whileHover={{ scale: 1.05, color: "#667eea" }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </motion.button>
            </p>
          </motion.div>

          <motion.div 
            className="auth-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: isLogin ? 1.9 : 2.3, ease: "easeOut" }}
          >
            <motion.button
              className="back-btn"
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'home' })}
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Home
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;