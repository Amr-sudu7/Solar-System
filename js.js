/* =========================================================
   SOLAR SYSTEM JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const solarSystem = document.querySelector(".solar-system");

  if (!solarSystem) {
    console.error("Solar system container was not found.");
    return;
  }

  /* =====================================================
       PLANET DATA
       ===================================================== */

  const planets = [
    {
      selector: ".mercury",
      name: "Mercury",
    },
    {
      selector: ".venus",
      name: "Venus",
    },
    {
      selector: ".earth",
      name: "Earth",
    },
    {
      selector: ".mars",
      name: "Mars",
    },
    {
      selector: ".jupiter",
      name: "Jupiter",
    },
    {
      selector: ".saturn",
      name: "Saturn",
    },
    {
      selector: ".uranus",
      name: "Uranus",
    },
    {
      selector: ".neptune",
      name: "Neptune",
    },
  ];

  /* =====================================================
       PLANET HOVER EFFECT
       ===================================================== */

  planets.forEach((planetData) => {
    const planet = document.querySelector(planetData.selector);

    if (!planet) return;

    planet.addEventListener("mouseenter", () => {
      planet.classList.add("planet-hover");
    });

    planet.addEventListener("mouseleave", () => {
      planet.classList.remove("planet-hover");
    });

    planet.addEventListener("focus", () => {
      planet.classList.add("planet-hover");
    });

    planet.addEventListener("blur", () => {
      planet.classList.remove("planet-hover");
    });
  });

  /* =====================================================
       SUN
       ===================================================== */

  const sun = document.querySelector(".sun");

  if (sun) {
    sun.setAttribute("role", "link");
    sun.setAttribute("tabindex", "0");
    sun.setAttribute("aria-label", "Explore the Sun on NASA");

    const sunURL = "https://science.nasa.gov/sun/";

    const openSun = () => {
      window.open(sunURL, "_blank", "noopener,noreferrer");
    };

    sun.addEventListener("click", openSun);

    sun.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSun();
      }
    });

    sun.addEventListener("mouseenter", () => {
      sun.classList.add("sun-hover");
    });

    sun.addEventListener("mouseleave", () => {
      sun.classList.remove("sun-hover");
    });
  }

  /* =====================================================
       STAR FIELD
       ===================================================== */

  const starContainer = document.createElement("div");

  starContainer.className = "star-field";

  document.body.prepend(starContainer);

  /* =====================================================
       CREATE STARS
       ===================================================== */

  const STAR_COUNT = 180;

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("span");

    star.className = "star";

    const size = Math.random() * 3 + 1;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.animationDelay = `${Math.random() * 5}s`;

    star.style.animationDuration = `${Math.random() * 3 + 2}s`;

    starContainer.appendChild(star);
  }

  /* =====================================================
       BRIGHT STARS
       ===================================================== */

  const BRIGHT_STAR_COUNT = 25;

  for (let i = 0; i < BRIGHT_STAR_COUNT; i++) {
    const star = document.createElement("span");

    star.className = "bright-star";

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    const size = Math.random() * 4 + 2;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.animationDelay = `${Math.random() * 4}s`;

    star.style.animationDuration = `${Math.random() * 3 + 2}s`;

    starContainer.appendChild(star);
  }

  /* =====================================================
       SHOOTING STARS / METEORS
       ===================================================== */

  function createMeteor() {
    const meteor = document.createElement("div");

    meteor.className = "meteor";

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.65;

    const distance = Math.random() * 250 + 180;

    const angle = 35 + Math.random() * 25;

    meteor.style.left = `${startX}px`;
    meteor.style.top = `${startY}px`;

    meteor.style.setProperty("--meteor-distance", `${distance}px`);

    meteor.style.setProperty("--meteor-angle", `${angle}deg`);

    const duration = Math.random() * 700 + 500;

    meteor.style.animationDuration = `${duration}ms`;

    document.body.appendChild(meteor);

    setTimeout(() => {
      meteor.remove();
    }, duration + 100);
  }

  /* =====================================================
       RANDOM METEOR LOOP
       ===================================================== */

  function meteorLoop() {
    const delay = Math.random() * 3500 + 1000;

    setTimeout(() => {
      createMeteor();

      meteorLoop();
    }, delay);
  }

  meteorLoop();

  /* =====================================================
       SECOND METEOR CHANCE
       ===================================================== */

  setTimeout(() => {
    if (Math.random() > 0.4) {
      createMeteor();
    }

    setTimeout(() => {
      meteorLoop();
    }, 3000);
  }, 1500);

  /* =====================================================
       RESIZE HANDLING
       ===================================================== */

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      document.querySelectorAll(".meteor").forEach((meteor) => meteor.remove());
    }, 200);
  });

  /* =====================================================
       RANDOM PLANET GLOW
       ===================================================== */

  function randomPlanetGlow() {
    const planetElements = document.querySelectorAll(".planet");

    if (!planetElements.length) return;

    const randomPlanet = planetElements[Math.floor(Math.random() * planetElements.length)];

    randomPlanet.classList.add("random-glow");

    setTimeout(() => {
      randomPlanet.classList.remove("random-glow");
    }, 900);
  }

  setInterval(randomPlanetGlow, 3500);

  /* =====================================================
       ACCESSIBILITY: PLANET KEYBOARD SUPPORT
       ===================================================== */

  document.querySelectorAll(".planet").forEach((planet) => {
    planet.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        planet.click();
      }
    });
  });

  /* =====================================================
       PREVENT DECORATIVE ELEMENTS FROM BLOCKING CLICKS
       ===================================================== */

  document.querySelectorAll(".star-field, .star, .bright-star, .meteor").forEach((element) => {
    element.style.pointerEvents = "none";
  });

  /* =====================================================
       REDUCED MOTION
       ===================================================== */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    document.querySelectorAll(".meteor, .star, .bright-star").forEach((element) => {
      element.style.animation = "none";
    });
  }

  /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

  console.log("%c🌌 Solar System loaded successfully!", "font-size: 16px; font-weight: bold;");
});
