<script lang="ts">
    import type { Project } from '$lib/data/types';
    import { marked } from 'marked';

    export let project: Project;
</script>

<section class="project-section">
    <h1 class="name">{project.title}</h1>
    
    <div class="project-meta">
        <span class="date">{new Date(project.date).toLocaleDateString()}</span>
    </div>
    
    <div class="technologies">
        {#each project.technologies as tech}
            <span class="tech-tag">{tech}</span>
        {/each}
    </div>

    <div class="project-links">
        {#if project.githubUrl}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View project on GitHub">
                <i class="fab fa-github"></i>
            </a>
        {/if}
        {#if project.liveUrl}
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View project demo on YouTube">
                <i class="fab fa-youtube"></i>
            </a>
        {/if}
    </div>

    <div class="content">
        {@html marked(project.content)}
    </div>
</section>

<style>
    .project-section {
        margin-top: 2rem;
        padding: 0 12rem;
    }

    .content {
        flex: 1;
        padding: 4rem 0;
        width: 100%;
    }

    .content :global(img) {
        max-width: 100%;
        height: auto;
        width: 100%;
        display: block;
        margin: 2rem 0;
    }

    @media (min-width: 769px) {
        .content :global(img) {
            max-width: 500px;
            width: auto;
        }
    }

    .content :global(h1) {
        font-size: 2rem;
        margin: 2rem 0 1rem;
    }

    .content :global(h2) {
        font-size: 1.5rem;
        margin: 1.5rem 0 1rem;
    }

    .content :global(p) {
        margin: 1rem 0;
        line-height: 1.8;
    }

    .content :global(ul), .content :global(ol) {
        margin: 1rem 0;
        padding-left: 2rem;
    }

    .content :global(li) {
        margin: 0.5rem 0;
    }

    .project-links {
        margin-top: 3rem;
        display: flex;
        gap: 2rem;
    }

    .project-link {
        color: #000;
        font-size: 2rem;
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .project-link:hover {
        color: #666;
        transform: translateY(-2px);
    }

    .technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin: 2rem 0;
    }

    .tech-tag {
        background-color: #f8f8f8;
        padding: 0.5rem 1rem;
        border-radius: 0;
        font-size: 0.875rem;
        border: 1px solid #eee;
    }

    .name {
        font-size: 3rem;
        font-weight: 300;
        margin: 0;
        line-height: 1.2;
    }

    .project-meta {
        margin: 1rem 0 2rem;
        color: #666;
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .project-section {
            padding: 0;
        }

        .name {
            font-size: 2rem;
        }

        .content :global(h1) {
            font-size: 1.5rem;
        }

        .content :global(h2) {
            font-size: 1.2rem;
        }

        .content :global(p) {
            font-size: 0.9rem;
        }
    }
</style> 