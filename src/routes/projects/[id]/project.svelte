<script lang="ts">
    import { page } from '$app/stores';
    import { projects } from '$lib/data/projects';
    import { marked } from 'marked';
    
    // Get the project ID from the URL
    const projectId = $page.params.id;
    
    // Find the current project
    const project = projects.find(p => p.id === projectId);
    
    // Convert markdown content to HTML
    $: projectContent = project ? marked(project.content) : '';

    function scrollToProjects(event: MouseEvent) {
        event.preventDefault();
        window.location.href = '/#projects-section';
    }
</script>

<svelte:head>
    <title>{project ? project.title : 'Project Not Found'} - Minette Kaunismäki</title>
    <meta name="description" content={project ? project.description : 'Project not found'} />
</svelte:head>

<div class="layout">
    <div class="project-page">
        <nav class="home-link">
            <a href="/#projects-section">Projects</a>
        </nav>

        {#if project}
            <section class="project-section">
                <h1 class="name">{project.title}</h1>
                <div class="technologies">
                    {#each project.technologies as tech}
                        <span class="tech-tag">{tech}</span>
                    {/each}
                </div>
                
                <div class="project-meta">
                    <span class="date">{new Date(project.date).toLocaleDateString()}</span>
                    {#if project.tags}
                        <div class="tags">
                            {#each project.tags as tag}
                                <span class="tag">#{tag}</span>
                            {/each}
                        </div>
                    {/if}
                </div>

                <div class="content">
                    {@html projectContent}
                </div>

                <div class="project-links">
                    {#if project.githubUrl}
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="project-link">
                            View on GitHub
                        </a>
                    {/if}
                    {#if project.liveUrl}
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="project-link">
                            Live Demo
                        </a>
                    {/if}
                </div>
            </section>
        {:else}
            <section class="error-section">
                <h1 class="name">Project Not Found</h1>
                <p>The project you're looking for doesn't exist.</p>
                <a href="/#projects-section" class="back-link">Back to Projects</a>
            </section>
        {/if}
    </div>
</div>

<style>
    /* Base styles */
    :global(body) {
        margin: 0;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #000;
        background-color: #fff;
    }

    .layout {
        min-height: 100vh;
        position: relative;
        border: 1px solid black;
        margin: 2rem;
        padding: 0;
    }

    .project-page {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }

    .home-link {
        position: absolute;
        top: 6rem;
        right: 1rem;
    }

    .home-link a {
        color: #000;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 300;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .home-link a:hover {
        color: #666;
        transform: translateX(-10px);
    }

    section {
        margin-top: 2rem;
        padding: 0 12rem;
    }

    .name {
        font-size: 3rem;
        font-weight: 300;
        margin: 0;
        line-height: 1.2;
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

    .error-section {
        text-align: left;
    }

    .back-link {
        display: inline-block;
        margin-top: 2rem;
        color: #000;
        text-decoration: none;
        border-bottom: 1px solid #000;
        padding-bottom: 0.25rem;
        transition: all 0.3s ease;
    }

    .back-link:hover {
        color: #666;
        border-color: #666;
    }

    @media (max-width: 768px) {
        .project-page {
            padding: 3rem 1rem;
        }

        .name {
            font-size: 2.5rem;
        }
        
        section {
            padding: 0 2rem;
        }
    }

    .project-meta {
        margin: 1rem 0 2rem;
        color: #666;
        font-size: 0.9rem;
    }

    .date {
        margin-right: 1rem;
    }

    .tags {
        display: inline-flex;
        gap: 0.5rem;
    }

    .tag {
        color: #666;
        font-size: 0.9rem;
    }

    .content {
        margin-top: 2rem;
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
        gap: 1rem;
    }

    .project-link {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }

    .project-link:hover {
        background-color: #333;
    }

    @media (max-width: 768px) {
        .project-meta {
            flex-direction: column;
            gap: 0.5rem;
        }

        .project-links {
            flex-direction: column;
        }

        .project-link {
            text-align: center;
        }
    }

</style> 