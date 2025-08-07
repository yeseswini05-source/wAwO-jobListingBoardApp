import React from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../../JobContext';
import { FiSearch, FiBriefcase, FiBookmark, FiUser } from 'react-icons/fi';

interface EnhancedHeaderProps {
  onSavedJobsClick?: () => void;
}

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ onSavedJobsClick }) => {
  const { state, dispatch } = useJobs();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const navigateToProfile = (): void => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'profile' });
  };

  return (
    <header className="enhanced-header" role="banner">
      <div className="container">
        <div className="header-content">
          <motion.div 
            className="brand-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="brand-logo">
              <FiBriefcase className="brand-icon" aria-hidden="true" />
              <h1 className="brand-title">wAwO</h1>
            </div>
            <span className="brand-tagline">wanna work?</span>
          </motion.div>

          <motion.div 
            className="search-section"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="search-container">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" aria-hidden="true" />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search jobs, companies, or skills..."
                  value={state.searchTerm}
                  onChange={handleSearchChange}
                  aria-label="Search for jobs"
                  autoComplete="off"
                />
                {state.searchTerm && (
                  <button
                    className="clear-search-btn"
                    onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="actions-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              className="saved-jobs-indicator"
              onClick={onSavedJobsClick}
              aria-label={`View saved jobs (${state.savedJobs.length} saved)`}
            >
              <div className="indicator-icon">
                <FiBookmark aria-hidden="true" />
                {state.savedJobs.length > 0 && (
                  <span className="indicator-badge" aria-hidden="true">
                    {state.savedJobs.length}
                  </span>
                )}
              </div>
              <span className="indicator-text">Saved Jobs</span>
            </button>

            {state.isAuthenticated && (
              <button
                className="profile-btn"
                onClick={navigateToProfile}
                aria-label="View profile"
              >
                <FiUser aria-hidden="true" />
                <span className="profile-text">Profile</span>
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader;