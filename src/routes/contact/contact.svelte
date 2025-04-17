<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    
    let formData = {
        name: '',
        email: '',
        message: ''
    };
    
    function handleSubmit() {
        // Here you would typically handle the form submission
        console.log('Form submitted:', formData);
        // Reset form
        formData = {
            name: '',
            email: '',
            message: ''
        };
    }
</script>

<svelte:head>
    <title>Contact - Minette Kaunismäki</title>
    <meta name="description" content="Contact Minette Kaunismäki" />
</svelte:head>

<div class="contact-page">
    <nav class="home-link">
        <a href="/">Home</a>
    </nav>
    <section class="contact" in:fade>
        <h2>Get in Touch</h2>
        <div class="contact-content">
            <div class="contact-info">
                <p>I'm always interested in hearing about new projects and opportunities. Feel free to reach out!</p>
                <div class="social-links">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>
            
            <form on:submit|preventDefault={handleSubmit} class="contact-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        bind:value={formData.name} 
                        required
                    />
                </div>
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        bind:value={formData.email} 
                        required
                    />
                </div>
                
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea 
                        id="message" 
                        bind:value={formData.message} 
                        required
                    ></textarea>
                </div>
                
                <button type="submit">Send Message</button>
            </form>
        </div>
    </section>
</div>

<style>
    .contact-page {
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

    .contact-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 4rem;
        max-width: 800px;
        margin: 0 auto;
    }

    .contact-info {
        text-align: center;
    }

    .contact-info p {
        font-size: 1.2rem;
        line-height: 1.8;
        margin-bottom: 2rem;
    }

    .social-links {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .social-links a {
        color: #000;
        text-decoration: none;
        font-size: 1.1rem;
        transition: opacity 0.3s ease;
    }

    .social-links a:hover {
        opacity: 0.7;
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-size: 1rem;
        font-weight: 500;
    }

    input, textarea {
        padding: 0.75rem;
        border: 1px solid #eee;
        font-size: 1rem;
        width: 100%;
    }

    textarea {
        min-height: 150px;
        resize: vertical;
    }

    button {
        background-color: #000;
        color: #fff;
        padding: 1rem 2rem;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #333;
    }

    @media (min-width: 768px) {
        .contact-content {
            grid-template-columns: 1fr 1fr;
            align-items: start;
        }

        .contact-info {
            text-align: left;
        }

        .social-links {
            justify-content: flex-start;
        }
    }
</style> 