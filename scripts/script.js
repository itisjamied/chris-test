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
  // [...navLinks, ...logoLinks, ...footerLinks].forEach((img) => {
    const anchor = img.closest("a");

    if (anchor.classList.contains("disabled")) return;

    anchor.addEventListener("click", (e) => {

      // Check if the href attribute is a pure anchor link (just '#')
      const isPureAnchor = anchor.getAttribute('href').startsWith('#') && anchor.host === window.location.host && anchor.pathname === window.location.pathname;

      if (isPureAnchor) {
        // It's an anchor link; do nothing special
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


  // setTimeout(() => {
  //   fadeInUpElements.forEach((element, index) => {
  //     element.style.animationDelay = `${index * 600}ms`;
  //     if (isInViewport(element)) {
  //       element.classList.add("animated");
  //       console.log("In viewport:", index)
  //     } else {
  //       element.style.visibility = "visible";
  //       console.log("Not in viewport:", index);
  //     }
  //   });
  // }, 10); 


  setTimeout(() => {
    let viewportIndex = 0;  
    fadeInUpElements.forEach((element) => {
      if (isInViewport(element)) {
        element.style.animationDelay = `${viewportIndex * 600}ms`;
        element.classList.add("animated");
        console.log("In viewport:", viewportIndex)
        viewportIndex++;  
      } else {
        element.style.visibility = "visible";
        console.log("Not in viewport:", viewportIndex)
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

  window.addEventListener("scroll", () => {
    const isInViewNow = isInViewport(header);
    if (!isInViewNow && wasInViewport) {
      sessionStorage.removeItem("animatedHeaderAnimated");
      wasInViewport = false;
    } else if (isInViewNow && !wasInViewport) {
      sessionStorage.setItem("animatedHeaderAnimated", "true");
      wasInViewport = true;
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

