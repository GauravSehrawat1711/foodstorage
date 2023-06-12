const { stringArg, nonNull } = require("nexus");
const { findFruits } = require("../../repository/fruit.repository");

const findFruit = {
  type: "Fruit",
  nullable: true,
  args: {
    name: nonNull(stringArg()),
  },
  async resolve(_, { name }) {
    const fruit = await findFruits(name);
    if (fruit === null) {
      throw new Error(`Fruit not found.`);
    }
    return fruit;
  },
};
module.exports = { findFruit };
