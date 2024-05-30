function updateContent() {
  const textData = {
    home: "Generating business outcomes through a human-centered approach.",
    tagline: {
      home: "Generating business outcomes through a human-centered approach.",
      approach: "We're Different",
      approachHead: "A. Our Approach.",
      leadership: "Battle Tested",
      leadershipHead: "B. Our Leadership.",
    },
    team: {
      member01: {
        name: "Christopher Pross",
        title: "Managing Partner",
        imgSrc: "../images/lipp-pross-photo.png",
        bio: `Christopher is an accomplished product and design leader, recognized for his track record guiding teams at both agencies and large incumbents. His expertise has been pivotal in tackling complex business challenges, collaborating with the likes of algorithmic trading firms, governments, healthcare advocacy groups, and CPG brands. His broad experience fuels his ability to draw unique parallels across industries, consistently generating outsized outcomes. His contributions have resulted in innovative digital products, new business models, and the strategic redesign of organizations. <a href="../images/launch-letter.pdf" target="_blank">Read why Chris founded ValueForm.</a>`,
        clients: {
          title: "Select Clients:",
          category01: {
            name: "Finance",
            list: "Goldman Sachs, Jane Street, MetLife, BNY Mellon",
          },
          category02: {
            name: "Government",
            list: "U.S. Dept. of Education, City of Boston, City of Philadelphia, City of Pittsburgh",
          },
          category03: {
            name: "Other",
            list: "Southwest Airlines, Radisson Hotels, Chick-fil-A, Brooks Running, Tabasco",
          },
        },
        contact: {
          method01: {
            name: "Email:",
            link: "malito:c.pross@valueform.io",
            display: "c.pross@valueform.io",
          },
          method02: {
            name: "LinkedIn:",
            link: "https://www.linkedin.com/in/christopher-pross-jr-a7362244/",
            display: "christopher-pross-jr",
          },
        },
      },
    },
  };

  // get nested value from textData
  function getNestedValue(obj, key) {
    return key.split(".").reduce((o, i) => (o ? o[i] : null), obj);
  }

  const textElements = document.querySelectorAll("[key]");
  textElements.forEach((element) => {
    const key = element.getAttribute("key");
    const value = getNestedValue(textData, key);
    if (value) {
      if (element.tagName.toLowerCase() === "img") {
        element.src = value;
      } else if (
        element.tagName.toLowerCase() === "a" &&
        element.hasAttribute("data-display-key")
      ) {
        element.href = value;
        const displayKey = element.getAttribute("data-display-key");
        const displayValue = getNestedValue(textData, displayKey);
        if (displayValue) {
          element.textContent = displayValue;
        }
      } else {
        element.innerHTML = value;
      }
    }
  });
}

window.onload = updateContent;
