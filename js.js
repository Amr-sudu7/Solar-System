document.addEventListener("DOMContentLoaded", () => {
  const solarSystem = document.querySelector(".solar-system");
  const meteorContainer = document.querySelector("#meteors");

  if (!solarSystem) {
    console.error("Solar system element not found.");
    return;
  }

  /* =====================================================
       DEVICE DETECTION
    ===================================================== */

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  /* =====================================================
       PLANETS
    ===================================================== */

  const planets = document.querySelectorAll(".planet");

  planets.forEach((planet) => {
    // Make sure planets stay clickable
    planet.style.pointerEvents = "auto";

    // Touch devices don't need hover effects
    if (!isTouchDevice) {
      planet.addEventListener("mouseenter", () => {
        planet.classList.add("planet-hover");
      });

      planet.addEventListener("mouseleave", () => {
        planet.classList.remove("planet-hover");
      });
    }
  });

  /* =====================================================
       SUN
    ===================================================== */

  const sun = document.querySelector(".sun");

  if (sun) {
    sun.style.pointerEvents = "auto";

    if (!isTouchDevice) {
      sun.addEventListener("mouseenter", () => {
        sun.classList.add("sun-hover");
      });

      sun.addEventListener("mouseleave", () => {
        sun.classList.remove("sun-hover");
      });
    }
  }

  /* =====================================================
       DESKTOP PARALLAX ONLY
       
       IMPORTANT:
       Phones do NOT run requestAnimationFrame().
    ===================================================== */

  if (!isMobile && !isTouchDevice) {
    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    window.addEventListener(
      "mousemove",
      (event) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 6;

        targetY = (event.clientY / window.innerHeight - 0.5) * 6;
      },
      { passive: true },
    );

    function updateParallax() {
      currentX += (targetX - currentX) * 0.03;

      currentY += (targetY - currentY) * 0.03;

      solarSystem.style.setProperty("--parallax-x", `${currentX}px`);

      solarSystem.style.setProperty("--parallax-y", `${currentY}px`);

      requestAnimationFrame(updateParallax);
    }

    updateParallax();
  } else {
    // Make absolutely sure mobile has no parallax
    solarSystem.style.setProperty("--parallax-x", "0px");

    solarSystem.style.setProperty("--parallax-y", "0px");
  }

  /* =====================================================
       METEORS
       
       Desktop only.
       Disabled completely on mobile.
    ===================================================== */

  function createMeteor() {
    if (!meteorContainer || isMobile || isTouchDevice) {
      return;
    }

    const meteor = document.createElement("div");

    meteor.className = "meteor";

    const startX = Math.random() * window.innerWidth;

    const startY = Math.random() * (window.innerHeight * 0.65);

    const distance = Math.random() * 180 + 180;

    const angle = Math.random() * 15 + 30;

    const duration = Math.random() * 600 + 700;

    meteor.style.left = `${startX}px`;

    meteor.style.top = `${startY}px`;

    meteor.style.setProperty("--meteor-x", `${distance}px`);

    meteor.style.setProperty("--meteor-y", `${distance * 0.65}px`);

    meteor.style.setProperty("--meteor-angle", `${angle}deg`);

    meteor.style.setProperty("--meteor-duration", `${duration}ms`);

    meteorContainer.appendChild(meteor);

    setTimeout(() => {
      meteor.remove();
    }, duration + 100);
  }

  /* =====================================================
       SINGLE METEOR LOOP
       
       IMPORTANT:
       Only starts ONCE.
    ===================================================== */

  function meteorLoop() {
    if (isMobile || isTouchDevice) {
      return;
    }

    const delay = Math.random() * 4000 + 2000;

    setTimeout(() => {
      createMeteor();

      meteorLoop();
    }, delay);
  }

  if (!isMobile && !isTouchDevice) {
    meteorLoop();
  }

  /* =====================================================
       MOBILE CLEANUP
       
       In case old meteor elements somehow exist.
    ===================================================== */

  if (isMobile || isTouchDevice) {
    if (meteorContainer) {
      meteorContainer.innerHTML = "";
    }
  }

  /* =====================================================
       RESIZE
       
       Don't constantly modify the Solar System.
    ===================================================== */

  let resizeTimeout;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        if (isMobile || isTouchDevice) {
          solarSystem.style.setProperty("--parallax-x", "0px");

          solarSystem.style.setProperty("--parallax-y", "0px");
        }
      }, 150);
    },
    { passive: true },
  );

  /* =====================================================
       REMOVE POINTER EVENTS FROM DECORATIONS
    ===================================================== */

  const decorativeElements = document.querySelectorAll(".space-effects, .stars, #meteors, .meteor");

  decorativeElements.forEach((element) => {
    element.style.pointerEvents = "none";
  });

  /* =====================================================
       REDUCED MOTION
    ===================================================== */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    solarSystem.style.setProperty("--parallax-x", "0px");

    solarSystem.style.setProperty("--parallax-y", "0px");

    if (meteorContainer) {
      meteorContainer.innerHTML = "";
    }
  }

  /* =====================================================
       DEBUG
    ===================================================== */

  console.log(`Solar System loaded | ${isMobile ? "Mobile" : "Desktop"}`);
});
