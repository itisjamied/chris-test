function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleNavigation(fadeInUpElements) {
  const navLinks = document.querySelectorAll("nav a");
  const logoLinks = document.querySelectorAll("header a img");
  const footerLinks = document.querySelectorAll("footer a img");

  [...navLinks, ...logoLinks, ...footerLinks].forEach((img) => {
    const anchor = img.closest("a"); // This finds the nearest ancestor which is an anchor
    if (!anchor) return; // If no anchor is found, skip adding the event listener

    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetUrl = anchor.href; // Use the href from the anchor, not the img
      let delayCounter = 0;

      fadeInUpElements
        .filter(isInViewport)
        .reverse()
        .forEach((element, index) => {
          element.classList.replace("fadeInUp", "fadeOutDown");
          element.style.animationDelay = `${index * 600}ms`;
          delayCounter++;
        });

      setTimeout(
        () => (window.location.href = targetUrl),
        delayCounter * 600 + 500
      );
    });
  });
}

function animateOnLoad() {
  const elements = document.querySelectorAll(".fadeInUp:not(nav)");
  Array.from(elements).forEach((element, index) => {
    if (isInViewport(element)) {
      element.style.animationDelay = `${index * 600}ms`; // Staggered fade-in for elements in viewport
    } else {
      element.classList.remove("fadeInUp"); // Remove the animation class for elements not in viewport
    }
  });

  setTimeout(() => {
    const player = document.getElementById("lottieAnimation");
    if (player) player.play();
  }, 1200);
}

function animateOncePerSession(elementId, animationClass) {
  const element = document.getElementById(elementId);
  if (element && isInViewport(element)) {
    if (!sessionStorage.getItem(`${elementId}Animated`)) {
      element.classList.add(animationClass);
      sessionStorage.setItem(`${elementId}Animated`, "true");
    }
  } else if (element) {
    // Always animate if not in the viewport initially
    element.classList.add(animationClass);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  animateOnLoad(); // This will setup all animations
  animateOncePerSession("animatedHeader", "animated-header");
  animateOncePerSession("animatedNav", "animated-nav");
});
