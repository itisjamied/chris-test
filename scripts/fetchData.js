const { createClient } = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

const client = createClient({
  projectId: "wfwxz1rq", // your project ID
  dataset: "production", // your dataset name
  apiVersion: "2022-06-01", // use a specific API version
  useCdn: false, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source).url();
}

// Query to fetch team members
const query = `*[_type == "teamMember"] {
  "title": title,
  "name": name,
  "imgSrc": imgSrc.asset->url,
  "bio": bio,
  "clients": clients{
    "title": title,
    "categories": categories[] {
      "name": name,
      "list": list
    }
  },
  "contact": contact {
    "methods": methods[] {
      "name": name,
      "link": link,
      "display": display
    }
  }
}`;

client
  .fetch(query)
  .then((teamMembers) => {
    // Transform the fetched data into the required format
    const transformedTeamData = {};

    teamMembers.forEach((member, index) => {
      const memberId = `member${String(index + 1).padStart(2, "0")}`;
      transformedTeamData[memberId] = {
        name: member.name,
        title: member.title,
        imgSrc: member.imgSrc || "", // Provide a default value if imgSrc is null
        bio: member.bio || "", // Provide a default value if bio is null
        clients: {
          title: member.clients?.title || "Select Clients:",
          category01: member.clients?.categories?.[0]
            ? {
                name: member.clients.categories[0].name || "",
                list: member.clients.categories[0].list || "",
              }
            : { name: "", list: "" },
          category02: member.clients?.categories?.[1]
            ? {
                name: member.clients.categories[1].name || "",
                list: member.clients.categories[1].list || "",
              }
            : { name: "", list: "" },
          category03: member.clients?.categories?.[2]
            ? {
                name: member.clients.categories[2].name || "",
                list: member.clients.categories[2].list || "",
              }
            : { name: "", list: "" },
        },
        contact: {
          method01: member.contact?.methods?.[0]
            ? {
                name: member.contact.methods[0].name || "",
                link: member.contact.methods[0].link || "",
                display: member.contact.methods[0].display || "",
              }
            : { name: "", link: "", display: "" },
          method02: member.contact?.methods?.[1]
            ? {
                name: member.contact.methods[1].name || "",
                link: member.contact.methods[1].link || "",
                display: member.contact.methods[1].display || "",
              }
            : { name: "", link: "", display: "" },
        },
      };
    });

    console.log(
      "Transformed Team Data:",
      JSON.stringify(transformedTeamData, null, 2)
    );
  })
  .catch((err) => {
    console.error("Error fetching team members:", err);
  });
