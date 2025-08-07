import React from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../../JobContext';
import { Job } from '../../types';
import { 
  FiBookmark, 
  FiMapPin, 
  FiDollarSign, 
  FiClock, 
  FiExternalLink,
  FiEye,
  FiTrendingUp
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

interface EnhancedJobCardProps {
  job: Job;
  viewMode?: 'grid' | 'list';
}

const EnhancedJobCard: React.FC<EnhancedJobCardProps> = ({ job, viewMode = 'grid' }) => {
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

  const handleQuickApply = (e: React.MouseEvent): void => {
    e.stopPropagation();
    window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
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
  const isNewJob = new Date(job.postedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <motion.article
      className={`enhanced-job-card ${viewMode}-view`}
      onClick={handleCardClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${job.title} at ${job.company}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Card Header */}
      <div className="card-header">
        <div className="company-info">
          <div className="company-logo" aria-hidden="true">
            {job.companyLogo?.startsWith('http') ? (
              <img 
                src={job.companyLogo} 
                alt={`${job.company} logo`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.textContent = job.company.charAt(0);
                }}
              />
            ) : (
              job.companyLogo || job.company.charAt(0)
            )}
          </div>
          <div className="job-title-section">
            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="status-badges">
          {isNewJob && (
            <span className="new-badge" aria-label="New job posting">
              NEW
            </span>
          )}
          {state.user && skillMatch > 0 && (
            <div className="skill-match-badge" aria-label={`${skillMatch}% skill match`}>
              <FiTrendingUp aria-hidden="true" />
              <span>{skillMatch}% Match</span>
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveToggle}
          aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
          aria-pressed={isSaved}
        >
          <FiBookmark aria-hidden="true" />
        </button>
      </div>

      {/* Job Meta Information */}
      <div className="job-meta">
        <div className="meta-item">
          <FiMapPin className="meta-icon" aria-hidden="true" />
          <span>{job.location}</span>
        </div>
        <div className="meta-item">
          <FiDollarSign className="meta-icon" aria-hidden="true" />
          <span>{job.salary}</span>
        </div>
        <div className="meta-item">
          <FiClock className="meta-icon" aria-hidden="true" />
          <span>{formatDistanceToNow(new Date(job.postedDate))} ago</span>
        </div>
      </div>

      {/* Job Description */}
      <p className="job-description">
        {job.description.length > 120 
          ? `${job.description.substring(0, 120)}...` 
          : job.description
        }
      </p>

      {/* Job Tags */}
      <div className="job-tags">
        <span className={`job-type-tag ${job.type.toLowerCase().replace('-', '')}`}>
          {job.type}
        </span>
        <span className={`experience-tag ${job.experience.toLowerCase()}`}>
          {job.experience}
        </span>
      </div>

      {/* Skills */}
      <div className="job-skills" role="list" aria-label="Required skills">
        {job.skills.slice(0, 4).map((skill, index) => (
          <span key={index} className="skill-tag" role="listitem">
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="skill-tag more" aria-label={`${job.skills.length - 4} more skills`}>
            +{job.skills.length - 4}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <button 
          className="view-details-btn"
          onClick={handleCardClick}
          aria-label={`View full details for ${job.title}`}
        >
          <FiEye aria-hidden="true" />
          <span>View Details</span>
        </button>
        <button 
          className="quick-apply-btn"
          onClick={handleQuickApply}
          aria-label={`Apply for ${job.title} at ${job.company}`}
        >
          <FiExternalLink aria-hidden="true" />
          <span>Quick Apply</span>
        </button>
      </div>

      {/* Hover Overlay */}
      <div className="card-overlay" aria-hidden="true" />
    </motion.article>
  );
};

export default EnhancedJobCard;