import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../../JobContext';
import { FiSearch, FiBriefcase, FiBookmark, FiUser, FiX, FiMenu } from 'react-icons/fi';

interface UltimateHeaderProps {
  onSavedJobsClick?: () => void;
  onMobileMenuToggle?: () => void;
}

const UltimateHeader: React.FC<UltimateHeaderProps> = ({ 
  onSavedJobsClick, 
  onMobileMenuToggle 
}) => {
  const { state, dispatch } = useJobs();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const clearSearch = (): void => {
    dispatch({ type: 'SET_SEARCH', payload: '' });
  };

  const navigateToProfile = (): void => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'profile' });
  };

  return (
    <motion.header 
      className="ultimate-header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="banner"
    >
      <div className="header-container">
        <div className="header-content">
          <motion.div 
            className="brand-section"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="brand-logo">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <FiBriefcase className="brand-icon" aria-hidden="true" />
              </motion.div>
              <h1 className="brand-title">wAwO</h1>
            </div>
            <span className="brand-tagline">wanna work?</span>
          </motion.div>

          <div className="search-section">
            <motion.div 
              className={`search-container ${isSearchFocused ? 'focused' : ''}`}
              animate={{ 
                scale: isSearchFocused ? 1.02 : 1,
                boxShadow: isSearchFocused 
                  ? "0 8px 32px rgba(102, 126, 234, 0.2)" 
                  : "0 4px 16px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" aria-hidden="true" />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search jobs, companies, or skills..."
                  value={state.searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  aria-label="Search for jobs"
                  autoComplete="off"
                />
                {state.searchTerm && (
                  <motion.button
                    className="clear-search-btn"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          <div className="actions-section">
            <motion.button
              className="saved-jobs-indicator"
              onClick={onSavedJobsClick}
              aria-label={`View saved jobs (${state.savedJobs.length} saved)`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="indicator-icon">
                <FiBookmark aria-hidden="true" />
                {state.savedJobs.length > 0 && (
                  <motion.span 
                    className="indicator-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={state.savedJobs.length}
                  >
                    {state.savedJobs.length}
                  </motion.span>
                )}
              </div>
              <span className="indicator-text">Saved</span>
            </motion.button>

            {state.isAuthenticated && (
              <motion.button
                className="profile-btn"
                onClick={navigateToProfile}
                aria-label="View profile"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiUser aria-hidden="true" />
                <span className="profile-text">Profile</span>
              </motion.button>
            )}

            <motion.button
              className="mobile-menu-toggle"
              onClick={onMobileMenuToggle}
              aria-label="Toggle mobile menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiMenu aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default UltimateHeader;