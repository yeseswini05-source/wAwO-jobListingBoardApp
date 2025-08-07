import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../../JobContext';
import { useDebounce } from '../../hooks/useDebounce';
import { Job } from '../../types';
import { realJobsData } from '../../data/jobsData';
import UltimateJobCard from './UltimateJobCard';
import { FiGrid, FiList, FiLoader, FiSearch } from 'react-icons/fi';

type ViewMode = 'grid' | 'list';

const UltimateJobList: React.FC = () => {
  const { state, dispatch } = useJobs();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const debouncedSearchTerm = useDebounce(state.searchTerm, 300);

  React.useEffect(() => {
    const loadJobs = (): void => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      setTimeout(() => {
        dispatch({ type: 'SET_JOBS', payload: realJobsData });
        dispatch({ type: 'SET_LOADING', payload: false });
      }, 1000);
    };

    if (state.jobs.length === 0) {
      loadJobs();
    }
  }, [dispatch, state.jobs.length]);

  const filteredAndSortedJobs = useMemo((): Job[] => {
    let jobs = [...state.jobs];

    if (debouncedSearchTerm) {
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    }

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

  const LoadingState: React.FC = () => (
    <motion.div 
      className="loading-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-content">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiLoader className="loading-icon" />
        </motion.div>
        <h3>Finding amazing opportunities...</h3>
        <p>Searching through thousands of jobs to find perfect matches.</p>
      </div>
    </motion.div>
  );

  const EmptyState: React.FC = () => (
    <motion.div 
      className="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="empty-content">
        <FiSearch className="empty-icon" />
        <h3>No jobs found</h3>
        <p>
          {debouncedSearchTerm 
            ? `No jobs match your search for "${debouncedSearchTerm}"`
            : "No jobs match your current filters"
          }
        </p>
      </div>
    </motion.div>
  );

  if (state.loading) {
    return <LoadingState />;
  }

  return (
    <section className="ultimate-job-list" role="main" aria-label="Job listings">
      <div className="list-header">
        <div className="results-info">
          <h2 className="results-count">
            {filteredAndSortedJobs.length} Job{filteredAndSortedJobs.length !== 1 ? 's' : ''} Found
          </h2>
          {debouncedSearchTerm && (
            <p className="search-info">
              Results for "{debouncedSearchTerm}"
            </p>
          )}
        </div>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <FiGrid />
            <span>Grid</span>
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <FiList />
            <span>List</span>
          </button>
        </div>
      </div>

      {filteredAndSortedJobs.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div 
          className={`jobs-container ${viewMode}-view`}
          layout
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedJobs.map((job, index) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
              >
                <UltimateJobCard job={job} viewMode={viewMode} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

export default UltimateJobList;