// main.js
import { generalData } from "./data.js";
import { teamData } from "./team.js";
// import { footer } from "./footer.js";

const textData = {
  ...generalData,
  team: teamData,
  // footer,
};

function getNestedValue(obj, key) {
  return key.split(".").reduce((o, i) => (o ? o[i] : null), obj);
}

function updateContent() {
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

  // handle team members separately
  const mainContainer = document.querySelector(".main-container");

  Object.keys(textData.team).forEach((memberKey, index) => {
    const member = textData.team[memberKey];
    const memberWrapper = document.createElement("div");
    memberWrapper.className = "container no-border fadeInUp";
    if (index > 0) {
      memberWrapper.classList.add("no-before-after", "member-top");
    }

    const memberContainer = document.createElement("div");
    memberContainer.className = "desktop-col-7-left tablet-col-4";

    memberContainer.innerHTML = `
      <h2 class="text-l">${member.name}</h2>
      <h4>${member.title}</h4>
      <div class="headshot">
        <img src="${member.imgSrc}" alt="${member.name}" />
      </div>
      <p class="text-m">${member.bio}</p>
      <h4>${member.clients.title}</h4>
      <table class="text-m">
        <tr>
          <th>${member.clients.category01.name}</th>
          <td>${member.clients.category01.list}</td>
        </tr>
        <tr>
          <th>${member.clients.category02.name}</th>
          <td>${member.clients.category02.list}</td>
        </tr>
        <tr>
          <th>${member.clients.category03.name}</th>
          <td>${member.clients.category03.list}</td>
        </tr>
      </table>
    `;

    const contactContainer = document.createElement("div");
    contactContainer.className = "desktop-col-5 tablet-col-4";
    contactContainer.innerHTML = `
      <div class="headshot">
        <img src="${member.imgSrc}" alt="${member.name}" />
      </div>
      <ul>
        <li><strong>${member.contact.method01.name}</strong> <a href="${member.contact.method01.link}" target="_blank">${member.contact.method01.display}</a></li>
        <li><strong>${member.contact.method02.name}</strong> <a href="${member.contact.method02.link}" target="_blank">${member.contact.method02.display}</a></li>
      </ul>
    `;

    memberWrapper.appendChild(memberContainer);
    memberWrapper.appendChild(contactContainer);
    mainContainer.appendChild(memberWrapper);
  });

  // function updateFooter() {
  //   const footer = document.querySelector("footer");

  //   // Update logo
  //   const logos = footer.querySelectorAll('a[href="../index.html"] img');
  //   logos.forEach((logo) => {
  //     logo.src = textData.footer.logo.src;
  //     logo.alt = textData.footer.logo.alt;
  //   });

  //   // Update address
  //   const addressContainer = footer.querySelector(".address");
  //   addressContainer.querySelector("h4").textContent =
  //     textData.footer.address.title;
  //   addressContainer.querySelector("p").innerHTML =
  //     textData.footer.address.lines.join("<br />");

  //   // Update copyright
  //   const copyrightContainer = footer.querySelector(".copyright");
  //   copyrightContainer.querySelector("h4").textContent =
  //     textData.footer.copyright.title;
  //   copyrightContainer.querySelector(
  //     "p"
  //   ).innerHTML = `&copy;<br /> Copyright ${textData.footer.copyright.year}, ${textData.footer.copyright.company}`;

  //   // Update contacts
  //   const contactsContainer = footer.querySelector(".contacts");
  //   contactsContainer.querySelector("h4").textContent =
  //     textData.footer.contacts.title;
  //   contactsContainer.querySelector("p").innerHTML =
  //     textData.footer.contacts.emails
  //       .map(
  //         (email) => `<a href="mailto:${email.address}">${email.display}</a>`
  //       )
  //       .join("<br />");
  // }
}

window.onload = updateContent;
