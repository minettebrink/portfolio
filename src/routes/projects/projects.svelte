<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';
    
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

    function navigateToProject(projectId: string) {
        goto(`/projects/${projectId}`);
    }
</script>

<svelte:head>
    <title>Projects - Minette Kaunismäki</title>
    <meta name="description" content="Projects by Minette Kaunismäki" />
</svelte:head>

<div class="projects-page">
    <nav class="home-link">
        <a href="/">Home</a>
    </nav>
    <section class="projects" in:fade>
        <h2>My Projects</h2>
        <div class="project-grid">
            {#each projects as project}
                <div class="project-card" on:click={() => navigateToProject(project.id)}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div class="technologies">
                        {#each project.technologies as tech}
                            <span class="tech-tag">{tech}</span>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </section>
</div>

<style>
    .projects-page {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }

    .home-link {
        position: absolute;
        top: 2rem;
        right: 2rem;
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

    .project-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        max-width: 800px;
        margin: 0 auto;
    }

    .project-card {
        background-color: #fff;
        padding: 2.5rem;
        border-radius: 0;
        box-shadow: none;
        transition: all 0.4s ease;
        border: 1px solid #eee;
        text-decoration: none;
        color: inherit;
        display: block;
        cursor: pointer;
    }

    .project-card:hover {
        transform: translateY(-5px);
        border-color: #000;
    }

    .project-card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .project-card p {
        color: #666;
        line-height: 1.8;
    }

    .technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    .tech-tag {
        background-color: #f8f8f8;
        padding: 0.5rem 1rem;
        border-radius: 0;
        font-size: 0.875rem;
        border: 1px solid #eee;
    }
</style> 