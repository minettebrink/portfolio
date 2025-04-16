<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    
    let name = '';
    let email = '';
    let message = '';
    let isSubmitting = false;
    let submitSuccess = false;
    let isMenuOpen = false;
    
    const skills = [
        'Python',
        'CSS3',
        'JavaScript',
        'Svelte',
        'Node.js',
        'React',
        'TypeScript'
    ];
    
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

    function scrollToSection(event: MouseEvent, sectionId: string) {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = 80; // Adjust this value based on your menu height
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Intersection Observer for animations
    let sections: HTMLElement[] = [];
    let visibleSections: boolean[] = [false, false, false, false];
    
    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const index = sections.indexOf(entry.target as HTMLElement);
                    if (index !== -1) {
                        visibleSections[index] = entry.isIntersecting;
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        sections.forEach((section: HTMLElement) => observer.observe(section));
        
        return () => {
            sections.forEach((section: HTMLElement) => observer.unobserve(section));
        };
    });
</script>

<svelte:head>
    <title>My Personal Website</title>
    <meta name="description" content="Personal website" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
</svelte:head>

<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-content">
            <h1 class="name">Minette Kaunismäki</h1>
            <h2 class="title">Developer Advocate</h2>
            
            <nav class="menu-bar">
                <ul>
                    <li><a href="#about-section" on:click={(e) => scrollToSection(e, 'about-section')}>About</a></li>
                    <li><a href="#projects-section" on:click={(e) => scrollToSection(e, 'projects-section')}>Projects</a></li>
                    <li><a href="#contact-section" on:click={(e) => scrollToSection(e, 'contact-section')}>Contact</a></li>
                </ul>
            </nav>
            
            <div class="social-links">
                <a href="https://github.com/yourusername" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="https://linkedin.com/in/yourusername" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="https://twitter.com/yourusername" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            </div>
        </div>
    </aside>
    
    <main class="main-content">
        <section class="hero" bind:this={sections[0]} class:visible={visibleSections[0]}>
            <img src="/IMG_8607.jpg" alt="Minette Kaunismäki" class="hero-image" />
        </section>

        <section id="about-section" class="about" bind:this={sections[1]} class:visible={visibleSections[1]}>
            <h2>About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>
                        Hello! I'm a web developer with a passion for creating beautiful and functional websites. 
                        I love learning new technologies and solving complex problems.
                    </p>
                </div>
                <div class="skills">
                    <h3>Skills</h3>
                    <div class="skills-grid">
                        {#each skills as skill}
                            <div class="skill-item">{skill}</div>
                        {/each}
                    </div>
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
            <h2>Get in Touch</h2>
            <div class="contact-content">
                <form on:submit|preventDefault={handleSubmit}>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            bind:value={name}
                            required
                            placeholder="Your name"
                        />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            required
                            placeholder="Your email"
                        />
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea
                            id="message"
                            bind:value={message}
                            required
                            placeholder="Your message"
                        ></textarea>
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
        display: flex;
        min-height: 100vh;
    }

    /* Sidebar styles */
    .sidebar {
        width: 400px;
        position: fixed;
        height: 100vh;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #fff;
        border-right: 1px solid #eee;
    }

    .sidebar-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .name {
        font-size: 2.5rem;
        font-weight: 500;
        margin: 0;
        line-height: 1.2;
    }

    .title {
        font-size: 1.4rem;
        font-weight: 400;
        margin: 0;
        color: #666;
    }

    .location {
        font-size: 1.1rem;
        color: #999;
        margin: 0;
    }

    /* Menu styles */
    .menu-bar {
        margin-top: 3rem;
    }

    .menu-bar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .menu-bar a {
        color: #000;
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: 300;
        transition: color 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .menu-bar a:hover {
        color: #666;
    }

    .social-links {
        display: flex;
        gap: 2rem;
        margin-top: 3rem;
    }

    .social-links a {
        color: #000;
        font-size: 1.8rem;
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .social-links a:hover {
        color: #666;
        transform: translateY(-2px);
    }

    /* Main content styles */
    .main-content {
        flex: 1;
        margin-left: 400px;
        padding: 2rem;
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

    /* Hero section */
    .hero {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }

    .hero-image {
        max-width: 100%;
        max-height: 60vh;
        object-fit: cover;
    }

    /* About section */
    .about-content {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }

    .about-text p {
        font-size: 1.2rem;
        line-height: 1.8;
        color: #333;
        margin-bottom: 2rem;
    }

    .skills {
        width: 100%;
    }

    .skills h3 {
        margin-bottom: 2rem;
        font-size: 1.4rem;
    }

    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1.5rem;
    }

    .skill-item {
        background-color: #f8f8f8;
        padding: 0.75rem 1.5rem;
        border-radius: 0;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid #eee;
    }

    .skill-item:hover {
        transform: translateY(-3px);
        background-color: #000;
        color: #fff;
    }

    /* Projects section */
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
    .contact-content {
        max-width: 800px;
        margin: 0 auto;
    }

    .form-group {
        margin-bottom: 2rem;
    }

    label {
        display: block;
        margin-bottom: 0.75rem;
        font-weight: 400;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    input,
    textarea {
        width: 100%;
        padding: 1rem;
        border: 1px solid #eee;
        border-radius: 0;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    input:focus,
    textarea:focus {
        outline: none;
        border-color: #000;
    }

    textarea {
        min-height: 200px;
        resize: vertical;
    }

    button {
        background-color: #000;
        color: #fff;
        padding: 1rem 2rem;
        border: none;
        border-radius: 0;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    button:hover:not(:disabled) {
        background-color: #333;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .success-message {
        margin-top: 1.5rem;
        padding: 1.5rem;
        background-color: #f8f8f8;
        color: #000;
        border-radius: 0;
        text-align: center;
        border: 1px solid #eee;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .layout {
            flex-direction: column;
        }
        
        .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            padding: 2rem;
            border-right: none;
            border-bottom: 1px solid #eee;
        }
        
        .main-content {
            margin-left: 0;
            padding: 1rem;
        }
        
        .about-content {
            grid-template-columns: 1fr;
        }

        .hero-content h1 {
            font-size: 2.5rem;
        }

        .project-grid {
            grid-template-columns: 1fr;
        }
    }
</style> 