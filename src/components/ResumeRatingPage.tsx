import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../JobContext';
import { GeminiService } from '../services/geminiService';
import { FiTrendingUp, FiFileText, FiTarget, FiArrowLeft } from 'react-icons/fi';
import { ResumeRating } from '../types';

const ResumeRatingPage: React.FC = () => {
  const { state, dispatch } = useJobs();
  const [ratingType, setRatingType] = useState<'general' | 'specific'>('general');
  const [specificRole, setSpecificRole] = useState('');
  const [rating, setRating] = useState<ResumeRating | null>(null);
  const [loading, setLoading] = useState(false);
  const geminiService = useMemo(() => new GeminiService(), []);

  const handleRateResume = async () => {
    if (!state.user?.resume) return;

    setLoading(true);
    try {
      const prompt = ratingType === 'general' 
        ? `Rate this resume on a scale of 1-100 for overall quality, skills presentation, experience description, and format. Provide specific improvement suggestions.`
        : `Rate this resume specifically for a ${specificRole} position. Focus on role-relevant skills, experience alignment, and how well it matches the job requirements.`;

      await geminiService.generateCareerAdvice(prompt);
      
      // Mock rating - in real app, would parse AI response
      const mockRating: ResumeRating = {
        overallScore: Math.floor(Math.random() * 30) + 70,
        skillsScore: Math.floor(Math.random() * 30) + 70,
        experienceScore: Math.floor(Math.random() * 30) + 70,
        formatScore: Math.floor(Math.random() * 30) + 70,
        suggestions: [
          'Add more quantifiable achievements',
          'Include relevant technical skills',
          'Improve formatting consistency',
          'Add action verbs to descriptions'
        ],
        roleSpecificScore: ratingType === 'specific' ? Math.floor(Math.random() * 30) + 70 : undefined
      };

      setRating(mockRating);
    } catch (error) {
      console.error('Error rating resume:', error);
    } finally {
      setLoading(false);
    }
  };



  const ScoreCircle = ({ score, label }: { score: number; label: string }) => (
    <div className="score-circle">
      <div className="circle-progress" style={{ '--score': score } as any}>
        <span className="score-value">{score}</span>
      </div>
      <p className="score-label">{label}</p>
    </div>
  );

  return (
    <div className="resume-rating-page">
      <div className="container">
        <motion.div
          className="rating-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rating-header">
            <button
              className="back-btn"
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'profile' })}
            >
              <FiArrowLeft /> Back to Profile
            </button>
            <h1>Resume Rating</h1>
            <p>Get AI-powered feedback on your resume</p>
          </div>

          {!rating ? (
            <div className="rating-options">
              <div className="option-cards">
                <motion.div
                  className={`option-card ${ratingType === 'general' ? 'active' : ''}`}
                  onClick={() => setRatingType('general')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="option-icon">
                    <FiFileText />
                  </div>
                  <h3>General Rating</h3>
                  <p>Overall resume quality assessment with general improvement suggestions</p>
                </motion.div>

                <motion.div
                  className={`option-card ${ratingType === 'specific' ? 'active' : ''}`}
                  onClick={() => setRatingType('specific')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="option-icon">
                    <FiTarget />
                  </div>
                  <h3>Role-Specific Rating</h3>
                  <p>Tailored assessment for specific job roles and requirements</p>
                </motion.div>
              </div>

              {ratingType === 'specific' && (
                <div className="role-input">
                  <label>Target Job Role</label>
                  <input
                    type="text"
                    value={specificRole}
                    onChange={(e) => setSpecificRole(e.target.value)}
                    placeholder="e.g., Frontend Developer, Product Manager"
                  />
                </div>
              )}

              <button
                className="rate-btn"
                onClick={handleRateResume}
                disabled={loading || !state.user?.resume || (ratingType === 'specific' && !specificRole)}
              >
                {loading ? 'Analyzing Resume...' : 'Rate My Resume'}
              </button>
            </div>
          ) : (
            <div className="rating-results">
              <div className="scores-section">
                <h2>Your Resume Score</h2>
                <div className="scores-grid">
                  <ScoreCircle score={rating.overallScore} label="Overall" />
                  <ScoreCircle score={rating.skillsScore} label="Skills" />
                  <ScoreCircle score={rating.experienceScore} label="Experience" />
                  <ScoreCircle score={rating.formatScore} label="Format" />
                  {rating.roleSpecificScore && (
                    <ScoreCircle score={rating.roleSpecificScore} label="Role Match" />
                  )}
                </div>
              </div>

              <div className="suggestions-section">
                <h3>Improvement Suggestions</h3>
                <ul className="suggestions-list">
                  {rating.suggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <FiTrendingUp />
                      {suggestion}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="rating-actions">
                <button
                  className="secondary-btn"
                  onClick={() => setRating(null)}
                >
                  Rate Again
                </button>
                <button
                  className="primary-btn"
                  onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'jobs' })}
                >
                  Browse Jobs
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeRatingPage;