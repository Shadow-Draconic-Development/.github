function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle("dark-mode");

    // Update scrollbar colors based on dark mode
    updateScrollbarColors(isDarkMode);

    // Update Discord widget theme
    const discordWidget = document.querySelector("iframe[src^='https://discord.com/widget']");
    if (discordWidget) {
        const newSrc = discordWidget.src.replace(/theme=(\w+)/, `theme=${isDarkMode ? 'dark' : 'light'}`);
        discordWidget.src = newSrc;
    }
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

    const birthDate = new Date('2001-06-01');
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    // Update about me text with dynamic age
    const aboutMe = document.getElementById('about-me');
    aboutMe.textContent = `I am a ${age} year old college graduate with a Bachelor's Degree in Computer Science. I enjoy writing content libraries because of how intuitive Avrae is and how I can make the lives of users easier with quality automation. While I do this for free, taking the time to donate a few dollars allows me to dedicate more time to these projects as I have a family that I have to help take care of on top of work.`;
};

document.addEventListener('DOMContentLoaded', function() {
    const completeRepositoriesList = document.getElementById('complete-repositories');
    const inProgressRepositoriesList = document.getElementById('in-progress-repositories');

    fetch('https://raw.githubusercontent.com/Shadow-Draconic-Development/.github/main/assets/repositories.json')
        .then(response => response.json())
        .then(data => {
            // Sort the repositories alphabetically by name
            data.sort((a, b) => a.name.localeCompare(b.name));
            
            data.forEach(repo => {
                const lastUpdated = new Date(repo.pushed_at);
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                const formattedName = repo.name.replace('Avrae-', '').replace(/-/g, ' ');
                const options = { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false
                };
                const formattedDate = lastUpdated.toLocaleDateString(undefined, options);
                const formattedTime = lastUpdated.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false});
                const formattedDateTime = `${formattedDate}`; // Concatenate date and time
            
                link.href = `https://github.com/${repo.owner}/${repo.name}`;
                link.textContent = formattedName;
                listItem.appendChild(link);
            
                // Create a span element for the date and time, and apply a class to it
                const dateTimeSpan = document.createElement('span');
                dateTimeSpan.textContent = ` (Updated ${formattedDateTime})`; // Set concatenated date and time
                // Add a class to the span element to style it differently
                dateTimeSpan.classList.add('updated-date');
                dateTimeSpan.textContent = dateTimeSpan.textContent.replace("/,/g", "");

                listItem.appendChild(dateTimeSpan);
            
                // Append the list item to the appropriate list based on the repository status
                if (repo.status === 'complete') {
                    completeRepositoriesList.appendChild(listItem);
                } else if (repo.status === 'in-progress') {
                    inProgressRepositoriesList.appendChild(listItem);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching repository information:', error);
        });
});

