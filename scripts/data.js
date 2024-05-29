function updateContent() {
  const textData = {
    // headerTitle: "How we do it",
    companyName: "ValueForm",
    serviceDesign: "service design",
    productDesign: "product design",
    softwareEngineering: "software engineering",
    // contactsTitle: "Contacts",
    newBusinessEmail: "newbusiness@valueform.io",
    pressEmail: "press@valueform.io",
    careersEmail: "careers@valueform.io",
    tagline: "Generating business outcomes through a human centered approach.",
  };

  const srcData = {
    logoSrc: "images/logo.svg",
  };

  const cssData = {
    "--almostblack": "#020202",
    "--darkgrey": "#404040",
    "--nearwhite": "#BEBEBE",
    "--white": "#ffffff",
  };

  // update text content
  const textElements = document.querySelectorAll("[data-text]");
  textElements.forEach((element) => {
    const key = element.getAttribute("data-text");
    if (textData[key]) {
      element.textContent = textData[key];
    }
  });

  // update src attributes
  const srcElements = document.querySelectorAll("[data-src]");
  srcElements.forEach((element) => {
    const key = element.getAttribute("data-src");
    if (srcData[key]) {
      element.setAttribute("src", srcData[key]);
    }
  });

  // update CSS variables
  const root = document.documentElement;
  for (const [key, value] of Object.entries(cssData)) {
    root.style.setProperty(key, value);
  }
}
window.onload = updateContent;
