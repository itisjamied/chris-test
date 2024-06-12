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
const query = '*[_type == "teamMember"] {title, name, bio, imgSrc}';

client
  .fetch(query)
  .then((teamMembers) => {
    const teamMembersWithImageUrls = teamMembers.map((member) => ({
      ...member,
      imgSrc: member.imgSrc ? urlFor(member.imgSrc) : null,
    }));

    console.log("Team Members:", teamMembersWithImageUrls);
  })
  .catch((err) => {
    console.error("Error fetching team members:", err);
  });
