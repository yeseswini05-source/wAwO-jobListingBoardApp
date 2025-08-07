import React, { useEffect, useMemo } from 'react';
import { useJobs } from '../JobContext';
import { useDebounce } from '../hooks/useDebounce';
import { Job } from '../types';
import { realJobsData } from '../data/jobsData';
import JobCard from './JobCard';

const JobList: React.FC = () => {
  const { state, dispatch } = useJobs();
  const debouncedSearchTerm = useDebounce(state.searchTerm, 300);

  useEffect(() => {
    const loadJobs = (): void => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API delay
      setTimeout(() => {
        dispatch({ type: 'SET_JOBS', payload: realJobsData });
        dispatch({ type: 'SET_LOADING', payload: false });
      }, 1000);
    };

    loadJobs();
  }, [dispatch]);

  const filteredAndSortedJobs = useMemo((): Job[] => {
    let jobs = [...state.jobs];

    // Apply search filter
    if (debouncedSearchTerm) {
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    }

    // Apply filters
    if (state.filters.jobType) {
      jobs = jobs.filter(job => job.type === state.filters.jobType);
    }
    if (state.filters.experience) {
      jobs = jobs.filter(job => job.experience === state.filters.experience);
    }
    if (state.filters.location) {
      jobs = jobs.filter(job => job.location.includes(state.filters.location));
    }
    if (state.filters.salaryRange) {
      jobs = jobs.filter(job => {
        const salary = parseInt(job.salary.replace(/[^\d]/g, ''));
        switch (state.filters.salaryRange) {
          case '0-80k': return salary < 80000;
          case '80k-120k': return salary >= 80000 && salary < 120000;
          case '120k-160k': return salary >= 120000 && salary < 160000;
          case '160k-200k': return salary >= 160000 && salary < 200000;
          case '200k-300k': return salary >= 200000 && salary < 300000;
          case '300k+': return salary >= 300000;
          default: return true;
        }
      });
    }

    // Apply sorting
    jobs.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (state.sortBy.field) {
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'company':
          aValue = a.company;
          bValue = b.company;
          break;
        case 'postedDate':
          aValue = new Date(a.postedDate);
          bValue = new Date(b.postedDate);
          break;
        case 'salary':
          aValue = parseInt(a.salary.replace(/[^\d]/g, ''));
          bValue = parseInt(b.salary.replace(/[^\d]/g, ''));
          break;
        default:
          return 0;
      }

      if (state.sortBy.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return jobs;
  }, [state.jobs, debouncedSearchTerm, state.filters, state.sortBy]);

  if (state.loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading premium job opportunities...</p>
      </div>
    );
  }

  if (state.error) {
    return <div className="error">Error: {state.error}</div>;
  }

  return (
    <div className="job-list">
      <div className="results-header">
        <h3>{filteredAndSortedJobs.length} Jobs Found</h3>
      </div>
      {filteredAndSortedJobs.length === 0 ? (
        <div className="no-results">
          <h4>No jobs match your criteria</h4>
          <p>Try adjusting your filters or search terms</p>
        </div>
      ) : (
        filteredAndSortedJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))
      )}
    </div>
  );
};

export default JobList;