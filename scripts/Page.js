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
    const now = Date.now();

    Object.entries(repos).forEach(([placeholder, url]) => {
        const cacheKey = `star_count_${placeholder}`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));
        document.querySelectorAll('[data-placeholder="cache"').forEach(el => el.textContent = "")
        if (cachedData && now - cachedData.timestamp < 24 * 60 * 60 * 1000) {
            // Use cached data if it's less than 24 hours old
            document.querySelectorAll('[data-placeholder="cache"').forEach(el => {
                el.textContent = "Cache is still valid! ";
                what = document.createElement("a");
                el.appendChild(what);
                what.text = "What does this mean?"
                what.setAttribute("id", "whatButton")

                what.addEventListener("click", () => {
                    createCacheInfoModal()
                })
            })
            starCounts[placeholder] = cachedData.stars;
        } else {
            // Fetch fresh data from GitHub API
            if (localStorage.getItem("fetchGithubStarsEnabled") !== null)
                if (localStorage.getItem("fetchGithubStarsEnabled") === "true"){
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const stars = `${data.stargazers_count} stars`;
                    starCounts[placeholder] = stars;

                    // Store the result in localStorage with a timestamp
                    localStorage.setItem(cacheKey, JSON.stringify({ stars, timestamp: now }));
                })
                .catch(error => {
                    console.error('Error:', error);
                    starCounts[placeholder] = '0 stars';
                });
        }
        else{
            starCounts[placeholder] = 'Did not fetch!'
        }
    }
    });

    // Ensure the callback is called after all promises are resolved
    setTimeout(() => {
        callback(starCounts);
    }, 500);
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


function createCacheInfoModal() {
    // Create the overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = 1000; // Ensure it's on top of everything
    document.body.appendChild(overlay);

    // Create the modal container
    const modal = document.createElement('div');
    modal.style.color = "black";
    modal.style.position = 'absolute';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#fff';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    modal.style.zIndex = 1001; // Ensure it's on top of the overlay
    overlay.appendChild(modal);

    // Add explanation text to the modal
    const explanation = document.createElement('p');
    explanation.setAttribute("id", "224412345434")
    explanation.textContent = "This message indicates that the star count data is being fetched from the cache, meaning it's data stored locally on your device for quick access, and it's still valid. The data is stored for 24 hours before becoming invalid.";
    modal.appendChild(explanation);

    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 15px';
    closeButton.style.backgroundColor = '#007bff';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontFamily = "tf2build";
    closeButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    // dumb it down button
    const beginnerButton = document.createElement("button");
    beginnerButton.textContent = "huh?"
    beginnerButton.setAttribute("id", "huhButton")
    beginnerButton.style.marginTop = '20px';
    beginnerButton.style.padding = '10px 15px';
    beginnerButton.style.backgroundColor = '#007bff';
    beginnerButton.style.color = '#fff';
    beginnerButton.style.border = 'none';
    beginnerButton.style.borderRadius = '4px';
    beginnerButton.style.cursor = 'pointer';
    beginnerButton.style.fontFamily = "tf2build";
    beginnerButton.addEventListener("click", () => {
        document.getElementById("224412345434").innerHTML = `This message means that the star count data is being retrieved from a special storage area on your device called the "cache." The cache is like a temporary storage space that your device uses to save data it might need again soon. By storing this data locally on your device, it can be accessed much faster than if it had to be fetched from the internet every time.
<br><br>
In this case, the star count data has already been saved in the cache, so your device is using that stored data instead of downloading it again. This cached data is considered valid and can be used for up to 24 hours. After 24 hours, the data in the cache is no longer valid and will need to be refreshed by getting the latest information from the internet.
<br><br>
So, the message is just letting you know that your device is using this quicker method to get the data, and that the information is still up-to-date.
<br><br>
Also, sorry for dumbing it down this much.`
        modal.removeChild(document.getElementById("huhButton"));
        document.getElementById("224412345434").style.fontFamily = '"Arial", "Helvetica", sans-serif';
    })
    modal.appendChild(closeButton);
    modal.appendChild(beginnerButton);
}
