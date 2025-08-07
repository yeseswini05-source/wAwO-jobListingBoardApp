import React, { useState, useEffect } from 'react';
import { JobProvider, useJobs } from './JobContext';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import ResumeRatingPage from './components/ResumeRatingPage';
import UltimateHeader from './components/ui/UltimateHeader';
import UltimateJobList from './components/ui/UltimateJobList';
import SavedJobsList from './components/SavedJobsList';
import UltimateFilterPanel from './components/ui/UltimateFilterPanel';
import JobModal from './components/JobModal';
import AIChatbot from './components/AIChatbot';
import ParticleSystem from './components/ParticleSystem';
import LoadingScreen from './components/ui/LoadingScreen';
import { AnimatePresence, motion } from 'framer-motion';

const JobsPage: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    >
      <UltimateHeader />
    </motion.div>
    <div className="container">
      <motion.div 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <motion.div 
          className="left-sidebar"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <UltimateFilterPanel />
        </motion.div>
        <motion.div 
          className="center-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <UltimateJobList />
        </motion.div>
        <motion.div 
          className="right-sidebar"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <SavedJobsList />
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

const AppContent: React.FC = () => {
  const { state } = useJobs();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Extended loading time to showcase beautiful animation

    return () => clearTimeout(timer);
  }, []);

  const pageComponents = {
    home: HomePage,
    auth: AuthPage,
    profile: ProfilePage,
    'resume-rating': ResumeRatingPage,
    jobs: JobsPage
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 30 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 1.05, y: -30 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
  };

  const CurrentPageComponent = pageComponents[state.currentPage as keyof typeof pageComponents] || HomePage;

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="app-content"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ParticleSystem />
            <AnimatePresence mode="wait">
              <motion.div
                key={state.currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <CurrentPageComponent />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global Components - appear on all pages except loading */}
      {!isLoading && (
        <>
          <JobModal />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <AIChatbot />
          </motion.div>
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <JobProvider>
      <AppContent />
    </JobProvider>
  );
};

export default App;