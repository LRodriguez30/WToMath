document.addEventListener("DOMContentLoaded", () => {

    let navLinks = document.getElementById("nav-links");

    navLinks.style.fontSize = `${window.innerWidth / 25}px`;

    let resized = false;

    window.addEventListener("resize", () => {

        let sideNavbar = document.getElementById("side-navbar");
        let sideNavbarSpace = document.getElementById("side-navbar-space");
        let mathContainer = document.getElementById("mathContainer");
        
        if (window.innerWidth > 850 && !resized) {
            sideNavbar.style.width = `${window.innerWidth * 0.3}px`;
            sideNavbarSpace.style.width = `${window.innerWidth * 0.3}px`;
            mathContainer.style.width = `${window.innerWidth * 0.7}px`;
            
            navLinks.style.fontSize = `${window.innerWidth / 30}px`;
            resized = true;
        }
        else if (window.innerWidth < 851) {
            sideNavbar.style.width = "30vw";
            sideNavbarSpace.style.width = "30vw";

            navLinks.style.fontSize = `${window.innerWidth / 25}px`;
            mathContainer.style.width = "70vw";
            resized = false;
        }
    })
})