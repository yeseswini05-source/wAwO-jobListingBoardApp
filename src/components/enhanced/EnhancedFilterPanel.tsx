import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../../JobContext';
import { FiFilter, FiChevronDown, FiX, FiCheck } from 'react-icons/fi';

interface FilterAccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({ title, isOpen, onToggle, children }) => (
  <div className="filter-accordion">
    <button
      className="accordion-header"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`filter-${title.toLowerCase().replace(' ', '-')}`}
    >
      <span className="accordion-title">{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <FiChevronDown aria-hidden="true" />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={`filter-${title.toLowerCase().replace(' ', '-')}`}
          className="accordion-content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="accordion-body">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const EnhancedFilterPanel: React.FC = () => {
  const { state, dispatch } = useJobs();
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set(['job-type']));
  const [locationSearch, setLocationSearch] = useState('');

  const toggleAccordion = (accordionId: string): void => {
    setOpenAccordions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(accordionId)) {
        newSet.delete(accordionId);
      } else {
        newSet.add(accordionId);
      }
      return newSet;
    });
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
      payload: {
        jobType: '',
        experience: '',
        location: '',
        salaryRange: ''
      }
    });
    setLocationSearch('');
  };

  const hasActiveFilters = Object.values(state.filters).some(filter => filter !== '');

  const locations = [
    'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
    'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Atlanta, GA', 'Miami, FL',
    'Portland, OR', 'Nashville, TN', 'London, UK', 'Toronto, Canada', 'Remote'
  ];

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <aside className="enhanced-filter-panel" role="complementary" aria-label="Job filters">
      <div className="filter-header">
        <div className="filter-title">
          <FiFilter className="filter-icon" aria-hidden="true" />
          <h2>Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            className="clear-filters-btn"
            onClick={clearAllFilters}
            aria-label="Clear all filters"
          >
            <FiX aria-hidden="true" />
            Clear All
          </button>
        )}
      </div>

      <div className="filter-content">
        {/* Job Type Filter */}
        <FilterAccordion
          title="Job Type"
          isOpen={openAccordions.has('job-type')}
          onToggle={() => toggleAccordion('job-type')}
        >
          <div className="filter-options" role="radiogroup" aria-label="Job type">
            {['Full-time', 'Part-time', 'Contract', 'Remote'].map(type => (
              <label key={type} className="filter-option">
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={state.filters.jobType === type}
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  className="filter-radio"
                />
                <span className="filter-label">{type}</span>
                {state.filters.jobType === type && (
                  <FiCheck className="check-icon" aria-hidden="true" />
                )}
              </label>
            ))}
          </div>
        </FilterAccordion>

        {/* Experience Level Filter */}
        <FilterAccordion
          title="Experience Level"
          isOpen={openAccordions.has('experience')}
          onToggle={() => toggleAccordion('experience')}
        >
          <div className="filter-options" role="radiogroup" aria-label="Experience level">
            {['Entry', 'Mid', 'Senior', 'Lead'].map(level => (
              <label key={level} className="filter-option">
                <input
                  type="radio"
                  name="experience"
                  value={level}
                  checked={state.filters.experience === level}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="filter-radio"
                />
                <span className="filter-label">{level} Level</span>
                {state.filters.experience === level && (
                  <FiCheck className="check-icon" aria-hidden="true" />
                )}
              </label>
            ))}
          </div>
        </FilterAccordion>

        {/* Location Filter */}
        <FilterAccordion
          title="Location"
          isOpen={openAccordions.has('location')}
          onToggle={() => toggleAccordion('location')}
        >
          <div className="location-search">
            <input
              type="text"
              placeholder="Search locations..."
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="location-search-input"
              aria-label="Search locations"
            />
          </div>
          <div className="filter-options scrollable" role="radiogroup" aria-label="Location">
            {filteredLocations.map(location => (
              <label key={location} className="filter-option">
                <input
                  type="radio"
                  name="location"
                  value={location}
                  checked={state.filters.location === location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="filter-radio"
                />
                <span className="filter-label">{location}</span>
                {state.filters.location === location && (
                  <FiCheck className="check-icon" aria-hidden="true" />
                )}
              </label>
            ))}
          </div>
        </FilterAccordion>

        {/* Salary Range Filter */}
        <FilterAccordion
          title="Salary Range"
          isOpen={openAccordions.has('salary')}
          onToggle={() => toggleAccordion('salary')}
        >
          <div className="filter-options" role="radiogroup" aria-label="Salary range">
            {[
              { value: '0-80k', label: '$0 - $80k' },
              { value: '80k-120k', label: '$80k - $120k' },
              { value: '120k-160k', label: '$120k - $160k' },
              { value: '160k-200k', label: '$160k - $200k' },
              { value: '200k-300k', label: '$200k - $300k' },
              { value: '300k+', label: '$300k+' }
            ].map(range => (
              <label key={range.value} className="filter-option">
                <input
                  type="radio"
                  name="salaryRange"
                  value={range.value}
                  checked={state.filters.salaryRange === range.value}
                  onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                  className="filter-radio"
                />
                <span className="filter-label">{range.label}</span>
                {state.filters.salaryRange === range.value && (
                  <FiCheck className="check-icon" aria-hidden="true" />
                )}
              </label>
            ))}
          </div>
        </FilterAccordion>
      </div>
    </aside>
  );
};

export default EnhancedFilterPanel;