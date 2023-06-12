const axios = require("axios");
const apiUrl = "http://localhost:4000/";

test("For testing the find the fruit query.", async () => {
  const query = `
    query{
      findFruit(name: "yellow") {
          description
          limit
          name
        }
      }
  `;
  const response = await axios.post(apiUrl, { query });
  expect(response.data).toMatchObject({
    "data": {
      "findFruit": {
        "name": "yellow",
        "description": "updated lemon",
        "limit": 10
      }
    }
  });
});

test("For testing the find the fruit query when fruit is not available.", async () => {
  const query = `
    query{
      findFruit(name: "sad") {
          description
          limit
          name
        }
      }
  `;
  const response = await axios.post(apiUrl, { query });
  expect(response.data.errors).toMatchObject({});
});