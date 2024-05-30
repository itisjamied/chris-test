function updateContent() {
  const textData = {
    home: "Generating business outcomes through a human-centered approach.",
    tagline: {
      home: "Generating business outcomes through a human-centered approach.",
      approach: "We're Different",
      leadership: "Battle Tested",
    },
  };

  // Helper function to get nested value from textData
  function getNestedValue(obj, key) {
    return key.split(".").reduce((o, i) => (o ? o[i] : null), obj);
  }

  const textElements = document.querySelectorAll("[key]");
  textElements.forEach((element) => {
    const key = element.getAttribute("key");
    const value = getNestedValue(textData, key);
    if (value) {
      element.textContent = value;
    }
  });
}
window.onload = updateContent;
