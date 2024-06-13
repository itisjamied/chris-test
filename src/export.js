// index.js

// const fetchTeamData = require("./fetchData");
import fetchTeamData from "./fetchData.js"

(async () => {
  try {
    const teamData = await fetchTeamData();
    console.log("teamData:", JSON.stringify(teamData, null, 2));

    // Export the fetched data
    // module.exports = {
    //   teamData,
    // };
  } catch (err) {
    console.error("Error:", err);
  }
})();

export default {teamData};

