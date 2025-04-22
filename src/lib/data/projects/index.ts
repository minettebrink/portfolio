import type { Project } from '../types';
import { videoGenerator } from './video-generator';
import { portfolioWebsite } from './portfolio-website';
import { aiAgent } from './ai-agent';
import { llmEval } from './llm-eval';

export const projects: Project[] = [
    videoGenerator,
    portfolioWebsite,
    aiAgent,
    llmEval,
]; 