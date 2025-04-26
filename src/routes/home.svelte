<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, slide } from 'svelte/transition';
    import { projects } from '$lib/data/projects';
    import { isDarkMode } from '$lib/stores/theme';
    
    let isMenuOpen = false;
    let name = '';
    let email = '';
    let message = '';
    let isSubmitting = false;
    let submitSuccess = false;
    let showScrollArrow = false;
    let isExperienceOpen = false;
    
    // Intersection Observer for animations
    let sections: HTMLElement[] = [];
    let menuElement: HTMLElement;
    let visibleSections: boolean[] = [false, false, false, false];
    let isMenuVisible = false;
    let isMenuFadedIn = false;
    
    function toggleDarkMode() {
        $isDarkMode = !$isDarkMode;
    }
    
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

<div class="layout" class:dark-mode={$isDarkMode}>
    <button class="theme-toggle" on:click={toggleDarkMode} aria-label="Toggle dark mode">
        <i class="fa-solid" class:fa-sun={$isDarkMode} class:fa-moon={!$isDarkMode}></i>
    </button>
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
                        <a href="https://github.com/minettebrink" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/minette-kaunism%C3%A4ki-8b138b166/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="https://x.com/MinetteKaum" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)"><i class="fab fa-x-twitter"></i></a>
                        <a href="https://www.youtube.com/@minettebrink557" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
        </section>

        <section id="about-section" class="about" bind:this={sections[1]} class:visible={visibleSections[1]}>
            <h2>About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>
                        Hi 👋🏼
                    </p>

                    <p>
                        I'm Minette, a Developer Advocate with a master's degree in both mathematics and pedagogy.
                    </p>

                    <p>
                        In the summer of 2024, I moved to Paris without knowing anyone in the city or the French, leaping into the unknown. I quit my job as a Data Scientist to carve a path that aligned more closely with my interests in AI and community building.
                    </p>

                    <p>
                        Out of that momentum, I became the city organiser of AI Tinkerers in Paris, a space for people to build and hack with AI. 
                    </p>

                    <ul>
                        <li>Expanded the community in Paris from 400 to 1,000 members (a 150% growth)</li>
                        <li>Organised 4 demo evenings showcasing cutting-edge projects</li>
                        <li>Hosted and organised a hackathon in partnership with Anthropic</li>
                        <li>Collaborated with 7 companies to drive innovation</li>
                        <li>Achieved an overall satisfaction score of 4.3/5 at all events</li>
                    </ul>

                    <p>
                        I enjoy making technical content understandable and approachable. 
                    </p>

                    <p>
                        Cheers!
                    </p>
                    <div 
                        class="experience-box" 
                        on:click={() => {
                            isExperienceOpen = !isExperienceOpen;
                            if (!isExperienceOpen) {
                                document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        role="button"
                        tabindex="0"
                        on:keydown={(e) => {
                            if (e.key === 'Enter') {
                                isExperienceOpen = !isExperienceOpen;
                                if (!isExperienceOpen) {
                                    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }
                        }}
                    >
                        <div class="experience-toggle">
                            <h3 class:invisible={isExperienceOpen}>Experience</h3>
                        </div>
                        {#if isExperienceOpen}
                            <div class="experience-content">
                                <div class="experience-item">
                                    <h3>Data Scientist</h3>
                                    <p class="company">Intrum</p>
                                    <p class="period">2023 - 2024</p>
                                    <ul>
                                        <li>Used machine learning models to predict credit risk</li>
                                        <li>Used LLMs to automatise business processes</li>
                                        <li>Part of the team to improve LMOPS </li>
                                    </ul>
                                </div>
                                <div class="experience-item">
                                    <h3>Graduate Analyste</h3>
                                    <p class="company">Intrum</p>
                                    <p class="period">2022 - 2023</p>
                                    <ul>
                                        <li>Used SQL to query and analyse investment portfolios </li>
                                        <li>Part of the project that predicts credit risk</li>
                                    </ul>
                                </div>
                                <div class="experience-item">
                                    <h3>E-learning Professional</h3>
                                    <p class="company">Metso</p>
                                    <p class="period">Summer 2018 & 2019</p>
                                    <ul>
                                        <li>Developed e-learning program for the finance department</li>
                                    </ul>
                                </div>
                                <div class="experience-item">
                                    <h3>MSc Applied Mathematics</h3>
                                    <p class="company">Åbo Akademi University </p>
                                    <p class="period">2019 - 2022</p>
                                </div>
                                <div class="experience-item">
                                    <h3>MSc Pedagogics</h3>
                                    <p class="company">Åbo Akademi University </p>
                                    <p class="period">2014 - 2020</p>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
                <div class="about-image">
                    <img src="/IMG_8607.gif" alt="Minette Kaunismäki" class="profile-image" />
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
                <p class="contact-intro">
                    If you want to get in touch, feel free to reach out:
                </p>
                
                <div class="contact-options">
                    <a href="mailto:minette.kaum@gmail.com" class="contact-option" aria-label="Email Minette">
                        <i class="fas fa-envelope"></i>
                    </a>
                    
                    <a href="https://www.linkedin.com/in/minette-kaunism%C3%A4ki-8b138b166/" target="_blank" rel="noopener noreferrer" class="contact-option" aria-label="Visit Minette's LinkedIn profile">
                        <i class="fab fa-linkedin"></i>
                    </a>
                </div>
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
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    :global(html) {
        background-color: #fff;
        transition: background-color 0.3s ease;
    }

    :global(html.dark-mode),
    :global(body.dark-mode) {
        background-color: #1a1a1a;
        color: #fff;
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

    /* Hero section */
    .hero {
        height: 100vh;
        display: flex;
        align-items: center;
        padding: 2rem;
        background-color: #fff;
        transition: background-color 0.3s ease;
        margin-bottom: 4rem;
    }

    .dark-mode .hero {
        background-color: #1a1a1a;
    }

    /* About section */
    .about {
        background-color: #fff;
        transition: background-color 0.3s ease;
        margin-bottom: 4rem;
    }

    .dark-mode .about {
        background-color: #1a1a1a;
    }

    /* Projects section */
    .projects {
        background-color: #fff;
        transition: background-color 0.3s ease;
        margin-bottom: 4rem;
    }

    .dark-mode .projects {
        background-color: #1a1a1a;
    }

    /* Contact section */
    .contact {
        background-color: #fff;
        transition: background-color 0.3s ease;
    }

    .dark-mode .contact {
        background-color: #1a1a1a;
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

    /* Dark mode styles */
    .dark-mode .menu-bar a {
        color: #fff;
    }

    .dark-mode .menu-bar a:hover {
        color: #ccc;
    }

    .dark-mode .title {
        color: #ccc;
    }

    .dark-mode .social-links a {
        color: #fff;
    }

    .dark-mode .social-links a:hover {
        color: #ccc;
    }

    .dark-mode .about-text p {
        color: #ccc;
    }

    .dark-mode .experience-box {
        background-color: #1a1a1a;
        border-color: #333;
    }

    .dark-mode .experience-box:hover {
        border-color: #fff;
    }

    .dark-mode .experience-item h3 {
        color: #fff;
    }

    .dark-mode .experience-item .company {
        color: #ccc;
    }

    .dark-mode .experience-item .period {
        color: #999;
    }

    .dark-mode .experience-item li {
        color: #ccc;
    }

    .dark-mode .project-card {
        background-color: #1a1a1a;
        border-color: #333;
    }

    .dark-mode .project-card:hover {
        border-color: #fff;
    }

    .dark-mode .project-card p {
        color: #ccc;
    }

    .dark-mode .tech-tag {
        background-color: #333;
        border-color: #444;
        color: #fff;
    }

    .dark-mode .scroll-top-button {
        background-color: #2a2a2a;
        color: #fff;
    }

    .dark-mode .scroll-top-button:hover {
        background-color: #333;
        color: #ccc;
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
        top: 45%;
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

    .hero-content {
        max-width: 1200px;
        margin: 0 0 0 10%;
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

    .about h2 {
        margin-left: 10%;
        margin-bottom: 2rem;
        font-size: 3rem;
    }

    .about-content {
        max-width: 1100px;
        margin: 0 0 0 10%;
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

    .experience-box {
        background-color: #fff;
        padding: 2.5rem;
        border-radius: 0;
        box-shadow: none;
        transition: all 0.4s ease;
        border: 1px solid #eee;
        max-width: 800px;
        margin-top: 2rem;
        position: relative;
        cursor: pointer;
    }

    .experience-box:hover {
        transform: translateY(-5px);
        border-color: #000;
    }

    .experience-toggle {
        background: none;
        border: none;
        color: inherit;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: left;
    }

    .experience-toggle h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 300;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        text-transform: none;
        transition: opacity 0.4s ease;
        height: 1.5rem;
        line-height: 1.5rem;
    }

    .experience-toggle h3.invisible {
        opacity: 0;
        height: 0;
        margin: 0;
    }

    .experience-content {
        position: relative;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease;
        margin-top: -2rem;
    }

    .experience-content:not(:empty) {
        max-height: 2000px;
    }

    .experience-item {
        margin-bottom: 3rem;
    }

    .experience-item:first-child {
        margin-top: 0;
    }

    .experience-item h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .experience-item .company {
        color: #666;
        line-height: 1.8;
        margin: 0 0 0.5rem 0;
    }

    .experience-item .period {
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

    .about-image {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 400;
        transform: translateX(0rem);
        margin-top: 2rem;
    }

    .profile-image {
        max-width: 300px;
        height: 350px;
        border-radius: 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        object-fit: cover;
    }

    .projects h2 {
        margin-left: 10%;
        margin-bottom: 2rem;
        font-size: 3rem;
    }

    .project-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        max-width: 800px;
        margin: 0 0 0 10%;
        padding-bottom: 4rem;
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

    .contact h2 {
        margin-left: 10%;
        margin-bottom: 2rem;
        font-size: 3rem;
    }

    .contact-content {
        max-width: 600px;
        margin: 0 0 0 10%;
        padding-bottom: 16rem;
    }

    .contact-intro {
        margin-bottom: 2rem;
        font-size: 1.2rem;
        line-height: 1.8;
        color: #333;
    }

    .contact-options {
        display: flex;
        gap: 2rem;
        margin-left: 0%;
        margin-top: 2rem;
    }

    .contact-option:first-child {
        margin-right: 0rem;
    }

    .contact-option:last-child {
        margin-left: 4rem;
    }

    .contact-option {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: inherit;
        font-size: 2rem;
        transition: all 0.3s ease;
    }

    .contact-option:hover {
        color: #666;
        transform: translateY(-2px);
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

        .contact-options {
            flex-direction: column;
            gap: 2rem;
        }

        .contact-option {
            width: 100%;
        }
    }

    .dark-mode .contact-intro {
        color: #ccc;
    }

</style> 