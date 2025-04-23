import { writable } from 'svelte/store';

// Initialize the store with the current dark mode state
const getInitialDarkMode = () => {
    if (typeof window !== 'undefined') {
        return document.documentElement.classList.contains('dark-mode');
    }
    return false;
};

export const isDarkMode = writable(getInitialDarkMode());

// Subscribe to changes and update the DOM
if (typeof window !== 'undefined') {
    isDarkMode.subscribe(value => {
        document.documentElement.classList.toggle('dark-mode', value);
        document.body.classList.toggle('dark-mode', value);
    });
} 