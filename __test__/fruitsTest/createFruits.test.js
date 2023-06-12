const axios = require("axios");

const apiUrl = "http://localhost:4000/";
let createdFruitName;

test("creates a fruit successfully", async () => {
  const query = `
      mutation {
        createFruitForFruitStorage(name: "oo", description: "this is a oo", limit: 10) {
          description
          limit
          name
        }
      }
    `;
  const response = await axios.post(apiUrl, { query });
  createdFruitName = response?.data?.data?.createFruitForFruitStorage?.name;

  expect(response.data).toMatchObject({
    data: {
      createFruitForFruitStorage: {
        description: "this is a oo",
        limit: 10,
        name: "oo",
      },
    },
  });
});

test("fails to create a  fruit with a long description", async () => {
  const query = `
    mutation {
      createFruitForFruitStorage(name: "yello22", description: "this is a fruit with a very long description", limit: 10) {
        description
        limit
        name
      }
    }
  `;
  const response = await axios.post(apiUrl, { query });

  expect(response.data.errors).toBeDefined();
});

test("fails to create duplicate fruit", async () => {
  const query = `
    mutation {
      createFruitForFruitStorage(name: "oo", description: "this is a oo", limit: 10) {
        description
        limit
        name
      }
    }
  `;

  try {
    await axios.post(apiUrl, { query });
    await axios.post(apiUrl, { query });
  } catch (error) {
    expect(error.response.data.errors).toBeDefined();
  }
});

afterAll(async () => {
  if (createdFruitName) {
    const deleteQuery = `
        mutation {
          deleteFruitFromFruitStorage(name: "${createdFruitName}", forceDelete: true) {
            name
            limit
          }
        }
      `;
    await axios.post(apiUrl, { query: deleteQuery });
    console.log(`Deleted fruit with name: ${createdFruitName}`);
  }
});
