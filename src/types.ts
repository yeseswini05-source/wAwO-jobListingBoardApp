export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  skills: string[];
  postedDate: string;
  applicationUrl: string;
  companyLogo?: string;
  skillMatch?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  resume?: File;
  resumeText?: string;
  skills: string[];
  desiredRole?: string;
  experience: string;
  location: string;
}

export interface ResumeRating {
  overallScore: number;
  skillsScore: number;
  experienceScore: number;
  formatScore: number;
  suggestions: string[];
  roleSpecificScore?: number;
}

export interface AIResponse {
  interviewQuestions: string[];
  applicationTips: string[];
  coverLetter: string;
}

export interface FilterOptions {
  jobType: string;
  experience: string;
  location: string;
  salaryRange: string;
}

export interface SortOptions {
  field: 'title' | 'company' | 'postedDate' | 'salary';
  direction: 'asc' | 'desc';
}

export interface JobState {
  jobs: Job[];
  savedJobs: Job[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: FilterOptions;
  sortBy: SortOptions;
  selectedJob: Job | null;
  aiResponse: AIResponse | null;
  aiLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  currentPage: string;
}

export type JobAction =
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SAVE_JOB'; payload: Job }
  | { type: 'UNSAVE_JOB'; payload: number }
  | { type: 'SET_FILTERS'; payload: Partial<FilterOptions> }
  | { type: 'SET_SORT'; payload: SortOptions }
  | { type: 'SET_SELECTED_JOB'; payload: Job | null }
  | { type: 'SET_AI_RESPONSE'; payload: AIResponse | null }
  | { type: 'SET_AI_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_CURRENT_PAGE'; payload: string };