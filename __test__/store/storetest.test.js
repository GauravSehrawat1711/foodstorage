const axios = require("axios");
const apiUrl = "http://localhost:4000/";

test("For testing the find the fruit query.", async () => {
  const query = `
  mutation {
    storeFruitToFruitStorage(name: "staaa", amount: 24) {
      name
      amount
    }
  }
  
  `;
  const response = await axios.post(apiUrl, { query });
  expect(response.data).toMatchObject({
    data: {
      storeFruitToFruitStorage: {
        name: "staa",
        amount: 10,
      },
    },
  });
});

test("For testing the find the fruit query when fruit is not available.", async () => {
  const query = `
  mutation {
    storeFruitToFruitStorage(name: "staa", amount: 10) {
      name
      amount
    }
  }
  `;
  const response = await axios.post(apiUrl, { query });
  expect(response.data.errors).toMatchObject({});
});
