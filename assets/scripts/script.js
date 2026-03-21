    // Mobile Nav Button Functionality
    document.addEventListener("DOMContentLoaded", function () {
        const menuBtn = document.querySelector(".mobile-menu-btn");
        const mainNav = document.querySelector(".main-nav");

        if (menuBtn && mainNav) {
            menuBtn.addEventListener("click", function () {
                mainNav.classList.toggle("active");
            });
        }
    });
    
    
    // Wikipedia API

    // Help page search button
    const button = document.getElementById("searchButton");
    const input = document.getElementById("searchInput");

    // Button search
    button.addEventListener("click", function() {
            searchWikipedia();
    });

    // Return key search
    input.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchWikipedia();
        }
    });

    function searchWikipedia(term) {

    const searchTerm = term || document.getElementById("searchInput").value.trim();
    const resultBox = document.getElementById("result");

    // Prevent empty searches
    if (searchTerm === "") {
        resultBox.innerHTML= `
            <div class="feature-card">
                <p>Please type a word to search.</p>
            </div>`;
            return;
    }

    const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + searchTerm;

    // Request data from API
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Detect disambiguation pages
            if (data.type === "disambiguation") {
                searchWikipedia("computer " + searchTerm);
                return;
            }

            // Check if a definition exists
            if (data.extract) {

                resultBox.innerHTML = `
                    <div class="feature-card">
                        <h3>${data.title}</h3>
                        <p>${data.extract}</p>
                    </div>
                `;

            } else {

                // Error handling
                resultBox.innerHTML = `
                    <div class="feature-card">
                        <p>Sorry, we couldn't find an explanation for that word. Try another one.</p>
                    </div>
                `;

            }

        });

}



