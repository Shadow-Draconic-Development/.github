function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // Update scrollbar colors based on dark mode
    updateScrollbarColors(body.classList.contains("dark-mode"));
}

function updateScrollbarColors(isDarkMode) {
    const scrollbarBgColor = isDarkMode ? "#333" : "#fff";
    const scrollbarThumbColor = isDarkMode ? "#888" : "#ccc";
    const scrollbarThumbHoverColor = isDarkMode ? "#555" : "#999";
    const scrollbarTrackColor = isDarkMode ? "#222" : "#f1f1f1";

    document.documentElement.style.setProperty("--scrollbar-bg-color", scrollbarBgColor);
    document.documentElement.style.setProperty("--scrollbar-thumb-color", scrollbarThumbColor);
    document.documentElement.style.setProperty("--scrollbar-thumb-hover-color", scrollbarThumbHoverColor);
    document.documentElement.style.setProperty("--scrollbar-track-color", scrollbarTrackColor);
}

// Check if system prefers dark mode initially
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
    document.body.classList.add("dark-mode");
    updateScrollbarColors(true);
}

window.onload = function() {
    if (typeof PatreonButton !== 'undefined' && PatreonButton !== null) {
        PatreonButton.init();
    }
};