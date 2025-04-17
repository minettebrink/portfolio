<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    
    let isMenuOpen = false;
    
    // Intersection Observer for animations
    let sections: HTMLElement[] = [];
    let visibleSections: boolean[] = [false];
    
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
    <main class="main-content">
        <section class="hero" bind:this={sections[0]} class:visible={visibleSections[0]}>
            <div class="hero-content">
                <div class="hero-left">
                    <h1 class="name">Minette Kaunismäki</h1>
                    <h2 class="title">Developer Advocate</h2>
                    
                    <div class="social-links">
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a>
                        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                <nav class="menu-bar">
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
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
        min-height: 100vh;
    }

    .main-content {
        padding: 0;
    }

    /* Hero section */
    .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding: 2rem;
        background-color: #fff;
    }

    .hero-content {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4rem;
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

    /* Menu styles */
    .menu-bar {
        flex: 1;
        display: flex;
        justify-content: flex-end;
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
            width: 100%;
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
    }
</style> 