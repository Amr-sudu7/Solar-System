document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ===================================================== */

  const solarSystem = document.querySelector(".solar-system");

  const planets = document.querySelectorAll(".planet, .planet-link");

  const meteorContainer = document.getElementById("meteors");

  const nasaModal = document.getElementById("nasaModal");

  const nasaIframe = document.getElementById("nasaIframe");

  const nasaModalTitle = document.getElementById("nasaModalTitle");

  const nasaModalClose = document.getElementById("nasaModalClose");

  const nasaLoading = document.getElementById("nasaLoading");

  const nasaBackdrop = document.querySelector(".nasa-modal-backdrop");

  /* =====================================================
       SAFETY CHECK
    ===================================================== */

  if (!solarSystem || !nasaModal || !nasaIframe || !nasaModalClose) {
    console.error("Required Solar System elements are missing.");

    return;
  }

  /* =====================================================
       DEVICE DETECTION
    ===================================================== */

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  /* =====================================================
       NASA EYES BASE URL
    ===================================================== */

  const NASA_EYES_BASE = "https://eyes.nasa.gov/apps/solar-system/#/";

  /* =====================================================
       CURRENT PLANET
    ===================================================== */

  let currentPlanet = null;

  /* =====================================================
       FORMAT PLANET NAME
    ===================================================== */

  function formatPlanetName(name) {
    if (!name) {
      return "NASA Eyes";
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  /* =====================================================
       OPEN NASA EYES MODAL
    ===================================================== */

  function openNASA(planetName) {
    if (!planetName) {
      return;
    }

    currentPlanet = planetName;

    const formattedName = formatPlanetName(planetName);

    /* ---------------------------------------------
           Create URL
        --------------------------------------------- */

    const nasaURL = `${NASA_EYES_BASE}${planetName}?embed=true`;

    /* ---------------------------------------------
           Update title
        --------------------------------------------- */

    nasaModalTitle.textContent = `NASA Eyes — ${formattedName}`;

    /* ---------------------------------------------
           Show loading
        --------------------------------------------- */

    nasaLoading.classList.remove("hidden");

    /* ---------------------------------------------
           Open modal FIRST
        --------------------------------------------- */

    nasaModal.classList.add("active");

    nasaModal.setAttribute("aria-hidden", "false");

    /* ---------------------------------------------
           Prevent background scrolling
        --------------------------------------------- */

    document.body.style.overflow = "hidden";

    /* ---------------------------------------------
           Load NASA Eyes ONLY AFTER CLICK
        --------------------------------------------- */

    nasaIframe.src = nasaURL;

    /* ---------------------------------------------
           Focus close button
        --------------------------------------------- */

    nasaModalClose.focus();

    console.log(`Opening NASA Eyes: ${nasaURL}`);
  }

  /* =====================================================
       CLOSE NASA EYES MODAL
    ===================================================== */

  function closeNASA() {
    nasaModal.classList.remove("active");

    nasaModal.setAttribute("aria-hidden", "true");

    /*
            Wait for the close animation,
            then unload the iframe completely.
        */

    setTimeout(() => {
      if (!nasaModal.classList.contains("active")) {
        nasaIframe.src = "about:blank";

        nasaLoading.classList.remove("hidden");

        currentPlanet = null;
      }
    }, 250);

    /* ---------------------------------------------
           Restore page scrolling
        --------------------------------------------- */

    document.body.style.overflow = "";

    /* ---------------------------------------------
           Return focus to previous planet
        --------------------------------------------- */

    if (currentPlanet) {
      const previousPlanet = document.querySelector(`[data-planet="${currentPlanet}"]`);

      previousPlanet?.focus();
    }
  }

  /* =====================================================
       PLANET CLICK EVENTS
    ===================================================== */

  planets.forEach((planet) => {
    /*
            Make sure the anchor itself receives
            the click.
        */

    planet.style.pointerEvents = "auto";

    planet.style.touchAction = "manipulation";

    planet.addEventListener("click", (event) => {
      /*
                    Prevent href="#"
                    from jumping to the top.
                */

      event.preventDefault();

      event.stopPropagation();

      const planetName = planet.dataset.planet;

      if (!planetName) {
        console.warn("Missing data-planet:", planet);

        return;
      }

      openNASA(planetName);
    });
  });

  /* =====================================================
       IFRAME LOAD
    ===================================================== */

  nasaIframe.addEventListener("load", () => {
    nasaLoading.classList.add("hidden");
  });

  /* =====================================================
       CLOSE BUTTON
    ===================================================== */

  nasaModalClose.addEventListener("click", () => {
    closeNASA();
  });

  /* =====================================================
       BACKDROP CLICK
    ===================================================== */

  if (nasaBackdrop) {
    nasaBackdrop.addEventListener("click", () => {
      closeNASA();
    });
  }

  /* =====================================================
       ESC KEY
    ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nasaModal.classList.contains("active")) {
      closeNASA();
    }
  });

  /* =====================================================
       DESKTOP PARALLAX
       
       Disabled on mobile/touch devices
       for performance.
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
      {
        passive: true,
      },
    );

    function updateParallax() {
      currentX += (targetX - currentX) * 0.03;

      currentY += (targetY - currentY) * 0.03;

      solarSystem.style.setProperty("--parallax-x", `${currentX}px`);

      solarSystem.style.setProperty("--parallax-y", `${currentY}px`);

      requestAnimationFrame(updateParallax);
    }

    updateParallax();
  }

  /* =====================================================
       METEORS
       
       Desktop only.
    ===================================================== */

  function createMeteor() {
    if (!meteorContainer || isMobile || isTouchDevice) {
      return;
    }

    const meteor = document.createElement("div");

    meteor.className = "meteor";

    const startX = Math.random() * window.innerWidth;

    const startY = Math.random() * window.innerHeight * 0.65;

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
       METEOR LOOP
       
       Starts only once.
    ===================================================== */

  function meteorLoop() {
    if (isMobile || isTouchDevice) {
      return;
    }

    const delay = Math.random() * 4000 + 2500;

    setTimeout(() => {
      createMeteor();

      meteorLoop();
    }, delay);
  }

  if (!isMobile && !isTouchDevice) {
    meteorLoop();
  }

  /* =====================================================
       DISABLE DECORATIVE POINTER EVENTS
    ===================================================== */

  document.querySelectorAll(".space-effects, .stars, #meteors, .meteor").forEach((element) => {
    element.style.pointerEvents = "none";
  });

  /* =====================================================
       MOBILE CLEANUP
    ===================================================== */

  if (isMobile || isTouchDevice) {
    if (meteorContainer) {
      meteorContainer.innerHTML = "";
    }

    solarSystem.style.setProperty("--parallax-x", "0px");

    solarSystem.style.setProperty("--parallax-y", "0px");
  }

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
       FINAL MESSAGE
    ===================================================== */

  console.log("🌌 Solar System + NASA Eyes ready.");
});
