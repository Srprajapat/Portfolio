/* style-switcher-toggler */
const styleswitchertoggle = document.querySelector(".style-switcher-toggler");
styleswitchertoggle.addEventListener("click", ()=>{
    document.querySelector(".style-switcher").classList.toggle("open");
})
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/* theme colors */
const alternatestyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color){
    alternatestyles.forEach((style) => {
        if (color === style.getAttribute('title')){
            style.removeAttribute("disabled");
        }
        else{
            style.setAttribute("disabled","true");
        }
    })
}

/* theme dark and light mode - automatic system preference with manual override */
const daynight = document.querySelector("#day-night");

// Function to apply theme
function applyTheme(isDark) {
    const icon = daynight.querySelector("i");

    if (isDark) {
        document.body.classList.add("dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        document.body.classList.remove("dark");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }

    // Store manual preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Function to get current theme state
function getCurrentTheme() {
    // Check if user has manually set a preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme === 'dark';
    }

    // Otherwise use system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Initialize theme on load
window.addEventListener("load", () => {
    const isDark = getCurrentTheme();
    applyTheme(isDark);
});

// Manual theme toggle
daynight.addEventListener("click", () => {
    const isCurrentlyDark = document.body.classList.contains("dark");
    applyTheme(!isCurrentlyDark);
});

// Listen for system theme changes (only if no manual preference is set)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
    }
});
