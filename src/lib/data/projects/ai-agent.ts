import type { Project } from '../types';
import content from './content/ai-agent.md?raw';

export const aiAgent: Project = {
    id: 'ai-agent',
    title: 'AI Agent',
    description: 'An intelligent agent that can perform tasks autonomously using AI.',
    content,
    technologies: ['Python', 'TensorFlow', 'Reinforcement Learning'],
    date: '2024-02-15',
    tags: ['AI', 'Machine Learning', 'Automation'],
    githubUrl: 'https://github.com/yourusername/ai-agent'
}; 