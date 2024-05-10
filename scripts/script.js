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



// document.addEventListener("DOMContentLoaded", () => {
//   const fadeInUpElements = Array.from(document.querySelectorAll(".fadeInUp:not(nav)"));
//   handleNavigation(fadeInUpElements);

//   setTimeout(() => {
//     fadeInUpElements.forEach((element, index) => {
//       if (isInViewport(element)) {
//         element.classList.add("animated");
//       } else {
//         element.style.visibility = "visible";
//       }
//       element.style.animationDelay = `${index * 600}ms`;
//     });
//   }, 200); 
// });

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

function handleAnimatedState(elementId) {
  const element = document.getElementById(elementId);
  const stateKey = `${elementId}State`;
  const animationState = sessionStorage.getItem(stateKey);

  if (element) {
    // First load
    if (!animationState) {
      element.classList.add("animated-header");
      sessionStorage.setItem(stateKey, "animated");
    }
  }
}

function setAnimatedState(elementId) {
  const stateKey = `${elementId}State`;

  sessionStorage.setItem(stateKey, "animated");
}

function resetAnimatedState(elementId) {
  const element = document.getElementById(elementId);
  const stateKey = `${elementId}State`;

  element.classList.add("animated-header");
  sessionStorage.removeItem(stateKey);
}

applyHeaderOpacity();

function applyHeaderOpacity() {  
  // Set initial opacity based on sessionStorage
  // console.log("applyHeaderOpacity", sessionStorage.getItem("headerOpacity") || "1");
  return;
  document.body.style.setProperty('--header-opacity', sessionStorage.getItem("headerOpacity") || "1");
}

function setHeaderOpacity(opacity) {
  // console.log("setHeaderOpacity", `${opacity}`);
  return;
  document.body.style.setProperty('--header-opacity', `${opacity}`);
  sessionStorage.setItem("headerOpacity", `${opacity}`);
}

function checkHeaderInView() {
  const header = document.getElementById("animatedHeader");
  
  applyHeaderOpacity();

  let wasInViewport = isInViewport(header);

  window.addEventListener("scroll", () => {
    const isInViewNow = isInViewport(header);
    if (!isInViewNow && wasInViewport) {
      sessionStorage.removeItem("animatedHeaderAnimated");
      wasInViewport = false;
      setHeaderOpacity(0);
      resetAnimatedState("animatedHeader");
    } else if (isInViewNow && !wasInViewport) {
      sessionStorage.setItem("animatedHeaderAnimated", "true");
      wasInViewport = true;
      setHeaderOpacity(1);
      setAnimatedState("animatedHeader");
    }
  });
}

function  resetHeaderOpacity() {
  const header = document.querySelector('header');
  if(header){
    return;
    document.body.style.setProperty('--header-opacity', "1");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  animateOnLoad();
  handleAnimatedState("animatedHeader");
  animateOncePerSession("animatedNav", "animated-nav");
  checkHeaderInView();
  resetHeaderOpacity();
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
  handleAnimatedState("animatedHeader");
  animateOncePerSession("animatedNav", "animated-nav");
  checkHeaderInView();
  resetHeaderOpacity();
});

