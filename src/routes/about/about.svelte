<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
</script>

<svelte:head>
    <title>About Me - Minette Kaunismäki</title>
    <meta name="description" content="About Minette Kaunismäki" />
</svelte:head>

<div class="about-page">
    <nav class="home-link">
        <a href="/">Home</a>
    </nav>
    <section class="about" in:fade>
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
</div>

<style>
    .about-page {
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

    .about-content {
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

    @media (max-width: 768px) {
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