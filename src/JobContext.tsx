import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { JobState, JobAction } from './types';

interface JobContextType {
  state: JobState;
  dispatch: React.Dispatch<JobAction>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const jobReducer = (state: JobState, action: JobAction): JobState => {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };
    case 'SAVE_JOB':
      return {
        ...state,
        savedJobs: [...state.savedJobs, action.payload]
      };
    case 'UNSAVE_JOB':
      return {
        ...state,
        savedJobs: state.savedJobs.filter(job => job.id !== action.payload)
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_SELECTED_JOB':
      return { ...state, selectedJob: action.payload };
    case 'SET_AI_RESPONSE':
      return { ...state, aiResponse: action.payload };
    case 'SET_AI_LOADING':
      return { ...state, aiLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const initialState: JobState = {
  jobs: [],
  savedJobs: [],
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    jobType: '',
    experience: '',
    location: '',
    salaryRange: ''
  },
  sortBy: {
    field: 'postedDate',
    direction: 'desc'
  },
  selectedJob: null,
  aiResponse: null,
  aiLoading: false,
  user: null,
  isAuthenticated: false,
  currentPage: 'home'
};

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = (): JobContextType => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};