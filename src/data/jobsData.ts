import { Job } from '../types';

const generateDailyJobs = (): Job[] => {
  const today = new Date();
  const jobs: Job[] = [];
  
  // Generate jobs for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Add 3-5 jobs per day
    const jobsPerDay = Math.floor(Math.random() * 3) + 3;
    for (let j = 0; j < jobsPerDay; j++) {
      jobs.push(...getDailyJobBatch(i * 10 + j, dateStr));
    }
  }
  
  return jobs.slice(0, 150); // Limit to 150 jobs
};

const getDailyJobBatch = (baseId: number, date: string): Job[] => {
  const companies = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com', url: 'https://www.linkedin.com/company/google/jobs/' },
    { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com', url: 'https://www.linkedin.com/company/meta/jobs/' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', url: 'https://www.linkedin.com/company/amazon/jobs/' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', url: 'https://www.linkedin.com/company/microsoft/jobs/' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com', url: 'https://www.linkedin.com/company/apple/jobs/' },
    { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com', url: 'https://www.linkedin.com/company/netflix/jobs/' },
    { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com', url: 'https://www.linkedin.com/company/tesla-motors/jobs/' },
    { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com', url: 'https://www.linkedin.com/company/spotify/jobs/' },
    { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com', url: 'https://www.linkedin.com/company/uber-com/jobs/' },
    { name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com', url: 'https://www.linkedin.com/company/airbnb/jobs/' },
    { name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com', url: 'https://www.linkedin.com/company/stripe/jobs/' },
    { name: 'Shopify', logo: 'https://logo.clearbit.com/shopify.com', url: 'https://www.linkedin.com/company/shopify/jobs/' },
    { name: 'Salesforce', logo: 'https://logo.clearbit.com/salesforce.com', url: 'https://www.linkedin.com/company/salesforce/jobs/' },
    { name: 'Adobe', logo: 'https://logo.clearbit.com/adobe.com', url: 'https://www.linkedin.com/company/adobe/jobs/' },
    { name: 'Intel', logo: 'https://logo.clearbit.com/intel.com', url: 'https://www.linkedin.com/company/intel-corporation/jobs/' },
    { name: 'NVIDIA', logo: 'https://logo.clearbit.com/nvidia.com', url: 'https://www.linkedin.com/company/nvidia/jobs/' },
    { name: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com', url: 'https://www.linkedin.com/company/oracle/jobs/' },
    { name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com', url: 'https://www.linkedin.com/company/ibm/jobs/' },
    { name: 'Cisco', logo: 'https://logo.clearbit.com/cisco.com', url: 'https://www.linkedin.com/company/cisco/jobs/' },
    { name: 'VMware', logo: 'https://logo.clearbit.com/vmware.com', url: 'https://www.linkedin.com/company/vmware/jobs/' },
    { name: 'Zoom', logo: 'https://logo.clearbit.com/zoom.us', url: 'https://www.linkedin.com/company/zoom/jobs/' },
    { name: 'Slack', logo: 'https://logo.clearbit.com/slack.com', url: 'https://www.linkedin.com/company/tiny-spec-inc/jobs/' },
    { name: 'Twitter', logo: 'https://logo.clearbit.com/twitter.com', url: 'https://www.linkedin.com/company/twitter/jobs/' },
    { name: 'LinkedIn', logo: 'https://logo.clearbit.com/linkedin.com', url: 'https://www.linkedin.com/company/linkedin/jobs/' },
    { name: 'GitHub', logo: 'https://logo.clearbit.com/github.com', url: 'https://www.linkedin.com/company/github/jobs/' },
    { name: 'Atlassian', logo: 'https://logo.clearbit.com/atlassian.com', url: 'https://www.linkedin.com/company/atlassian/jobs/' },
    { name: 'Dropbox', logo: 'https://logo.clearbit.com/dropbox.com', url: 'https://www.linkedin.com/company/dropbox/jobs/' },
    { name: 'Square', logo: 'https://logo.clearbit.com/squareup.com', url: 'https://www.linkedin.com/company/square/jobs/' },
    { name: 'PayPal', logo: 'https://logo.clearbit.com/paypal.com', url: 'https://www.linkedin.com/company/paypal/jobs/' },
    { name: 'eBay', logo: 'https://logo.clearbit.com/ebay.com', url: 'https://www.linkedin.com/company/ebay/jobs/' }
  ];

  const jobTitles = {
    'Entry': [
      'Junior Software Engineer', 'Frontend Developer', 'Backend Developer', 'QA Engineer',
      'Data Analyst', 'Marketing Coordinator', 'Sales Associate', 'Customer Success Associate',
      'Technical Writer', 'UI/UX Designer', 'Product Analyst', 'Business Analyst',
      'Software Developer', 'Web Developer', 'Mobile Developer', 'DevOps Engineer'
    ],
    'Mid': [
      'Software Engineer', 'Senior Developer', 'Full Stack Engineer', 'Product Manager',
      'Data Scientist', 'Marketing Manager', 'Sales Manager', 'Customer Success Manager',
      'Technical Lead', 'UX Designer', 'Product Designer', 'Business Intelligence Analyst',
      'Cloud Engineer', 'Security Engineer', 'Site Reliability Engineer', 'Solutions Architect'
    ],
    'Senior': [
      'Senior Software Engineer', 'Principal Engineer', 'Engineering Manager', 'Senior Product Manager',
      'Senior Data Scientist', 'Director of Marketing', 'Sales Director', 'VP of Customer Success',
      'Staff Engineer', 'Senior Designer', 'Design Manager', 'Senior Business Analyst',
      'Cloud Architect', 'Security Architect', 'Principal SRE', 'Distinguished Engineer'
    ],
    'Lead': [
      'Lead Engineer', 'Engineering Director', 'VP of Engineering', 'Chief Product Officer',
      'Chief Data Officer', 'Chief Marketing Officer', 'Chief Sales Officer', 'Chief Customer Officer',
      'CTO', 'Head of Design', 'VP of Product', 'Chief Business Officer',
      'Chief Architect', 'CISO', 'VP of Infrastructure', 'Chief Technology Officer'
    ]
  };

  const locations = [
    'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
    'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Atlanta, GA', 'Miami, FL',
    'Portland, OR', 'Nashville, TN', 'Raleigh, NC', 'Phoenix, AZ', 'Salt Lake City, UT',
    'Remote', 'London, UK', 'Toronto, Canada', 'Berlin, Germany', 'Amsterdam, Netherlands'
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
  const experienceLevels = ['Entry', 'Mid', 'Senior', 'Lead'] as const;

  const skillSets = {
    'Frontend': ['React', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Sass'],
    'Backend': ['Node.js', 'Python', 'Java', 'Go', 'Ruby', 'PHP', 'C#', 'Scala'],
    'Mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android', 'Xamarin'],
    'Data': ['Python', 'R', 'SQL', 'Spark', 'Hadoop', 'Tableau', 'PowerBI', 'Machine Learning'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Jenkins', 'Terraform', 'Ansible'],
    'Design': ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping', 'User Research'],
    'Product': ['Analytics', 'A/B Testing', 'SQL', 'Product Strategy', 'Roadmapping', 'Agile', 'Scrum'],
    'Marketing': ['Google Analytics', 'SEO', 'SEM', 'Social Media', 'Content Marketing', 'Email Marketing']
  };

  const salaryRanges = {
    'Entry': ['$60,000 - $90,000', '$70,000 - $100,000', '$80,000 - $110,000'],
    'Mid': ['$100,000 - $140,000', '$120,000 - $160,000', '$130,000 - $170,000'],
    'Senior': ['$150,000 - $200,000', '$160,000 - $220,000', '$180,000 - $250,000'],
    'Lead': ['$200,000 - $300,000', '$250,000 - $350,000', '$300,000 - $450,000']
  };

  const descriptions = {
    'Entry': [
      'Join our team as an entry-level professional and grow your career with mentorship and hands-on experience.',
      'Perfect opportunity for recent graduates to start their career in a supportive environment.',
      'Learn from industry experts while contributing to meaningful projects that impact millions of users.'
    ],
    'Mid': [
      'Take ownership of key features and collaborate with cross-functional teams to deliver exceptional products.',
      'Drive technical decisions and mentor junior team members while building scalable solutions.',
      'Work on challenging problems with cutting-edge technologies in a fast-paced environment.'
    ],
    'Senior': [
      'Lead complex projects and architect solutions that scale to millions of users worldwide.',
      'Shape technical strategy and drive innovation while mentoring the next generation of engineers.',
      'Own end-to-end delivery of critical features and influence product direction.'
    ],
    'Lead': [
      'Define technical vision and strategy for the organization while building world-class teams.',
      'Drive organizational change and establish engineering excellence across multiple teams.',
      'Partner with executive leadership to align technology strategy with business objectives.'
    ]
  };

  const company = companies[baseId % companies.length];
  const experienceLevel = experienceLevels[baseId % experienceLevels.length];
  const titles = jobTitles[experienceLevel];
  const title = titles[baseId % titles.length];
  const location = locations[baseId % locations.length];
  const jobType = jobTypes[baseId % jobTypes.length];
  const skillCategory = Object.keys(skillSets)[baseId % Object.keys(skillSets).length];
  const skills = skillSets[skillCategory as keyof typeof skillSets].slice(0, 5);
  const salary = salaryRanges[experienceLevel][baseId % salaryRanges[experienceLevel].length];
  const description = descriptions[experienceLevel][baseId % descriptions[experienceLevel].length];

  return [{
    id: baseId + 1000,
    title,
    company: company.name,
    location,
    description,
    salary,
    type: jobType as 'Full-time' | 'Part-time' | 'Contract' | 'Remote',
    experience: experienceLevel,
    skills,
    postedDate: date,
    applicationUrl: company.url,
    companyLogo: company.logo
  }];
};

export const realJobsData: Job[] = generateDailyJobs();