<script lang="ts">
    import { page } from '$app/stores';
    
    // Get the project ID from the URL
    const projectId = $page.params.id;
    
    // This would typically come from a database or API
    // For now, we'll use the same projects data from home.svelte
    const projects = [
        {
            id: 'video-generator',
            title: 'Video Generator',
            description: 'Description of your first project goes here.',
            technologies: ['Svelte', 'TypeScript', 'TailwindCSS']
        },
        {
            id: 'project-2',
            title: 'Project 2',
            description: 'Description of your second project goes here.',
            technologies: ['React', 'Node.js', 'MongoDB']
        },
        {
            id: 'project-3',
            title: 'Project 3',
            description: 'Description of your third project goes here.',
            technologies: ['Vue.js', 'Firebase', 'SCSS']
        }
    ];
    
    // Find the current project
    const project = projects.find(p => p.id === projectId);

    function scrollToProjects(event: MouseEvent) {
        event.preventDefault();
        window.location.href = '/#projects-section';
    }
</script>

<svelte:head>
    <title>{project ? project.title : 'Project Not Found'} - Minette Kaunismäki</title>
    <meta name="description" content={project ? project.description : 'Project not found'} />
</svelte:head>

<main>
    <nav class="menu-bar">
        <ul>
            <li><a href="/#projects-section" on:click={scrollToProjects}>Back to Projects</a></li>
        </ul>
    </nav>

    {#if project}
        <section class="project-section">
            <div class="container">
                <h1>{project.title}</h1>
                <div class="technologies">
                    {#each project.technologies as tech}
                        <span class="tech-tag">{tech}</span>
                    {/each}
                </div>
                <p class="description">{project.description}</p>
            </div>
        </section>
    {:else}
        <main class="error-page">
            <div class="container">
                <h1>Project Not Found</h1>
                <p>The project you're looking for doesn't exist.</p>
                <a href="/" class="back-link">Back to Home</a>
            </div>
        </main>
    {/if}
</main>

<style>
    /* Base styles */
    :global(body) {
        margin: 0;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #000;
        background-color: #fff;
    }

    main {
        overflow-x: hidden;
    }

    section {
        padding: 8rem 2rem;
    }

    h1, h2, h3 {
        font-weight: 300;
        letter-spacing: -0.5px;
    }

    /* Menu styles */
    .menu-bar {
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 1000;
    }

    .menu-bar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 2rem;
    }

    .menu-bar a {
        color: #000;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 300;
        transition: color 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .menu-bar a:hover {
        color: #666;
    }
    
    .project-page {
        padding: 4rem 2rem;
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    h1 {
        font-size: 3rem;
        margin-bottom: 2rem;
        font-weight: 500;
    }
    
    .technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 2rem;
    }
    
    .tech-tag {
        background-color: #f8f8f8;
        padding: 0.5rem 1rem;
        border-radius: 0;
        font-size: 0.875rem;
        border: 1px solid #eee;
    }
    
    .description {
        font-size: 1.2rem;
        line-height: 1.8;
        color: #333;
    }
    
    .error-page {
        padding: 4rem 2rem;
        text-align: center;
    }
    
    .back-link {
        display: inline-block;
        margin-top: 2rem;
        color: #000;
        text-decoration: none;
        border-bottom: 1px solid #000;
        padding-bottom: 0.25rem;
    }
    
    .back-link:hover {
        color: #666;
        border-color: #666;
    }
</style> 