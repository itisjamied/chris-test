document.addEventListener("DOMContentLoaded", function () {
  var fadeInUpElements = document.querySelectorAll(".fadeInUp:not(nav)");
  fadeInUpElements.forEach(function (element, index) {
    element.style.animationDelay = `${index * 600}ms`; // 600ms delay per element
  });
});
