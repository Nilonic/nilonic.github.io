document.addEventListener("DOMContentLoaded", () => {
    init();
});

function init() {
    // Initialize all necessary functions
    const state = {
        age: calculateAge("2005-08-19"),
        country: "the United Kingdom",
        stars: {}, // Object to hold stars for multiple repositories
    };

    const starRepos = {
        '[data-placeholder="neo_stars"]': 'https://api.github.com/repos/nilonic/neo',
        '[data-placeholder="mid_stars"]': 'https://api.github.com/repos/nilonic/FNF-Midnight-Engine',
    };

    fetchStars(starRepos, stars => {
        state.stars = stars;
        updateContent(state);
    });

    initializeNav();
}

function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
}

function updateContent({ age, country, stars }) {
    // Update specific elements with the calculated values
    document.querySelectorAll('[data-placeholder="age"]').forEach(el => el.textContent = age);
    document.querySelectorAll('[data-placeholder="country"]').forEach(el => el.textContent = country);
    Object.keys(stars).forEach(placeholder => {
        document.querySelectorAll(placeholder).forEach(el => el.textContent = stars[placeholder]);
    });
}

function fetchStars(repos, callback) {
    const starCounts = {};
    const promises = Object.entries(repos).map(([placeholder, url]) => {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                starCounts[placeholder] = `${data.stargazers_count} stars`;
            })
            .catch(error => {
                console.error('Error:', error);
                starCounts[placeholder] = '0 stars';
            });
    });

    Promise.all(promises).then(() => {
        callback(starCounts);
    });
}

function initializeNav() {
    // Set up navigation item event listeners
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('selected'));
            item.classList.add('selected');

            document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
            document.getElementById(item.getAttribute('data-section')).style.display = 'block';
        });
    });
    
    // Trigger click on the first item to show the default section
    document.querySelector('.nav-item').click();
}
    