import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../../JobContext';
import { FiFilter, FiChevronDown, FiX, FiCheck, FiSearch } from 'react-icons/fi';

interface FilterAccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({ title, children, isOpen, onToggle }) => (
  <div className="ultimate-filter-accordion">
    <motion.button
      className="accordion-header"
      onClick={onToggle}
      aria-expanded={isOpen}
      whileHover={{ backgroundColor: "rgba(102, 126, 234, 0.05)" }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="accordion-title">{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <FiChevronDown />
      </motion.div>
    </motion.button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="accordion-content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="accordion-body">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const UltimateFilterPanel: React.FC = () => {
  const { state, dispatch } = useJobs();
  const [openSections, setOpenSections] = useState({
    jobType: true,
    experience: true,
    location: false,
    salary: false
  });
  const [locationSearch, setLocationSearch] = useState('');

  const locations = useMemo(() => [
    'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
    'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Atlanta, GA', 'Miami, FL',
    'Portland, OR', 'Nashville, TN', 'London, UK', 'Toronto, Canada', 'Remote'
  ], []);

  const filteredLocations = useMemo(() => 
    locations.filter(location => 
      location.toLowerCase().includes(locationSearch.toLowerCase())
    ), [locationSearch, locations]
  );

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (filterType: string, value: string): void => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { [filterType]: value }
    });
  };

  const clearAllFilters = (): void => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { jobType: '', experience: '', location: '', salaryRange: '' }
    });
    setLocationSearch('');
  };

  const hasActiveFilters = Object.values(state.filters).some(filter => filter !== '');

  const FilterOption: React.FC<{ 
    value: string; 
    label: string; 
    isSelected: boolean; 
    onChange: () => void;
  }> = ({ value, label, isSelected, onChange }) => (
    <motion.div
      className={`filter-option ${isSelected ? 'selected' : ''}`}
      onClick={onChange}
      whileHover={{ backgroundColor: "rgba(102, 126, 234, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`filter-radio ${isSelected ? 'checked' : ''}`}>
        {isSelected && <FiCheck className="check-icon" />}
      </div>
      <span className="filter-label">{label}</span>
    </motion.div>
  );

  return (
    <motion.aside
      className="ultimate-filter-panel"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="complementary"
      aria-label="Job filters"
    >
      <div className="filter-header">
        <div className="filter-title">
          <FiFilter className="filter-icon" aria-hidden="true" />
          <h2>Filters</h2>
        </div>
        {hasActiveFilters && (
          <motion.button
            className="clear-filters-btn"
            onClick={clearAllFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Clear all filters"
          >
            <FiX aria-hidden="true" />
            <span>Clear All</span>
          </motion.button>
        )}
      </div>

      <div className="filter-content">
        {/* Job Type Filter */}
        <FilterAccordion
          title="Job Type"
          isOpen={openSections.jobType}
          onToggle={() => toggleSection('jobType')}
        >
          <div className="filter-options">
            <FilterOption
              value=""
              label="All Types"
              isSelected={state.filters.jobType === ''}
              onChange={() => handleFilterChange('jobType', '')}
            />
            {['Full-time', 'Part-time', 'Contract', 'Remote'].map(type => (
              <FilterOption
                key={type}
                value={type}
                label={type}
                isSelected={state.filters.jobType === type}
                onChange={() => handleFilterChange('jobType', type)}
              />
            ))}
          </div>
        </FilterAccordion>

        {/* Experience Level Filter */}
        <FilterAccordion
          title="Experience Level"
          isOpen={openSections.experience}
          onToggle={() => toggleSection('experience')}
        >
          <div className="filter-options">
            <FilterOption
              value=""
              label="All Levels"
              isSelected={state.filters.experience === ''}
              onChange={() => handleFilterChange('experience', '')}
            />
            {['Entry', 'Mid', 'Senior', 'Lead'].map(level => (
              <FilterOption
                key={level}
                value={level}
                label={`${level} Level`}
                isSelected={state.filters.experience === level}
                onChange={() => handleFilterChange('experience', level)}
              />
            ))}
          </div>
        </FilterAccordion>

        {/* Location Filter */}
        <FilterAccordion
          title="Location"
          isOpen={openSections.location}
          onToggle={() => toggleSection('location')}
        >
          <div className="location-search">
            <div className="location-search-wrapper">
              <FiSearch className="search-icon" aria-hidden="true" />
              <input
                type="text"
                className="location-search-input"
                placeholder="Search locations..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                aria-label="Search locations"
              />
            </div>
          </div>
          <div className="filter-options scrollable">
            <FilterOption
              value=""
              label="All Locations"
              isSelected={state.filters.location === ''}
              onChange={() => handleFilterChange('location', '')}
            />
            {filteredLocations.map(location => (
              <FilterOption
                key={location}
                value={location}
                label={location}
                isSelected={state.filters.location.includes(location.split(',')[0])}
                onChange={() => handleFilterChange('location', location.split(',')[0])}
              />
            ))}
          </div>
        </FilterAccordion>

        {/* Salary Range Filter */}
        <FilterAccordion
          title="Salary Range"
          isOpen={openSections.salary}
          onToggle={() => toggleSection('salary')}
        >
          <div className="filter-options">
            <FilterOption
              value=""
              label="All Salaries"
              isSelected={state.filters.salaryRange === ''}
              onChange={() => handleFilterChange('salaryRange', '')}
            />
            {[
              { value: '0-80k', label: '$0 - $80k' },
              { value: '80k-120k', label: '$80k - $120k' },
              { value: '120k-160k', label: '$120k - $160k' },
              { value: '160k-200k', label: '$160k - $200k' },
              { value: '200k-300k', label: '$200k - $300k' },
              { value: '300k+', label: '$300k+' }
            ].map(range => (
              <FilterOption
                key={range.value}
                value={range.value}
                label={range.label}
                isSelected={state.filters.salaryRange === range.value}
                onChange={() => handleFilterChange('salaryRange', range.value)}
              />
            ))}
          </div>
        </FilterAccordion>
      </div>
    </motion.aside>
  );
};

export default UltimateFilterPanel;