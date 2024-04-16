document.addEventListener("DOMContentLoaded", function () {
  // add initial fadeIn effects with delays
  const fadeInUpElements = document.querySelectorAll(".fadeInUp:not(nav)");
  fadeInUpElements.forEach(function (element, index) {
    element.style.animationDelay = `${index * 600}ms`;
  });

  // handle outgoing navigation
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      // prevent default link behavior
      e.preventDefault();
      const targetUrl = this.href;

      // apply fadeOutDown in reverse order
      [...fadeInUpElements].reverse().forEach((element, index) => {
        element.classList.remove("fadeInUp");
        element.classList.add("fadeOutDown");
        element.style.animationDelay = `${index * 600}ms`;
      });

      // delay navigation to allow animation to complete
      setTimeout(() => {
        window.location.href = targetUrl;
      }, fadeInUpElements.length * 600 + 500); // 500 additional delay to ensure completion
    });
  });
});
