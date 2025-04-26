import type { Project } from '../types';
import content from './content/video-generator.md?raw';
import videoGeneratorImage from './assets/video-generator-assets/demo.png?url';
import graphImage from './assets/video-generator-assets/graph.png?url';
import frontendImage from './assets/video-generator-assets/instance_frontend.png?url';
import backendImage from './assets/video-generator-assets/instance_backend.png?url';
import videoDemo from './assets/video-generator-assets/generated-video.gif?url';
import variableFrontendImage from './assets/video-generator-assets/variable_frontend.png?url';
import variableBackendImage from './assets/video-generator-assets/variable_backend.png?url';
import startImage from './assets/video-generator-assets/start_image.png?url';
import serviceTypeImage from './assets/video-generator-assets/service_type.png?url';
import portFrontendImage from './assets/video-generator-assets/port_frontend.png?url';
import portBackendImage from './assets/video-generator-assets/port_backend.png?url';
import healthCheckBackendImage from './assets/video-generator-assets/health_check_backend.png?url';
import configureDeploymentSourceImage from './assets/video-generator-assets/configure_deployment_source.png?url';
import builderFrontendImage from './assets/video-generator-assets/builder_frontend.png?url';
import builderBackendImage from './assets/video-generator-assets/builder_backend.png?url';

export const videoGenerator: Project = {
    id: 'video-generator',
    title: 'Video Generator',
    description: 'An AI-powered video generation tool that creates engaging content automatically.',
    content,
    technologies: ['Svelte', 'TypeScript', 'APIs'],
    date: '2024-03-15',
    tags: ['AI', 'Video', 'Web Development'],
    image: videoGeneratorImage,
    images: [
        videoGeneratorImage,
        graphImage,
        frontendImage,
        backendImage,
        videoDemo,
        variableFrontendImage,
        variableBackendImage,
        startImage,
        serviceTypeImage,
        portFrontendImage,
        portBackendImage,
        healthCheckBackendImage,
        configureDeploymentSourceImage,
        builderFrontendImage,
        builderBackendImage
    ],
    githubUrl: 'https://github.com/minettebrink/image-to-video',
    liveUrl: 'https://youtu.be/eZfTr2Mq9d8'
}; 