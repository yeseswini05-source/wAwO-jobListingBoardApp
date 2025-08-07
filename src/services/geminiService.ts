import { GoogleGenerativeAI } from '@google/generative-ai';
import { Job, AIResponse } from '../types';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'your-api-key-here';
const genAI = new GoogleGenerativeAI(API_KEY);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  async generateJobInsights(job: Job): Promise<AIResponse> {
    const prompt = `
    As an expert career advisor, analyze this job posting and provide:
    
    Job Details:
    - Title: ${job.title}
    - Company: ${job.company}
    - Location: ${job.location}
    - Description: ${job.description}
    - Experience Level: ${job.experience}
    - Skills Required: ${job.skills.join(', ')}
    
    Please provide:
    1. 5 specific interview questions likely to be asked for this role
    2. 5 actionable application tips tailored to this position
    3. A professional cover letter template (200-250 words)
    
    Format as JSON:
    {
      "interviewQuestions": ["question1", "question2", ...],
      "applicationTips": ["tip1", "tip2", ...],
      "coverLetter": "cover letter text"
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Gemini API Error:', error);
      return {
        interviewQuestions: [
          'Tell me about yourself and your experience',
          'Why are you interested in this role?',
          'What are your greatest strengths?',
          'Describe a challenging project you worked on',
          'Where do you see yourself in 5 years?'
        ],
        applicationTips: [
          'Tailor your resume to match job requirements',
          'Research the company culture and values',
          'Prepare specific examples using STAR method',
          'Practice common interview questions',
          'Follow up within 24 hours after applying'
        ],
        coverLetter: 'Dear Hiring Manager, I am writing to express my strong interest in the position at your company. With my background and skills, I believe I would be a valuable addition to your team. I look forward to discussing how I can contribute to your organization.'
      };
    }
  }

  async generateCareerAdvice(userQuery: string): Promise<string> {
    const prompt = `
    You are an expert career advisor and interview coach. A job seeker is asking for help.
    
    User Question: "${userQuery}"
    
    Please provide helpful, actionable advice. If they're asking about:
    - Interview questions: Provide specific questions and how to answer them
    - Cover letters: Give templates and writing tips
    - Resume tips: Offer specific formatting and content advice
    - Salary negotiation: Provide negotiation strategies
    - Career advice: Give personalized guidance
    
    Keep your response conversational, helpful, and under 300 words. Use bullet points when appropriate.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Provide helpful fallback responses based on keywords
      const query = userQuery.toLowerCase();
      
      if (query.includes('interview')) {
        return `Here are some key interview tips:\n\n• Research the company thoroughly\n• Prepare STAR method examples\n• Practice common questions\n• Ask thoughtful questions about the role\n• Follow up within 24 hours\n\nWould you like me to help with specific interview questions for any particular role?`;
      }
      
      if (query.includes('cover letter')) {
        return `Here's a cover letter structure:\n\n• Opening: Mention the specific role and how you found it\n• Body: Highlight 2-3 relevant achievements\n• Closing: Express enthusiasm and next steps\n\nKeep it to one page and customize for each application. Would you like help writing one for a specific position?`;
      }
      
      if (query.includes('salary') || query.includes('negotiate')) {
        return `Salary negotiation tips:\n\n• Research market rates for your role\n• Wait for them to make the first offer\n• Consider the total compensation package\n• Be prepared to justify your ask\n• Stay professional and positive\n\nWhat specific aspect of salary negotiation would you like to discuss?`;
      }
      
      return `I'd be happy to help with your career question! I can assist with:\n\n• Interview preparation and questions\n• Cover letter writing\n• Resume optimization\n• Salary negotiation\n• Career planning\n\nCould you provide more details about what you'd like help with?`;
    }
  }
}