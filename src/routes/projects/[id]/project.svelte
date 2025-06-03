<script lang="ts">
    import { page } from '$app/stores';
    import { projects } from '$lib/data/projects';
    import { marked } from 'marked';
    import { isDarkMode } from '$lib/stores/theme';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    // Get the project ID from the URL
    const projectId = $page.params.id;
    
    // Find the current project
    const project = projects.find(p => p.id === projectId);
    
    // Convert markdown content to HTML
    $: projectContent = project ? marked(project.content) : '';

    let showScrollArrow = false;
    let headings: { id: string; text: string; level: number }[] = [];
    let activeHeading = '';

    onMount(() => {
        // Extract headings from the content
        const contentDiv = document.querySelector('.content');
        if (contentDiv) {
            const headingElements = contentDiv.querySelectorAll('h1, h2');
            headings = Array.from(headingElements).map(heading => ({
                id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
                text: heading.textContent || '',
                level: parseInt(heading.tagName[1])
            }));

            // Add IDs to headings if they don't have them
            headingElements.forEach(heading => {
                if (!heading.id) {
                    heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
                }
            });

            // Set up intersection observer for headings
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            activeHeading = entry.target.id;
                        } else {
                            // Check if we're at the bottom of the page
                            const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 200;
                            if (isAtBottom) {
                                // Find the most visible heading near the bottom
                                const visibleHeadings = Array.from(headingElements).filter(heading => {
                                    const rect = heading.getBoundingClientRect();
                                    return rect.top <= window.innerHeight;
                                });
                                if (visibleHeadings.length > 0) {
                                    activeHeading = visibleHeadings[visibleHeadings.length - 1].id;
                                }
                            }
                            // Check if we're at the top of the page
                            const isAtTop = window.pageYOffset <= 100;
                            if (isAtTop) {
                                const firstHeading = headingElements[0];
                                if (firstHeading) {
                                    activeHeading = firstHeading.id;
                                }
                            }
                        }
                    });
                },
                {
                    rootMargin: '-10% 0px -40%',
                    threshold: [0, 0.1, 0.2, 0.5]
                }
            );

            headingElements.forEach(heading => observer.observe(heading));

            // Add scroll event listener for first and last sections
            window.addEventListener('scroll', () => {
                const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 200;
                const isAtTop = window.pageYOffset <= 100;

                if (isAtBottom) {
                    // Find the most visible heading near the bottom
                    const visibleHeadings = Array.from(headingElements).filter(heading => {
                        const rect = heading.getBoundingClientRect();
                        return rect.top <= window.innerHeight;
                    });
                    if (visibleHeadings.length > 0) {
                        activeHeading = visibleHeadings[visibleHeadings.length - 1].id;
                    }
                } else if (isAtTop) {
                    const firstHeading = headingElements[0];
                    if (firstHeading) {
                        activeHeading = firstHeading.id;
                    }
                }
            });
        }
    });

    function scrollToHeading(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function scrollToProjects(event: MouseEvent) {
        event.preventDefault();
        window.location.href = '/#projects-section';
    }

    function toggleDarkMode() {
        $isDarkMode = !$isDarkMode;
    }

    // Function to scroll smoothly to the top
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showScrollArrow = false;
    }

    // Function to handle scroll events
    function handleScroll() {
        // Show arrow when scrolled down more than 100px
        showScrollArrow = window.scrollY > 100;
    }

    // Add scroll event listener when component mounts
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
    }
</script>

<svelte:head>
    <title>{project ? project.title : 'Project Not Found'} - Minette Kaunismäki</title>
    <meta name="description" content={project ? project.description : 'Project not found'} />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<div class="layout" class:dark-mode={$isDarkMode}>
    <button class="theme-toggle" on:click={toggleDarkMode} aria-label="Toggle dark mode">
        <i class="fa-solid" class:fa-sun={$isDarkMode} class:fa-moon={!$isDarkMode}></i>
    </button>
    <div class="project-page">
        <nav class="home-link">
            <a href="/#projects-section">Back to<br>Projects</a>
        </nav>

        {#if project}
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

                <div class="content">
                    {@html projectContent}
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

            <nav class="table-of-contents" class:visible={headings.length > 0}>
                <ul>
                    {#each headings as heading}
                        <li class="toc-item level-{heading.level}" class:active={activeHeading === heading.id}>
                            <a 
                                href="#{heading.id}" 
                                on:click|preventDefault={() => scrollToHeading(heading.id)}
                            >
                                {heading.text}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        {:else}
            <section class="error-section">
                <h1 class="name">Project Not Found</h1>
                <p>The project you're looking for doesn't exist.</p>
                <a href="/#projects-section" class="back-link">Back to Projects</a>
            </section>
        {/if}
    </div>

    {#if showScrollArrow}
        <button 
            class="scroll-top-button" 
            on:click={scrollToTop} 
            aria-label="Scroll to top"
            transition:fade={{ duration: 800 }}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 14 106"
                width="14"
                height="106"
                fill="none" 
                stroke="currentColor" 
                stroke-width="1" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="arrow-svg"
            >
                <path d="M 7 105 L 7 1 M 0 11 L 7 1 L 14 11"></path>
            </svg>
        </button>
    {/if}
</div>

<style>
    /* Base styles */
    :global(body) {
        margin: 0;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #000;
        background-color: #fff;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    :global(html.dark-mode),
    :global(body.dark-mode) {
        background-color: #1a1a1a;
        color: #fff;
    }

    h1, h2, h3 {
        font-weight: 300;
        letter-spacing: -0.5px;
    }

    .name {
        font-size: 4rem;
        font-weight: 500;
        margin: 0;
        line-height: 1.2;
    }

    .content :global(h1), .content :global(h2), .content :global(h3) {
        scroll-margin-top: 100px;
    }

    .content :global(h1) {
        font-size: 3rem;
        margin: 2rem 0 1rem;
        font-weight: 300;
        letter-spacing: -0.5px;
    }

    .content :global(h2) {
        font-size: 2rem;
        margin: 1.5rem 0 1rem;
        font-weight: 300;
        letter-spacing: -0.5px;
    }

    .content :global(h3) {
        font-size: 1.5rem;
        margin: 1.5rem 0 1rem;
        font-weight: 300;
        letter-spacing: -0.5px;
    }

    .layout {
        min-height: 100vh;
        position: relative;
        border: 1px solid black;
        margin: 2rem;
        padding: 0;
        transition: border-color 0.3s ease, background-color 0.3s ease;
    }

    .layout.dark-mode {
        border-color: #fff;
        background-color: #1a1a1a;
    }

    .project-page {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }

    .home-link {
        position: fixed;
        top: 3rem;
        left: 4rem;
    }

    .home-link a {
        color: #000;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 300;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 2px;
        display: inline-block;
    }

    .home-link a:hover {
        color: #666;
        transform: translateX(20px);
    }

    .dark-mode .home-link a {
        color: #fff;
    }

    .dark-mode .home-link a:hover {
        color: #ccc;
    }

    section {
        margin-top: 2rem;
        padding: 0 12rem;
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

    .dark-mode .tech-tag {
        background-color: #2a2a2a;
        border-color: #333;
        color: #fff;
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

    .dark-mode .back-link {
        color: #fff;
        border-color: #fff;
    }

    .dark-mode .back-link:hover {
        color: #ccc;
        border-color: #ccc;
    }

    @media (max-width: 1000px) {
        .layout {
            margin: 0;
            border: none;
            background-color: #fff !important;
            color: #000 !important;
        }

        .theme-toggle {
            display: none !important;
        }

        .home-link {
            background-color: #fff !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
        }

        .home-link a {
            color: #000 !important;
        }

        .tech-tag {
            background-color: #f8f8f8 !important;
            border-color: #eee !important;
            color: #000 !important;
        }

        .project-link {
            color: #000 !important;
        }

        .project-link:hover {
            color: #666 !important;
        }

        .project-page {
            padding: 2rem 1rem;
        }

        .home-link {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            background-color: #fff;
            padding: 0.5rem 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transform: none;
            z-index: 1000;
            text-align: center;
        }

        .dark-mode .home-link {
            background-color: #1a1a1a;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .home-link a {
            font-size: 1rem;
            transform: none;
            display: inline-block;
        }

        .home-link a:hover {
            transform: none;
        }

        .home-link br {
            display: none;
        }

        .name {
            font-size: 2rem;
            margin-top: 1rem;
        }
        
        section {
            padding: 0;
            margin-top: 1rem;
        }

        .project-meta {
            margin: 0.5rem 0 1.5rem;
            font-size: 0.8rem;
        }

        .technologies {
            gap: 0.5rem;
            margin: 1.5rem 0;
        }

        .tech-tag {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }

        .content {
            margin-top: 1.5rem;
        }

        .content :global(h1) {
            font-size: 1.8rem;
            margin: 1.5rem 0 1rem;
        }

        .content :global(h2) {
            font-size: 1.3rem;
            margin: 1.2rem 0 0.8rem;
        }

        .content :global(p) {
            font-size: 0.95rem;
            margin: 0.8rem 0;
        }

        .content :global(ul), .content :global(ol) {
            padding-left: 1.5rem;
        }

        .project-links {
            margin-top: 2rem;
            justify-content: center;
            gap: 1.5rem;
        }

        .project-link {
            font-size: 1.8rem;
        }

        .scroll-top-button {
            display: none;
        }

        .table-of-contents {
            display: none;
        }

        .project-section {
            margin-left: 0;
        }
    }

    @media (max-width: 480px) {
        .name {
            font-size: 1.8rem;
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

    .project-meta {
        margin: 1rem 0 2rem;
        color: #666;
        font-size: 0.9rem;
    }

    .date {
        margin-right: 1rem;
    }

    .content {
        margin-top: 2rem;
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
            max-width: 100%;
            width: 100%;
        }
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

    .dark-mode .project-link {
        color: #fff;
    }

    .dark-mode .project-link:hover {
        color: #ccc;
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

        .scroll-top-button {
            display: none !important;
        }

        .scroll-top-button:hover {
            background-color: #f8f8f8;
            transform: translateY(-2px);
        }

        .dark-mode .scroll-top-button {
            background-color: #1a1a1a;
            color: #fff;
            border-color: #333;
        }

        .dark-mode .scroll-top-button:hover {
            background-color: #2a2a2a;
        }

        .scroll-top-button .arrow-svg {
            width: 18px;
            height: 18px;
            transform: rotate(0deg);
        }
    }

    /* Theme toggle button */
    .theme-toggle {
        position: fixed;
        top: 3rem;
        right: 2rem;
        background: #fff;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem 0rem;
        z-index: 1000;
        transition: color 0.3s ease, background-color 0.3s ease;
        transform: translateX(50%);
    }

    .dark-mode .theme-toggle {
        background: #1a1a1a;
    }

    .theme-toggle:hover {
        color: #666;
    }

    /* Scroll-to-top button styles */
    .scroll-top-button {
        position: fixed;
        top: 50%;
        right: 2rem;
        transform: translate(50%, -50%);
        background-color: #fff;
        color: black;
        border: none;
        border-radius: 0;
        width: auto;
        height: auto;
        padding: 20px 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        box-shadow: none;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .scroll-top-button:hover {
        background-color: #fff;
        color: #555;
    }

    .dark-mode .scroll-top-button {
        background-color: #1a1a1a;
        color: #fff;
    }

    .dark-mode .scroll-top-button:hover {
        background-color: #1a1a1a;
        color: #ccc;
    }

    .scroll-top-button .arrow-svg {
        display: block;
    }

    .table-of-contents {
        position: fixed;
        top: 55%;
        left: 4rem;
        transform: translateY(-50%);
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
        padding-top: 2rem;
    }

    .table-of-contents.visible {
        opacity: 1;
        transform: translateY(-50%);
    }

    .table-of-contents ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }

    .toc-item a {
        color: #000;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 300;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 2px;
        display: inline-block;
        opacity: 1;
    }

    .dark-mode .toc-item a {
        color: #fff;
    }

    .toc-item.active a {
        color: #666;
        transform: translateX(20px);
    }

    .toc-item a:hover {
        color: #666;
        transform: translateX(20px);
    }

    .dark-mode .toc-item a:hover,
    .dark-mode .toc-item.active a {
        color: #999;
    }

    .level-1 { font-size: 0.9rem; }
    .level-2 { font-size: 0.8rem; padding-left: 1rem; }
    .level-3 { font-size: 0.75rem; padding-left: 2rem; }

    @media (max-width: 1000px) {
        .table-of-contents {
            display: none;
        }
    }

    /* Adjust the main content area to make room for TOC */
    .project-section {
        margin-left: 15%;
        max-width: 800px;
    }

    @media (max-width: 1000px) {
        .project-section {
            margin-left: 0;
        }
    }

</style> 