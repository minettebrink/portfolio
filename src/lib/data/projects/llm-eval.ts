import type { Project } from '../types';
import content from './content/llm-eval.md?raw';

export const llmEval: Project = {
    id: 'llm-eval',
    title: 'LLM Evaluation Framework',
    description: 'A framework for evaluating Large Language Models performance and capabilities.',
    content,
    technologies: ['Python', 'LLM APIs', 'Data Analysis'],
    date: '2024-03-01',
    tags: ['AI', 'Evaluation', 'Machine Learning'],
    githubUrl: 'https://github.com/yourusername/llm-eval'
}; 