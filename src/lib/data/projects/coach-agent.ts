import type { Project } from '../types';
import content from './content/coach-agent.md?raw';

export const coachAgent: Project = {
    id: 'coach-agent',
    title: 'Coach Agent',
    description: 'A agent that uses data from a health tracking divice to give you a personalized healt tips.',
    content,
    technologies: ['API', 'OpenAI', 'Twilio','ngrok'],
    date: '2024-04-10',
    tags: ['Agent', 'Health', 'Twilio', 'ngrok'],
    githubUrl: 'https://github.com/minettekaum/mood_agent'
}; 