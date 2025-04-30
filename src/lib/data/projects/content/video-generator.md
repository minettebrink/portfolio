# Image-to-Video Converter

<img src="/assets/video-generator-assets/demo.png" width="800" alt="demo">

## Introduction
This project started from a recruiting process. In this blog post, I'll tell you about how it was to build and about the highs and lows. If you want to know more about the technical part of the project, you can look at the GitHub repo.

I created a web application that transforms images into videos using [Lightricks LTX-video](https://huggingface.co/Lightricks/LTX-Video). For the frontend part, I used [SvelteKit](https://svelte.dev/docs/kit/introduction).

## The Technology Stack
When I started this project, I chose SvelteKit for the frontend because it's a well-working, renowned framework that I had used before. I could have chosen another framework as well, but in this project, I wanted to put my focus on the deployment. The framework's built-in routing and server-side rendering make it good for creating a responsive and interactive user interface.

For the backend, it was asked of me in the recruiting process to use [FastAPI](https://fastapi.tiangolo.com/), and I would most likely have chosen it myself. Its high performance and easy integration with AI models made it good for handling the complex video generation process. The automatic API documentation and Python async support were additional benefits.

The model used in the project is the LTX-Video model from Hugging Face. This model brings images to life with support for resolutions up to 720x1280 and can generate up to 257 frames per video. Its high-quality motion generation and flexible parameter customization options give users creative control over their videos.

## Key Features
The user interface I designed focuses on simplicity and intuitiveness. Users can easily upload their images, customize video parameters, preview their creations, and download the final videos. The interface guides users through the process while giving them enough control to achieve their desired results.

The backend processes image uploads, interfaces with the LTX-Video model, manages video generation, and handles file storage and delivery. This separation of concerns ensures a smooth user experience while maintaining robust performance.

The image I chose to use for the example: 

<img src="/assets/video-generator-assets/start_image.png" width="500" alt="Start Image">

And the video: 

<img src="/assets/video-generator-assets/generated-video.gif" width="500" alt="Video">



## Technical Implementation
I deployed the application on Koyeb, which offers both CPU and GPU instances. The deployment architecture includes separate services for the frontend and backend, using Docker-based deployment for consistency and scalability. Environment variable management and proper resource allocation ensure the application runs smoothly.

I did the development process step-by-step. I started by setting up the development environment, then moved on to implementing the frontend interface and creating the backend API. One of the more challenging tasks was the deployment - Koyeb was a new platform for me, but after playing around with it for a bit, it was easy to use.

## Future Enhancements
This project is launch-ready but it is not perfect. One of the more important things to fix is that if there are two or more requests at the same time, the backend might fail. This is because, for both videos, the file name would be `output.mp4`. This is fine for demonstration purposes but needs to be corrected for production.

There are also a lot of different parameters to change for the [LTX-video model](https://huggingface.co/docs/diffusers/main/en/api/pipelines/ltx_video). I chose the most common ones, but one could add more parameters for the user to control the values. I also chose a smaller version of the model for the simplicity of the project, but if one wants better videos, it's a good idea to choose a bigger model.

## Getting Started
If you're interested in trying out the project, it's easy to get started. Simply visit the GitHub repository or watch the tutorial video. Then follow the setup instructions, and you'll be able to create videos from your images. The documentation includes guides for both local development and deployment.

Feel free to check out the project repository and the technical tutorial for more details. I'd love to hear your thoughts and suggestions!
