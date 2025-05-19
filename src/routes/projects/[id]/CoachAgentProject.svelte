<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import type { Project } from '$lib/data/types';
    import { marked } from 'marked';

    export let project: Project;

    // Split content into three parts
    $: contentParts = (marked(project.content) as string)
        .split('<h2>')
        .filter(Boolean)
        .map((part: string) => '<h2>' + part);
    $: currentPartIndex = 0;
    $: currentPart = contentParts[currentPartIndex];

    function nextPart() {
        if (currentPartIndex < contentParts.length - 1) {
            currentPartIndex++;
        }
    }

    function previousPart() {
        if (currentPartIndex > 0) {
            currentPartIndex--;
        }
    }
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

    <div class="content-navigation">
        <button 
            class="nav-button up-button" 
            on:click={previousPart} 
            disabled={currentPartIndex === 0}
            aria-label="Previous section"
        >
            <i class="fas fa-chevron-up"></i>
        </button>
        
        <div class="content">
            {#key currentPartIndex}
                <div in:fly={{ y: 20, duration: 400 }} out:fade={{ duration: 200 }}>
                    {@html currentPart}
                </div>
            {/key}
        </div>

        <button 
            class="nav-button down-button" 
            on:click={nextPart} 
            disabled={currentPartIndex === contentParts.length - 1}
            aria-label="Next section"
        >
            <i class="fas fa-chevron-down"></i>
        </button>
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
</section>

<style>
    .project-section {
        padding: 0 12rem;
    }

    .content-navigation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin: 2rem 0;
    }

    .nav-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 1rem;
        font-size: 1.5rem;
        color: #000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .up-button {
        margin-bottom: 1rem;
    }

    .down-button {
        margin-top: 1rem;
    }

    .nav-button:hover:not(:disabled) {
        color: #666;
        transform: scale(1.1);
    }

    .nav-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .content {
        flex: 1;
        padding: 0 12rem;
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
        .content {
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

        .project-link {
            font-size: 1.5rem;
        }
    }
</style> 