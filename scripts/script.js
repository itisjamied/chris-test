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

function checkHeaderInView() {
  const header = document.getElementById("animatedHeader");
  let wasInViewport = isInViewport(header);

   // Set initial opacity based on sessionStorage
   header.style.opacity = sessionStorage.getItem("headerOpacity") || "1";

  window.addEventListener("scroll", () => {
    const isInViewNow = isInViewport(header);
    if (!isInViewNow && wasInViewport) {
      sessionStorage.removeItem("animatedHeaderAnimated");
      wasInViewport = false;
      header.style.opacity = "0";
      sessionStorage.setItem("headerOpacity", "0");
      console.log("header not in view")
    } else if (isInViewNow && !wasInViewport) {
      sessionStorage.setItem("animatedHeaderAnimated", "true");
      wasInViewport = true;
      header.style.opacity = "1";
      sessionStorage.setItem("headerOpacity", "1");
      console.log("header in view")

    }
  });
}

function resetHeaderOpacity() {
  const header = document.querySelector('header');
  if(header){
    header.style.opacity = "1";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  animateOnLoad();
  animateOncePerSession("animatedHeader", "animated-header");
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
  animateOncePerSession("animatedHeader", "animated-header");
  animateOncePerSession("animatedNav", "animated-nav");
  checkHeaderInView();
  resetHeaderOpacity();
});

