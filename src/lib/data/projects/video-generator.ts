import type { Project } from '../types';
import content from './content/video-generator.md?raw';

// Define image paths as strings instead of importing them directly
const videoGeneratorImage = '/assets/video-generator-assets/demo.png';
const videoDemo = '/assets/video-generator-assets/generated-video.gif';
const startImage = '/assets/video-generator-assets/start_image.png';

export const videoGenerator: Project = {
    id: 'video-generator',
    title: 'Video Generator',
    description: 'An AI-powered video generation tool that creates engaging content automatically.',
    content,
    technologies: ['Sveltekit', 'TypeScript', 'FastAPI', 'Ligthricks/LTX-Video'],
    date: '2024-03-15',
    tags: ['AI', 'Video', 'Web Development'],
    image: videoGeneratorImage,
    images: [
        videoGeneratorImage,
        videoDemo,
        startImage
    ],
    githubUrl: 'https://github.com/minettebrink/image-to-video',
    liveUrl: 'https://youtu.be/eZfTr2Mq9d8'
}; 