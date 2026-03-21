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


