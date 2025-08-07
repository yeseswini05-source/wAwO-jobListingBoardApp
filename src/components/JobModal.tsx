import React, { useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../JobContext';
import { GeminiService } from '../services/geminiService';
import { FiX, FiExternalLink, FiBookmark, FiClock, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

const JobModal: React.FC = () => {
  const { state, dispatch } = useJobs();
  const geminiService = useMemo(() => new GeminiService(), []);

  const closeModal = (): void => {
    console.log('Closing modal');
    dispatch({ type: 'SET_SELECTED_JOB', payload: null });
    dispatch({ type: 'SET_AI_RESPONSE', payload: null });
  };

  const generateAIInsights = useCallback(async (): Promise<void> => {
    if (!state.selectedJob) return;
    
    dispatch({ type: 'SET_AI_LOADING', payload: true });
    try {
      const insights = await geminiService.generateJobInsights(state.selectedJob);
      dispatch({ type: 'SET_AI_RESPONSE', payload: insights });
    } catch (error) {
      console.error('Failed to generate AI insights:', error);
    } finally {
      dispatch({ type: 'SET_AI_LOADING', payload: false });
    }
  }, [state.selectedJob, geminiService, dispatch]);

  useEffect(() => {
    if (state.selectedJob && !state.aiResponse && !state.aiLoading) {
      generateAIInsights();
    }
  }, [state.selectedJob, state.aiResponse, state.aiLoading, generateAIInsights]);

  if (!state.selectedJob) {
    console.log('No selected job, modal not rendering');
    return null;
  }
  
  console.log('Rendering modal for job:', state.selectedJob.title);

  const job = state.selectedJob;
  const isSaved = state.savedJobs.some(savedJob => savedJob.id === job.id);

  const handleSaveToggle = (): void => {
    if (isSaved) {
      dispatch({ type: 'UNSAVE_JOB', payload: job.id });
    } else {
      dispatch({ type: 'SAVE_JOB', payload: job });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div
          className="job-modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="job-header-info">
              <div className="company-logo">{job.companyLogo}</div>
              <div>
                <h2>{job.title}</h2>
                <h3>{job.company}</h3>
              </div>
            </div>
            <button className="close-btn" onClick={closeModal}>
              <FiX />
            </button>
          </div>

          <div className="job-meta">
            <div className="meta-item">
              <FiMapPin />
              <span>{job.location}</span>
            </div>
            <div className="meta-item">
              <FiDollarSign />
              <span>{job.salary}</span>
            </div>
            <div className="meta-item">
              <FiClock />
              <span>{formatDistanceToNow(new Date(job.postedDate))} ago</span>
            </div>
          </div>

          <div className="job-details">
            <div className="job-type-badge">{job.type}</div>
            <div className="experience-badge">{job.experience}</div>
          </div>

          <div className="job-description">
            <h4>Job Description</h4>
            <p>{job.description}</p>
          </div>

          <div className="job-skills">
            <h4>Required Skills</h4>
            <div className="skills-list">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button className="apply-btn" onClick={() => window.open(job.applicationUrl, '_blank')}>
              <FiExternalLink />
              Apply Now
            </button>
            <button 
              className={`save-btn ${isSaved ? 'saved' : ''}`}
              onClick={handleSaveToggle}
            >
              <FiBookmark />
              {isSaved ? 'Saved' : 'Save Job'}
            </button>
          </div>

          {state.aiLoading && (
            <div className="ai-loading">
              <div className="loading-spinner"></div>
              <p>Generating AI insights...</p>
            </div>
          )}

          {state.aiResponse && (
            <div className="ai-insights">
              <h4>🤖 AI-Powered Career Insights</h4>
              
              <div className="insight-section">
                <h5>Interview Questions</h5>
                <ul>
                  {state.aiResponse.interviewQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>

              <div className="insight-section">
                <h5>Application Tips</h5>
                <ul>
                  {state.aiResponse.applicationTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="insight-section">
                <h5>Cover Letter Template</h5>
                <div className="cover-letter">
                  {state.aiResponse.coverLetter}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobModal;