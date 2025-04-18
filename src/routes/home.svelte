<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    
    let isMenuOpen = false;
    let name = '';
    let email = '';
    let message = '';
    let isSubmitting = false;
    let submitSuccess = false;
    let showScrollArrow = false;
    
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
    
    // Intersection Observer for animations
    let sections: HTMLElement[] = [];
    let menuElement: HTMLElement;
    let visibleSections: boolean[] = [false, false, false, false];
    let isMenuVisible = false;
    let isMenuFadedIn = false;
    
    function scrollToSection(event: MouseEvent, sectionId: string) {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            showScrollArrow = true;
        }
    }
    
    async function handleSubmit() {
        isSubmitting = true;
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        submitSuccess = true;
        isSubmitting = false;
        
        // Reset form
        name = '';
        email = '';
        message = '';
        
        // Reset success message after 3 seconds
        setTimeout(() => {
            submitSuccess = false;
        }, 3000);
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
    
    onMount(() => {
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.target === menuElement) {
                        isMenuVisible = entry.isIntersecting;
                        isMenuFadedIn = true;
                    } else {
                        const index = sections.indexOf(entry.target as HTMLElement);
                        if (index !== -1) {
                            visibleSections[index] = entry.isIntersecting;
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        sections.forEach((section: HTMLElement) => observer.observe(section));
        if (menuElement) observer.observe(menuElement);
        
        return () => {
            // Clean up scroll event listener
            window.removeEventListener('scroll', handleScroll);
            sections.forEach((section: HTMLElement) => observer.unobserve(section));
            if (menuElement) observer.unobserve(menuElement);
        };
    });
</script>

<svelte:head>
    <title>My Personal Website</title>
    <meta name="description" content="Personal website" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
</svelte:head>

<div class="layout">
    <main class="main-content">
        <nav class="menu-bar" bind:this={menuElement} class:visible={isMenuFadedIn}>
            <ul>
                <li><a href="#about-section" on:click={(e) => scrollToSection(e, 'about-section')}>About</a></li>
                <li><a href="#projects-section" on:click={(e) => scrollToSection(e, 'projects-section')}>Projects</a></li>
                <li><a href="#contact-section" on:click={(e) => scrollToSection(e, 'contact-section')}>Contact</a></li>
            </ul>
        </nav>

        <section class="hero" bind:this={sections[0]} class:visible={visibleSections[0]}>
            <div class="hero-content">
                <div class="hero-left">
                    <h1 class="name">Minette Kaunismäki</h1>
                    <h2 class="title">Developer Advocate</h2>
                    
                    <div class="social-links">
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a>
                        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)"><i class="fab fa-x-twitter"></i></a>
                        <a href="https://youtube.com/@yourusername" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
        </section>

        <section id="about-section" class="about" bind:this={sections[1]} class:visible={visibleSections[1]}>
            <h2>About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>
                        Hello! I'm a web developer with a passion for creating beautiful and functional websites. 
                        I love learning new technologies and solving complex problems.
                    </p>
                    <div class="experience-content">
                        <div class="experience-item">
                            <h3>Developer Advocate</h3>
                            <p class="company">Company Name</p>
                            <p class="period">2023 - Present</p>
                            <ul>
                                <li>Led developer community engagement initiatives</li>
                                <li>Created technical content and documentation</li>
                                <li>Organized and spoke at developer events</li>
                            </ul>
                        </div>
                        <div class="experience-item">
                            <h3>Senior Developer</h3>
                            <p class="company">Previous Company</p>
                            <p class="period">2022 - 2023</p>
                            <ul>
                                <li>Led development of multiple web applications</li>
                                <li>Mentored junior developers</li>
                                <li>Implemented modern development practices</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <img src="/IMG_8607.jpg" alt="Minette Kaunismäki" class="profile-image" />
                </div>
            </div>
        </section>

        <section id="projects-section" class="projects" bind:this={sections[2]} class:visible={visibleSections[2]}>
            <h2>My Projects</h2>
            <div class="project-grid">
                {#each projects as project}
                    <a href="/projects/{project.id}" class="project-card">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div class="technologies">
                            {#each project.technologies as tech}
                                <span class="tech-tag">{tech}</span>
                            {/each}
                        </div>
                    </a>
                {/each}
            </div>
        </section>

        <section id="contact-section" class="contact" bind:this={sections[3]} class:visible={visibleSections[3]}>
            <h2>Contact Me</h2>
            <div class="contact-content">
                <form on:submit|preventDefault={handleSubmit}>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" bind:value={name} required />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" bind:value={email} required />
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" bind:value={message} required></textarea>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {#if isSubmitting}
                            Sending...
                        {:else}
                            Send Message
                        {/if}
                    </button>
                </form>
                {#if submitSuccess}
                    <div class="success-message" transition:fade>
                        Thank you for your message! I'll get back to you soon.
                    </div>
                {/if}
            </div>
        </section>
    </main>

    {#if isMenuVisible && showScrollArrow}
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
        scroll-behavior: smooth;
    }

    .layout {
        min-height: 100vh;
        position: relative;
        border: 1px solid black;
        margin: 2rem;
        padding: 0;
    }

    .main-content {
        padding: 0;
    }

    /* Menu styles */
    .menu-bar {
        position: fixed;
        top: 40%;
        right: 10%;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .menu-bar.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .menu-bar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: flex-end;
    }

    .menu-bar a {
        color: #000;
        text-decoration: none;
        font-size: 1.8rem;
        font-weight: 300;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 2px;
        display: inline-block;
    }

    .menu-bar a:hover {
        color: #666;
        transform: translateX(-20px);
    }

    /* Hero section */
    .hero {
        height: 100vh;
        display: flex;
        align-items: center;
        padding: 2rem;
        background-color: #fff;
    }

    .hero-content {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
    }

    .hero-left {
        flex: 1;
    }

    .name {
        font-size: 4rem;
        font-weight: 500;
        margin: 0;
        line-height: 1.2;
    }

    .title {
        font-size: 2.5rem;
        font-weight: 400;
        margin: 1rem 0;
        color: #666;
    }

    .social-links {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
    }

    .social-links a {
        color: #000;
        font-size: 2rem;
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .social-links a:hover {
        color: #666;
        transform: translateY(-2px);
    }

    section {
        padding: 4rem 0;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    section.visible {
        opacity: 1;
        transform: translateY(0);
    }

    h1, h2, h3 {
        font-weight: 300;
        letter-spacing: -0.5px;
    }

    /* About section */
    .about h2 {
        margin-left: 12rem;
        margin-bottom: 2rem;
        font-size: 3rem;
    }

    .about-content {
        max-width: 800px;
        margin: 0 0 0 12rem;
        display: flex;
        gap: 4rem;
        align-items: flex-start;
    }

    .about-text {
        flex: 1;
    }

    .about-text p {
        font-size: 1.2rem;
        line-height: 1.8;
        color: #333;
        margin-bottom: 2rem;
    }

    .experience-content {
        margin-top: 3rem;
    }

    .experience-item {
        margin-bottom: 3rem;
    }

    .experience-item:last-child {
        margin-bottom: 0;
    }

    .experience-item h3 {
        font-size: 1.4rem;
        margin: 0 0 0.5rem 0;
        font-weight: 500;
    }

    .experience-item .company {
        font-size: 1.1rem;
        color: #666;
        margin: 0 0 0.25rem 0;
    }

    .experience-item .period {
        font-size: 0.9rem;
        color: #999;
        margin: 0 0 1rem 0;
    }

    .experience-item ul {
        margin: 0;
        padding-left: 1.5rem;
    }

    .experience-item li {
        color: #333;
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }

    .experience-item li:last-child {
        margin-bottom: 0;
    }

    .about-image {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .profile-image {
        max-width: 300px;
        height: auto;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Projects section */
    .projects h2 {
        margin-left: 12rem;
        margin-bottom: 2rem;
        font-size: 3rem;
    }

    .project-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        max-width: 800px;
        margin: 0 0 0 12rem;
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

    /* Contact section */
    .contact h2 {
        margin-left: 12rem;
        margin-bottom: 2rem;
        font-size: 3rem;
    }

    .contact-content {
        max-width: 600px;
        margin: 0 0 0 12rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: #333;
    }

    input, textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        font-family: inherit;
    }

    textarea {
        min-height: 150px;
        resize: vertical;
    }

    button {
        background-color: #000;
        color: #fff;
        border: none;
        padding: 1rem 2rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #333;
    }

    button:disabled {
        background-color: #666;
        cursor: not-allowed;
    }

    .success-message {
        margin-top: 1rem;
        padding: 1rem;
        background-color: #e6ffe6;
        color: #006600;
        border-radius: 4px;
        text-align: center;
    }

    /* Scroll-to-top button styles */
    .scroll-top-button {
        position: fixed;
        top: 50%;
        right: 2rem;
        transform: translate(50%, -50%);
        background-color: white;
        color: black;
        border: none;
        border-radius: 0;
        width: auto;
        height: auto;
        padding: 10px 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        box-shadow: none;
    }

    .scroll-top-button:hover {
        background-color: white;
        color: #555;
    }

    .scroll-top-button .arrow-svg {
        display: block;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .hero {
            min-height: auto;
            padding: 4rem 1rem;
        }

        .hero-content {
            flex-direction: column;
            gap: 3rem;
        }

        .hero-left {
            text-align: center;
        }

        .menu-bar {
            position: static;
            transform: none;
            width: 100%;
            background-color: transparent;
            padding: 0;
        }

        .menu-bar ul {
            align-items: center;
        }

        .menu-bar a {
            font-size: 1.5rem;
        }

        .name {
            font-size: 3rem;
        }

        .title {
            font-size: 2rem;
        }

        .social-links {
            justify-content: center;
        }

        .about-content {
            flex-direction: column;
            gap: 2rem;
        }

        .about-image {
            order: -1;
        }

        .profile-image {
            max-width: 250px;
        }
    }
</style> 