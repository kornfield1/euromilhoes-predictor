// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Alternar tema claro/escuro');
    themeToggle.innerHTML = '☀️';
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme based on saved preference or OS preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '🌙';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Update button icon
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
});
