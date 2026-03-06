    //Carousel functionality for the "Learn" page. This is a simple implementation that cycles through slides every 4.5 seconds, and allows manual navigation with buttons. It also pauses the auto-cycling when the user hovers over or focuses on the carousel, so they can read the content without it changing.
    document.addEventListener("DOMContentLoaded", function () {
        const track = document.getElementById("carouselTrack");
        const viewport = document.getElementById("carouselViewport");
        const prevBtn = document.querySelector(".carousel-btn.prev");
        const nextBtn = document.querySelector(".carousel-btn.next");

        if (!track || !viewport || !prevBtn || !nextBtn) return;

        const slides = Array.from(track.children);
        const slideCount = slides.length;

        let index = 0;
        let timerId = null;
        const intervalMs = 4500;

        // Keeps the slide index within the number of slides so the carousel loops
        function goToSlide(newIndex) {
            index = (newIndex + slideCount) % slideCount; 
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        function next() {
            goToSlide(index + 1);
        }

        function prev() {
            goToSlide(index - 1);
        }

        function startAuto() {
            stopAuto();
            timerId = setInterval(next, intervalMs);
        }

        function stopAuto() {
            if (timerId) clearInterval(timerId);
            timerId = null;
        }

        // Buttons
        nextBtn.addEventListener("click", function () {
            next();
            startAuto(); // reset timer so it feels responsive
        });

        prevBtn.addEventListener("click", function () {
            prev();
            startAuto();
        });

        // Pause on hover/focus so people can read for accessibility.
        viewport.addEventListener("mouseenter", stopAuto);
        viewport.addEventListener("mouseleave", startAuto);
        viewport.addEventListener("focusin", stopAuto);
        viewport.addEventListener("focusout", startAuto);

        // Start
        goToSlide(0);
        startAuto();
    });

    // Help page search button
    const button = document.getElementById("searchButton");
    const input = document.getElementById("searchInput");

    // Wikipedia API
    button.addEventListener("click", searchWikipedia);
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



