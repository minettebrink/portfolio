import type { Project } from '../types';
import { videoGenerator } from './video-generator';
import { portfolioWebsite } from './portfolio-website';
import { coachAgent } from './coach-agent';


export const projects: Project[] = [
    videoGenerator,
    portfolioWebsite,
    coachAgent,
]; 