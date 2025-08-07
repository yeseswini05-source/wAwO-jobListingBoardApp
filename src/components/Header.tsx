import React from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../JobContext';
import { FiSearch, FiBriefcase, FiTrendingUp } from 'react-icons/fi';

const Header: React.FC = () => {
  const { state, dispatch } = useJobs();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  return (
    <header className="header">
      <div className="container">
        <motion.div
          className="header-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-title">
            <FiBriefcase className="header-icon" />
            <h1>AI-Powered Job Board</h1>
            <div className="header-subtitle">
              <FiTrendingUp />
              <span>Find your dream job with AI insights</span>
            </div>
          </div>
          
          <div className="search-container">
            <div className="search-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search-bar"
                placeholder="Search by job title, company, or skills..."
                value={state.searchTerm}
                onChange={handleSearchChange}
                aria-label="Search jobs"
              />
            </div>
            <div className="search-stats">
              <span>{state.jobs.length} premium opportunities available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;