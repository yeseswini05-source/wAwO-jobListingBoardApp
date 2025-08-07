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
  FiTrendingUp,
  FiStar
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

interface UltimateJobCardProps {
  job: Job;
  viewMode?: 'grid' | 'list';
  index?: number;
}

const UltimateJobCard: React.FC<UltimateJobCardProps> = ({ 
  job, 
  viewMode = 'grid',
  index = 0 
}) => {
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
    console.log('Card clicked:', job.title);
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
  const isHotJob = skillMatch > 70;

  return (
    <motion.article
      className={`ultimate-job-card ${viewMode}-view ${isHotJob ? 'hot-job' : ''}`}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(102, 126, 234, 0.15)"
      }}
      whileTap={{ scale: 0.98 }}
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
      {/* Card Glow Effect */}
      <div className="card-glow" />
      
      {/* Hot Job Indicator */}
      {isHotJob && (
        <motion.div 
          className="hot-job-indicator"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <FiStar />
          <span>Hot Match</span>
        </motion.div>
      )}

      {/* Card Header */}
      <div className="card-header">
        <div className="company-info">
          <motion.div 
            className="company-logo"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
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
          </motion.div>
          <div className="job-title-section">
            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="status-badges">
          {isNewJob && (
            <motion.span 
              className="new-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              NEW
            </motion.span>
          )}
          {state.user && skillMatch > 0 && (
            <motion.div 
              className="skill-match-badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FiTrendingUp />
              <span>{skillMatch}% Match</span>
            </motion.div>
          )}
        </div>

        {/* Save Button */}
        <motion.button
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSaveToggle}
          aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
          aria-pressed={isSaved}
          whileHover={{ scale: 1.2, rotate: isSaved ? 0 : 15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <FiBookmark />
        </motion.button>
      </div>

      {/* Job Meta Information */}
      <div className="job-meta">
        <div className="meta-item">
          <FiMapPin className="meta-icon" />
          <span>{job.location}</span>
        </div>
        <div className="meta-item">
          <FiDollarSign className="meta-icon" />
          <span>{job.salary}</span>
        </div>
        <div className="meta-item">
          <FiClock className="meta-icon" />
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
        <motion.span 
          className={`job-type-tag ${job.type.toLowerCase().replace('-', '')}`}
          whileHover={{ scale: 1.05 }}
        >
          {job.type}
        </motion.span>
        <motion.span 
          className={`experience-tag ${job.experience.toLowerCase()}`}
          whileHover={{ scale: 1.05 }}
        >
          {job.experience}
        </motion.span>
      </div>

      {/* Skills */}
      <div className="job-skills">
        {job.skills.slice(0, 4).map((skill, skillIndex) => (
          <motion.span 
            key={skillIndex} 
            className="skill-tag"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * skillIndex }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(102, 126, 234, 0.2)" }}
          >
            {skill}
          </motion.span>
        ))}
        {job.skills.length > 4 && (
          <motion.span 
            className="skill-tag more"
            whileHover={{ scale: 1.1 }}
          >
            +{job.skills.length - 4}
          </motion.span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <motion.button 
          className="view-details-btn"
          onClick={handleCardClick}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(102, 126, 234, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          <FiEye />
          <span>Details</span>
        </motion.button>
        <motion.button 
          className="quick-apply-btn"
          onClick={handleQuickApply}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)" 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FiExternalLink />
          <span>Apply</span>
        </motion.button>
      </div>

      {/* Hover Overlay */}
      <motion.div 
        className="card-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
};

export default UltimateJobCard;