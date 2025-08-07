import React from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../JobContext';
import { Job } from '../types';
import { FiBookmark, FiMapPin, FiDollarSign, FiClock, FiExternalLink } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { state, dispatch } = useJobs();
  const isSaved = state.savedJobs.some(savedJob => savedJob.id === job.id);

  const handleSaveToggle = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (isSaved) {
      dispatch({ type: 'UNSAVE_JOB', payload: job.id });
    } else {
      dispatch({ type: 'SAVE_JOB', payload: job });
    }
  };

  const handleCardClick = (): void => {
    dispatch({ type: 'SET_SELECTED_JOB', payload: job });
  };

  const calculateSkillMatch = (): number => {
    if (!state.user?.skills || state.user.skills.length === 0) return 0;
    
    const userSkills = state.user.skills.map(skill => skill.toLowerCase());
    const jobSkills = job.skills.map(skill => skill.toLowerCase());
    const matchingSkills = userSkills.filter(skill => 
      jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
    );
    
    return Math.round((matchingSkills.length / jobSkills.length) * 100);
  };

  const skillMatch = state.user ? calculateSkillMatch() : 0;

  return (
    <motion.div
      className="job-card"
      onClick={handleCardClick}
      whileHover={{ y: -4, boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {state.user && skillMatch > 0 && (
        <div className="skill-match-badge">
          <span className="match-percentage">{skillMatch}% Match</span>
        </div>
      )}
      <div className="job-card-header">
        <div className="company-info">
          <div className="company-logo">{job.companyLogo}</div>
          <div>
            <h3>{job.title}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>
        <button 
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveToggle}
          aria-label={isSaved ? 'Unsave job' : 'Save job'}
        >
          <FiBookmark />
        </button>
      </div>

      <div className="job-meta">
        <div className="meta-item">
          <FiMapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div className="meta-item">
          <FiDollarSign size={14} />
          <span>{job.salary}</span>
        </div>
        <div className="meta-item">
          <FiClock size={14} />
          <span>{formatDistanceToNow(new Date(job.postedDate))} ago</span>
        </div>
      </div>

      <p className="job-description">{job.description.substring(0, 120)}...</p>

      <div className="job-tags">
        <span className="job-type-tag">{job.type}</span>
        <span className="experience-tag">{job.experience}</span>
      </div>

      <div className="job-skills">
        {job.skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
        {job.skills.length > 3 && (
          <span className="skill-tag more">+{job.skills.length - 3} more</span>
        )}
      </div>

      <div className="job-actions">
        <button className="view-details-btn">
          View Details
        </button>
        <button 
          className="quick-apply-btn"
          onClick={(e) => {
            e.stopPropagation();
            window.open(job.applicationUrl, '_blank');
          }}
        >
          <FiExternalLink size={14} />
          Quick Apply
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;