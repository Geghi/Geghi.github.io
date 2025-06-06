// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");
let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  const cursorSize = cursor.offsetWidth;
  cursor.style.left = mouseX - cursorSize / 2 + "px";
  cursor.style.top = mouseY - cursorSize / 2 + "px";
});

function animateFollower() {
  const cursorSize = cursor.offsetWidth;
  followerX += (mouseX - cursorSize - followerX) * 0.2;
  followerY += (mouseY - cursorSize - followerY) * 0.2;
  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top = followerY + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effects for interactive elements
const interactiveElements = document.querySelectorAll("a, .btn, .feature-card");
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)";
    cursorFollower.style.transform = "scale(1.5)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursorFollower.style.transform = "scale(1)";
  });
});

// Floating Particles
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "vw";

  // Set animation properties
  particle.style.animationDelay = 0 + "s";
  particle.style.animationDuration = Math.random() * 10 + 10 + "s";

  document.querySelector(".particles").appendChild(particle);
  setTimeout(() => {
    particle.remove();
  }, 25000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent =
          Math.ceil(current) +
          (counter.textContent.includes("+")
            ? "+"
            : counter.textContent.includes("%")
            ? "%"
            : "");
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = counter.textContent;
      }
    };

    setTimeout(updateCounter, 100);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      if (entry.target.classList.contains("stats")) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe animated elements
document.querySelectorAll(".feature-card, .stats").forEach((el) => {
  observer.observe(el);
});

// 3D tilt effect for feature cards
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 4;
    const rotateY = (centerX - x) / 4;

    card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
  });
});

// Dynamic background color based on scroll
window.addEventListener("scroll", () => {
  const scrollPercent =
    window.pageYOffset /
    (document.documentElement.scrollHeight - window.innerHeight);
  const hue = 240 + scrollPercent * 60; // Shift from blue to purple
  document.documentElement.style.setProperty(
    "--primary",
    `hsl(${hue}, 71%, 61%)`
  );
});

// Preload animations
window.addEventListener("load", () => {
  // Remove this line: document.body.style.opacity = "1";
  setTimeout(() => {
    document.querySelector(".scroll-indicator").style.opacity = "1";
  }, 2000);
});

// Hamburger menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    document.getElementById("hamburger").addEventListener("click", function () {
      const navMenu = document.getElementById("nav-menu");

      if (navMenu.classList.contains("active")) {
        // Close menu
        navMenu.classList.remove("active");
        navMenu.classList.add("closing");
        navMenu.addEventListener(
          "animationend",
          function handler() {
            navMenu.classList.remove("closing");
            navMenu.classList.add("hidden");
            navMenu.removeEventListener("animationend", handler);
          },
          { once: true }
        );
      } else {
        // Open menu
        navMenu.classList.remove("hidden");
        setTimeout(() => navMenu.classList.add("active"), 10);
      }

      // Toggle hamburger icon
      this.classList.toggle("active");
    });

    // Close menu when clicking on nav links
    // Add this after the existing hamburger click event listener
    const navLinks = document.querySelectorAll("#nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const navMenu = document.getElementById("nav-menu");
        const hamburger = document.getElementById("hamburger");

        // Close menu immediately without animation
        navMenu.classList.remove("active");
        navMenu.classList.add("hidden");
        hamburger.classList.remove("active");

        // Prevent default only if it's an anchor link to same page
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          // Add your existing smooth scroll logic here if needed
        }
      });
    });
  }
});
