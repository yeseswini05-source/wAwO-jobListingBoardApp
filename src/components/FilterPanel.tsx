import React, { useCallback } from 'react';
import { useJobs } from '../JobContext';
import { FiFilter, FiChevronDown } from 'react-icons/fi';

const FilterPanel: React.FC = () => {
  const { state, dispatch } = useJobs();

  const handleFilterChange = useCallback((filterType: string, value: string): void => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { [filterType]: value }
    });
  }, [dispatch]);

  const handleSortChange = useCallback((field: string, direction: 'asc' | 'desc'): void => {
    dispatch({
      type: 'SET_SORT',
      payload: { field: field as any, direction }
    });
  }, [dispatch]);

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <FiFilter />
        <h3>Filters & Sort</h3>
      </div>
      
      <div className="filter-group">
        <label>Job Type</label>
        <select
          value={state.filters.jobType}
          onChange={(e) => handleFilterChange('jobType', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Experience Level</label>
        <select
          value={state.filters.experience}
          onChange={(e) => handleFilterChange('experience', e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="Entry">Entry Level</option>
          <option value="Mid">Mid Level</option>
          <option value="Senior">Senior Level</option>
          <option value="Lead">Lead Level</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Location</label>
        <select
          value={state.filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="San Francisco">San Francisco</option>
          <option value="New York">New York</option>
          <option value="Seattle">Seattle</option>
          <option value="Austin">Austin</option>
          <option value="Boston">Boston</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="Denver">Denver</option>
          <option value="Atlanta">Atlanta</option>
          <option value="Miami">Miami</option>
          <option value="Portland">Portland</option>
          <option value="Nashville">Nashville</option>
          <option value="London">London</option>
          <option value="Toronto">Toronto</option>
          <option value="Berlin">Berlin</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Salary Range</label>
        <select
          value={state.filters.salaryRange}
          onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
        >
          <option value="">All Salaries</option>
          <option value="0-80k">$0 - $80k</option>
          <option value="80k-120k">$80k - $120k</option>
          <option value="120k-160k">$120k - $160k</option>
          <option value="160k-200k">$160k - $200k</option>
          <option value="200k-300k">$200k - $300k</option>
          <option value="300k+">$300k+</option>
        </select>
      </div>

      <div className="sort-group">
        <label>Sort By</label>
        <div className="sort-controls">
          <select
            value={state.sortBy.field}
            onChange={(e) => handleSortChange(e.target.value, state.sortBy.direction)}
          >
            <option value="postedDate">Date Posted</option>
            <option value="title">Job Title</option>
            <option value="company">Company</option>
            <option value="salary">Salary</option>
          </select>
          <button
            className={`sort-direction ${state.sortBy.direction}`}
            onClick={() => handleSortChange(state.sortBy.field, state.sortBy.direction === 'asc' ? 'desc' : 'asc')}
          >
            <FiChevronDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;