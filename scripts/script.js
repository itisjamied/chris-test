function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 && // bottom must be below the top of the viewport
    rect.right > 0 && // right side must be right of the viewport's left edge
    rect.top < (window.innerHeight || document.documentElement.clientHeight) && // top must be above the bottom of the viewport
    rect.left < (window.innerWidth || document.documentElement.clientWidth) // left must be left of the viewport's right edge
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const fadeInUpElements = document.querySelectorAll(".fadeInUp:not(nav)");
  fadeInUpElements.forEach(function (element, index) {
    element.style.animationDelay = `${index * 600}ms`;
  });

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // stop the link from navigating immediately
      const targetUrl = this.href;

      let delayCounter = 0; // counter to track of the number of visible elements
      const visibleElements = [...fadeInUpElements]
        .filter(isInViewport)
        .reverse();

      visibleElements.forEach((element, index) => {
        element.classList.remove("fadeInUp");
        element.classList.add("fadeOutDown");
        element.style.animationDelay = `${index * 600}ms`;
        delayCounter++; // increment for each visible element
      });

      setTimeout(() => {
        window.location.href = targetUrl;
      }, delayCounter * 600 + 500); // adjust navigation delay based on visible elements
    });
  });
});
