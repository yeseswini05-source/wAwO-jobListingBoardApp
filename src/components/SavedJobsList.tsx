import React from 'react';
import { useJobs } from '../JobContext';
import JobCard from './JobCard';

const SavedJobsList: React.FC = () => {
  const { state } = useJobs();

  return (
    <div className="saved-jobs">
      <h2>Saved Jobs ({state.savedJobs.length})</h2>
      {state.savedJobs.length === 0 ? (
        <p>No saved jobs yet</p>
      ) : (
        <div className="job-list">
          {state.savedJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsList;