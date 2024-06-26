import { generalData } from "./data/data.js";
import { teamData } from "./data/team.js";
import { introBlock } from "./data/approachIntroBlock.js";
import { footer as footerData } from "./data/footer.js"; // Import the footer data
console.log(teamData)

const textData = {
  ...generalData,
  team: teamData,
  ...introBlock,
  footer: footerData,
};

function getNestedValue(obj, key) {
  return key.split(".").reduce((o, i) => (o ? o[i] : null), obj);
}

function TextElements() {
  const textElements = document.querySelectorAll("[key]");

  textElements.forEach((element) => {
    const key = element.getAttribute("key");
    const value = getNestedValue(textData, key);

    if (value) {
      switch (element.tagName.toLowerCase()) {
        case "img":
          element.src = value;
          break;

        case "a":
          if (element.hasAttribute("data-display-key")) {
            element.href = value;
            const displayKey = element.getAttribute("data-display-key");
            const displayValue = getNestedValue(textData, displayKey);
            if (displayValue) {
              element.textContent = displayValue;
            }
          }
          break;

        default:
          element.innerHTML = value;
          break;
      }
    }
  });
}

function TeamMembers() {
console.log(textData.team);

  const mainContainer = document.querySelector(".main-container");
  if (!textData.team || !mainContainer) return;

  Object.keys(textData.team).forEach((memberKey, index) => {
    const member = textData.team[memberKey];
    console.log(member);
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
    console.log(memberWrapper);

  });
}

function handleFooter() {
  console.log("I got in here")
  const footerContainer = document.querySelector("footer");
  if (footerContainer) {
    const footerData = textData.footer;

    footerContainer.innerHTML = `
      <img src="${footerData.logo.src}" alt="${footerData.logo.alt}" ondblclick="document.getElementById('producer-tag').play();" />

      <div class="address desktop-col-3 tablet-col-2">
        <h4>${footerData.address.title}</h4>
        <p>
          ${footerData.address.lines.l1}<br />
          ${footerData.address.lines.l2}<br />
          ${footerData.address.lines.l3}
        </p>
      </div> 

      <div class="copyright desktop-col-3-mid tablet-col-2-mid">
        <h4>${footerData.copyright.title}</h4>
        <p>&copy;<br /> 
          Copyright ${footerData.copyright.year}, ${footerData.copyright.company}
        </p> 
      </div>

      <div class="contacts desktop-col-3-end tablet-col-3-end">
        <h4>${footerData.contacts.title}</h4>
        <p>
          <a href="mailto:${footerData.contacts.emails.business.address}">${footerData.contacts.emails.business.display}</a><br />
          <a href="mailto:${footerData.contacts.emails.press.address}">${footerData.contacts.emails.press.display}</a><br />
          <a href="mailto:${footerData.contacts.emails.careers.address}">${footerData.contacts.emails.careers.display}</a><br />
        </p>
      </div>

      <audio id="producer-tag">
        <source src="images/D1-Whoosh.mp3" type="audio/mpeg">
      </audio>

      <img src="${footerData.logo.src}" alt="${footerData.logo.alt}" ondblclick="document.getElementById('producer-tag').play();" />
    `;
  }
}

function updateContent() {
  TextElements();
  TeamMembers();
  // handleFooter();
}

window.onload = updateContent;

 // Ensure Lottie player is loaded before setting src
const lottiePlayer = document.querySelector("dotlottie-player");
if (lottiePlayer) {
  const lottieSrc = getNestedValue(textData, "approach.lottieSrc");
  const lottieSpeed = getNestedValue(textData, "approach.lottieSpeed");

  if (lottieSrc) {
    lottiePlayer.setAttribute("src", lottieSrc);
  }
  if (lottieSpeed) {
    lottiePlayer.setAttribute("speed", lottieSpeed);
  }
}
