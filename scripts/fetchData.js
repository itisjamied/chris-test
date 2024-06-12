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
    // Transform the clients' categories to ensure they are strings
    const teamMembersWithTransformedClients = teamMembers.map((member) => {
      if (member.clients && member.clients.categories) {
        member.clients.categories = member.clients.categories.map(
          (category) => ({
            ...category,
            name: category.name ? String(category.name) : null,
            list: category.list ? String(category.list) : null,
          })
        );
      }
      return member;
    });

    console.log(
      "Team Members:",
      JSON.stringify(teamMembersWithTransformedClients, null, 2)
    );
  })
  .catch((err) => {
    console.error("Error fetching team members:", err);
  });
