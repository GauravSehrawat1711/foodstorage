const axios = require("axios");
const apiUrl = "http://localhost:4000/";

test("For testing the find the fruit query.", async () => {
  const query = `mutation {
    removeFruitFromFruitStorage(name: "staa", amount: 1) {
      name
      amount
      }
  }
  `;
  const response = await axios.post(apiUrl, { query });
  expect(response.data).toMatchObject({
    data: {
      removeFruitFromFruitStorage: {
        name: "staa",
        amount: 0,
      },
    },
  });
});

test("For testing the find the fruit query when fruit is not available.", async () => {
  const query = `mutation {
    removeFruitFromFruitStorage(name: "staa", amount: 1) {
      name
      amount
  
    }
  }
  `;
  const response = await axios.post(apiUrl, { query });
  expect(response.data.errors).toMatchObject({});
});
