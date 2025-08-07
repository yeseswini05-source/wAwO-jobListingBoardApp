import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../JobContext';
import { FiUser, FiUpload, FiBriefcase, FiEdit3, FiSave } from 'react-icons/fi';

const ProfilePage: React.FC = () => {
  const { state, dispatch } = useJobs();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    location: state.user?.location || '',
    experience: state.user?.experience || '',
    desiredRole: state.user?.desiredRole || '',
    skills: state.user?.skills?.join(', ') || ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...state.user!,
      name: profileData.name,
      location: profileData.location,
      experience: profileData.experience,
      desiredRole: profileData.desiredRole,
      skills: profileData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    };

    dispatch({ type: 'SET_USER', payload: updatedUser });
    setIsEditing(false);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
          alert('Please upload a PDF or Word document.');
          return;
        }
        
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB.');
          return;
        }
        
        const updatedUser = {
          ...state.user!,
          resume: file,
          resumeText: 'Resume uploaded successfully' // In real app, would extract text
        };
        dispatch({ type: 'SET_USER', payload: updatedUser });
      } catch (error) {
        console.error('Error uploading resume:', error);
        alert('Error uploading resume. Please try again.');
      }
    }
  };

  const navigateToResumeRating = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'resume-rating' });
  };

  const navigateToJobs = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'jobs' });
  };

  return (
    <div className="profile-page">
      <div className="container">
        <motion.div
          className="profile-container glass-card"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        >
          <div className="card-glow"></div>
          <div className="profile-header">
            <div className="profile-avatar">
              <FiUser />
            </div>
            <div className="profile-info">
              <h1>{state.user?.name}</h1>
              <p>{state.user?.email}</p>
            </div>
            <button
              className="edit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <FiSave onClick={handleSave} /> : <FiEdit3 />}
            </button>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h2>Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <div className="form-group">
                  <label>Experience Level</label>
                  <select
                    name="experience"
                    value={profileData.experience}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Experience</option>
                    <option value="Entry">Entry Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior Level</option>
                    <option value="Lead">Lead Level</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Career Preferences</h2>
              <div className="form-group">
                <label>Desired Role</label>
                <input
                  type="text"
                  name="desiredRole"
                  value={profileData.desiredRole}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="e.g., Frontend Developer, Product Manager"
                />
              </div>
              <div className="form-group">
                <label>Skills (comma-separated)</label>
                <textarea
                  name="skills"
                  value={profileData.skills}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="e.g., React, TypeScript, Node.js, Python"
                  rows={3}
                />
              </div>
            </div>

            <div className="profile-section">
              <h2>Resume</h2>
              <div className="resume-section">
                <div className="resume-upload">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleResumeUpload}
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                  />
                  <button
                    className="upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiUpload />
                    {state.user?.resume ? 'Update Resume' : 'Upload Resume'}
                  </button>
                  {state.user?.resume && (
                    <p className="resume-status">✓ Resume uploaded</p>
                  )}
                </div>
                <div className="resume-actions">
                  <button
                    className="rate-resume-btn"
                    onClick={navigateToResumeRating}
                    disabled={!state.user?.resume}
                  >
                    Rate My Resume
                  </button>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="primary-btn" onClick={navigateToJobs}>
                <FiBriefcase />
                Browse Jobs
              </button>
              <button
                className="secondary-btn"
                onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'home' })}
              >
                Back to Home
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;