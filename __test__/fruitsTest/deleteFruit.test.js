const axios = require("axios");
const apiUrl = "http://localhost:4000/";

test("deletes the lemon fruit from fruit storage with force delete", async () => {
  const deleteQuery = `
  mutation {
    deleteFruitFromFruitStorage(name: "staaa", forceDelete:    true) {
      name
    }
  }
  `;
  const response = await axios.post(apiUrl, { query: deleteQuery });

  expect(response.data).toMatchObject({
    data: {
      deleteFruitFromFruitStorage: {
        name: "staaa",
      },
    },
  });
});
