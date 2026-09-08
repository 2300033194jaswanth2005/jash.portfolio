/* =========================================
   PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* AOS */
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80
        });
    }

    /* Typing effect */
    if (typeof Typed !== "undefined" && document.querySelector("#typing")) {
        new Typed("#typing", {
            strings: [
                "Full Stack Developer",
                "Software Engineering Enthusiast",
                "Java Developer",
                "Cloud & DevOps Learner"
            ],
            typeSpeed: 65,
            backSpeed: 35,
            backDelay: 1600,
            loop: true
        });
    }

    const header = document.querySelector("header");
    const progressBar = document.querySelector(".progress-bar");
    const scrollBtn = document.getElementById("scrollTop");
    const nav = document.getElementById("nav");
    const menuToggle = document.querySelector(".menu-toggle");
    const themeToggle = document.querySelector(".theme-toggle");

    /* Header + scroll progress + scroll-to-top */
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (progressBar) {
            progressBar.style.width =
                `${scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0}%`;
        }

        if (header) {
            header.classList.toggle("scrolled", scrollTop > 50);
        }

        if (scrollBtn) {
            scrollBtn.classList.toggle("show", scrollTop > 450);
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    /* Smooth navigation */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            if (nav) nav.classList.remove("show");
            if (menuToggle) {
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    /* Active navigation */
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll("nav a");

    const updateActiveNav = () => {
        let current = "home";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 180) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    };

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();

    /* Mobile menu */
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("show");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    /* Theme toggle */
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    const updateThemeIcon = () => {
        if (!themeToggle) return;

        themeToggle.innerHTML = document.body.classList.contains("light-mode")
            ? "<i class='fas fa-sun'></i>"
            : "<i class='fas fa-moon'></i>";
    };

    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            localStorage.setItem(
                "portfolio-theme",
                document.body.classList.contains("light-mode")
                    ? "light"
                    : "dark"
            );

            updateThemeIcon();
        });
    }

    /* Cursor glow */
    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {
        window.addEventListener("mousemove", event => {
            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;
        });
    }

    /* Hero image tilt */
    const imageBorder = document.querySelector(".image-border");

    if (imageBorder && window.matchMedia("(pointer:fine)").matches) {
        imageBorder.addEventListener("mousemove", event => {
            const rect = imageBorder.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX = -((y - rect.height / 2) / 28);
            const rotateY = (x - rect.width / 2) / 28;

            imageBorder.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        imageBorder.addEventListener("mouseleave", () => {
            imageBorder.style.transform = "";
        });
    }

    /* Project card glow */
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mousemove", event => {
            if (!window.matchMedia("(pointer:fine)").matches) return;

            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.background =
                `radial-gradient(circle at ${x}px ${y}px, rgba(250,204,21,.10), var(--card) 45%)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.background = "";
        });
    });

    /* Scroll to top */
    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* Keyboard shortcut: H = Home */
    document.addEventListener("keydown", event => {
        const activeTag = document.activeElement?.tagName?.toLowerCase();

        if (
            event.key.toLowerCase() === "h" &&
            activeTag !== "input" &&
            activeTag !== "textarea"
        ) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });

    /* Footer year */
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* Preloader */
    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");

        if (loader) {
            setTimeout(() => {
                loader.classList.add("hide");
            }, 350);
        }
    });
});
