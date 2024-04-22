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






// function handleNavigation(fadeInUpElements) {
//   // Selecting all necessary elements
//   const navLinks = document.querySelectorAll("nav a");
//   const logoLinks = document.querySelectorAll("header img");
//   const footerLinks = document.querySelectorAll("footer img");
//   const headerLinks = document.querySelectorAll("header a");

//   // Function to handle generic navigation (excluding special header links)
//   const handleGenericNavigation = (element) => {
//     element.addEventListener("click", (e) => {
//       // Prevent default navigation
//       e.preventDefault();
//       // Navigate to the URL specified in the href attribute
//       window.location.href = element.href;
//     });
//   };

//   // Apply generic navigation handling to nav, logo, and footer links
//   [...navLinks, ...logoLinks, ...footerLinks].forEach(handleGenericNavigation);

//   // Special handling for header links
//   headerLinks.forEach((anchor) => {
//     anchor.addEventListener("click", (e) => {
//       const href = anchor.getAttribute("href");
//       if (href && href.includes("our-approach.html#")) {
//         // Preventing the default action (navigation)
//         e.preventDefault();

//         console.log("Handling special navigation for: ", anchor.href);
//         const targetUrl = anchor.href;
//         let delayCounter = 0;

//         // Filter and reverse elements to animate based on viewport visibility
//         const elementsToAnimate = fadeInUpElements.filter(isInViewport).reverse();

//         // Apply fade-out animation
//         elementsToAnimate.forEach((element, index) => {
//           element.classList.replace("fadeInUp", "fadeOutDown");
//           element.style.animationDelay = `${index * 600}ms`;
//           delayCounter++;
//         });

//         // After animations, navigate to the target URL
//         setTimeout(() => window.location.href = targetUrl, delayCounter * 600 + 500);
//       } else {
//         // For header links not matching the special condition, use generic navigation
//         handleGenericNavigation(anchor);
//       }
//     });
//   });
// }




document.addEventListener("DOMContentLoaded", () => {
  const fadeInUpElements = Array.from(document.querySelectorAll(".fadeInUp:not(nav)"));
  handleNavigation(fadeInUpElements);

  setTimeout(() => {
    fadeInUpElements.forEach((element, index) => {
      if (isInViewport(element)) {
        element.classList.add("animated");
      } else {
        element.style.visibility = "visible";
      }
      element.style.animationDelay = `${index * 600}ms`;
    });
  }, 200); 
});

function animateOnLoad() {
  const fadeInUpElements = Array.from(
    document.querySelectorAll(".fadeInUp:not(nav)")
  );

  setTimeout(() => {
    fadeInUpElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 600}ms`;
      if (isInViewport(element)) {
        element.classList.add("animated");
      } else {
        element.style.visibility = "visible";
      }
    });
  }, 1000); 

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
