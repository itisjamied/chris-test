const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "wfwxz1rq", // your project ID
  dataset: "production", // your dataset name
  apiVersion: "2022-06-01", // use a specific API version
  useCdn: false, // `false` if you want to ensure fresh data
});

// Query to fetch team members
const query = '*[_type == "teamMember"] {title, name, bio, imgSrc}';

client
  .fetch(query)
  .then((teamMembers) => {
    console.log("Team Members:", teamMembers);
  })
  .catch((err) => {
    console.error("Error fetching team members:", err);
  });
