document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./project.json'); // Adjust the path if necessary
        const data = await response.json();
        document.getElementById('app-version').textContent = `${data.version}`;
    } catch (error) {
        console.error('Failed to load version information', error);
    }
});