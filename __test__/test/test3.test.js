const axios = require('axios');

const apiUrl = 'http://localhost:4000/'; // Replace with your GraphQL server URL

// Seeding the database with 5 lemons for the test case
beforeAll(async () => {
  const seedQuery = `
    mutation {
      createFruitForFruitStorage(name: "lemon", description: "this is a lemon", limit: 10) {
        limit
        name
      }
    }
  `;
  await axios.post(apiUrl, { query: seedQuery });
});

test('stores 10 lemons to fruit storage successfully', async () => {
  const storeQuery = `mutation {
    storeFruitToFruitStorage(name: "lemon", amount: 10) {
      name
      amount
    }
  }
  `;
  const response = await axios.post(apiUrl, { query: storeQuery });

  expect(response.data).toMatchObject({
    "data": {
      "storeFruitToFruitStorage": {
        "name": "lemon",
        "amount": 10
      }
    }
  });
});

test('fails to store 11 lemons to fruit storage', async () => {
  const storeQuery = `
    mutation {
      storeFruitToFruitStorage(name: "lemon", amount: 11) {
        name
        amount
      }
    }
  `;
  const response = await axios.post(apiUrl, { query: storeQuery });

  expect(response.data.errors).toBeDefined();
});


test("For testing the find the fruit query.", async () => {
  const query = `mutation {
    removeFruitFromFruitStorage(name: "lemon", amount: 1) {
      name
      amount  
    }
  }
  `;
  const response = await axios.post(apiUrl, { query });
  expect(response.data).toMatchObject({
    "data": {
      "removeFruitFromFruitStorage": {
        "name": "lemon",
        "amount": 9
      }
    }
  });
});

test("For testing the find the fruit query when fruit is not available.", async () => {
  const query = `mutation {
    removeFruitFromFruitStorage(name: "lemon", amount: 12) {
      name
      amount
  
    }
  }
  `;
  const response = await axios.post(apiUrl, { query });
  expect(response.data.errors).toMatchObject({});
});

test('deletes the lemon fruit from fruit storage with force delete', async () => {
  const deleteQuery = `
  mutation {
    deleteFruitFromFruitStorage(name: "lemon", forceDelete:    true) {
      name
    }
  }
  `;
  const response = await axios.post(apiUrl, { query: deleteQuery });

  expect(response.data).toMatchObject({
    "data": {
      "deleteFruitFromFruitStorage": {
        "name": "lemon"
      }
    }
  });
});



test('deletes the lemon fruit from fruit storage without force delete', async () => {
  const seedQuery = `
    mutation {
      createFruitForFruitStorage(name: "lemon", description: "this is a lemon", limit: 10) {
        limit
        name
      }
    }
  `;
  await axios.post(apiUrl, { query: seedQuery });
  const deleteQuery = `
  mutation {
    deleteFruitFromFruitStorage(name: "lemon") {
      name
    }
  }
  `;
  const response = await axios.post(apiUrl, { query: deleteQuery });

  expect(response.data).toMatchObject({
    "data": {
      "deleteFruitFromFruitStorage": {
        "name": "lemon"
      }
    }
  });
});