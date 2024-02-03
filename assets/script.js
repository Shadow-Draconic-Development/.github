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

    // Calculate age dynamically based on June 13, 2001
    const birthDate = new Date('2001-06-01');
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    // Update about me text with dynamic age
    const aboutMe = document.getElementById('about-me');
    aboutMe.textContent = `I am a ${age} year old college student who is currently pursuing a Bachelor's Degree in Computer Science with a minor in Engineering. I enjoy writing content libraries because of how intuitive Avrae is and how I can make the lives of users easier with quality automation. While I do this for free, taking the time to donate a few dollars allows me to dedicate more time to these projects as I have a family that I have to help take care of on top of schooling and work.`;
};

document.addEventListener('DOMContentLoaded', function() {
    const completeRepositoriesList = document.getElementById('complete-repositories');
    const inProgressRepositoriesList = document.getElementById('in-progress-repositories');

    fetch('/assets/repositories.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(repo => {
          const lastUpdated = new Date(repo.pushed_at);
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          const formattedName = repo.name.replace('Avrae-', '').replace(/-/g, ' ');
          link.href = `https://github.com/${repo.owner}/${repo.name}`;
          link.textContent = `${formattedName} (Updated ${lastUpdated.toLocaleDateString()})`;
          listItem.appendChild(link);

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
