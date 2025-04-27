import type { Project } from '../types';
import content from './content/portfolio-website.md?raw';

export const portfolioWebsite: Project = {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with SvelteKit.',
    content,
    technologies: ['SvelteKit', 'TypeScript'],
    date: '2024-04-10',
    tags: ['Web Development', 'Portfolio', 'Design'],
    githubUrl: 'https://github.com/minettebrink/portfolio'
}; 