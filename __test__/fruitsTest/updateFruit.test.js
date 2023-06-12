const axios = require("axios");
const apiUrl = "http://localhost:4000/";

test("update an oo fruit successfully", async () => {
  const query = `
    mutation {
        updateFruitForFruitStorage(name: "yellow", description: "updated lemon", limit: 10) {
          name
          description
          limit
        }
      }
    `;
  const response = await axios.post(apiUrl, { query });

  expect(response.data).toMatchObject({
    data: {
      updateFruitForFruitStorage: {
        name: "yellow",
        description: "updated lemon",
        limit: 10,
      },
    },
  });
});

test("fails to create a orange fruit with a long description", async () => {
  const query = `
    mutation {
        updateFruitForFruitStorage(name: "yellow", description: "updated lemonewnrkjwnernwerkjwernjkwerjnk", limit: 10) {
          name
          description
          limit
        }
      }
    `;
  const response = await axios.post(apiUrl, { query });

  expect(response.data.errors).toBeDefined();
});
