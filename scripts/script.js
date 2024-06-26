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
  const headerLinks = document.querySelectorAll("header a");

  [...navLinks, ...logoLinks, ...footerLinks, ...headerLinks].forEach((img) => {
    const anchor = img.closest("a");

    if (anchor.classList.contains("disabled")) return;

    anchor.addEventListener("click", (e) => {

      const isPureAnchor = anchor.getAttribute('href').startsWith('#') && anchor.host === window.location.host && anchor.pathname === window.location.pathname;

      if (isPureAnchor) {
        return;
      } else {

      e.preventDefault();
      const targetUrl = anchor.href;
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
    }
    });
  });
}

function animateOnLoad() {
  const fadeInUpElements = Array.from(
    document.querySelectorAll(".fadeInUp:not(nav)")
  );

  setTimeout(() => {
    let viewportIndex = 0;  
    fadeInUpElements.forEach((element) => {
      if (isInViewport(element)) {
        element.style.animationDelay = `${viewportIndex * 600}ms`;
        element.classList.add("animated");
        viewportIndex++;  
      } else {
        element.style.visibility = "visible";
      }
    });
  }, 10);

  handleNavigation(fadeInUpElements);

  setTimeout(() => {
    const player = document.getElementById("lottieAnimation");
    if (player) player.play();
  }, 1000);
}

function animateOncePerSession(elementId, animationClass) {
  const element = document.getElementById(elementId);
  if (element && !sessionStorage.getItem(`${elementId}Animated`)) {
    element.classList.add(animationClass);
    sessionStorage.setItem(`${elementId}Animated`, "true");
  }
}

function animateHeader(elementId) {
  const element = document.getElementById(elementId);
  const dontAnimate = sessionStorage.getItem("dontAnimateHeader");

  if (element) {
    // First load
    if (dontAnimate != "true") {
      element.classList.add("animated-header");
    }
  }
}

function watchHeaderInView() {
  checkHeaderInView();

  window.addEventListener("scroll", () => {
    checkHeaderInView();
  });
}

const header = document.getElementById("animatedHeader");
let wasInViewport = isInViewport(header);
let headerChecked = false; // boolean that's false so we can hit one of the conditions in checkHeaderInView

function checkHeaderInView() {
  const header = document.getElementById("animatedHeader");
  const isInViewNow = isInViewport(header);
  
  if ((!isInViewNow && wasInViewport) || (!isInViewNow && !headerChecked)) {
    sessionStorage.removeItem("dontAnimateHeader");
    wasInViewport = false;
    headerChecked = true;
  } else if ((isInViewNow && !wasInViewport)||(isInViewNow && !headerChecked)) {
    sessionStorage.setItem("dontAnimateHeader", "true");
    wasInViewport = true;
    headerChecked = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  animateOnLoad();
  animateHeader("animatedHeader");
  animateOncePerSession("animatedNav", "animated-nav");
  watchHeaderInView();
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    ("Page was loaded from the cache");
    // re-initialize animations or reset styles here
    document.querySelectorAll(".fadeOutDown").forEach(el => {
      el.classList.replace("fadeOutDown", "fadeInUp");
    });
  }
  // always call initialization functions
  animateOnLoad();
  animateHeader("animatedHeader");
  animateOncePerSession("animatedNav", "animated-nav");
  watchHeaderInView();
});




function isMacOS() {
  return window.navigator.platform.includes('Mac');
}

function applyWhiteTextShadow() {
  if (isMacOS()) {
      var elements = document.querySelectorAll('.text-jumbo');
      // console.log("Elements selected:", elements); 
      elements.forEach(function(element) {
          element.classList.add('white-text-shadow');
          console.log("Added white-text-shadow to:", element); 
      });
  }
}


document.addEventListener('DOMContentLoaded', applyWhiteTextShadow);


