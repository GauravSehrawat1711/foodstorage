const { intArg, stringArg, nonNull } = require("nexus");
const {
  storeRemoveService,
  storeDeductionFruit,
} = require("../../services/store.service");
const { findFruits } = require("../../repository/fruit.repository");
const { findStoreFruit } = require("../../repository/store.repository");
const removeFruitFromFruitStorage = {
  type: "StoreFruit",
  args: {
    name: nonNull(stringArg()),
    amount: nonNull(intArg()),
  },
  async resolve(_, { name, amount }) {
    const fruitData = await findFruits(name);
    storeRemoveService(fruitData, name, amount);
    const fruit = await findStoreFruit(name);
    if (!fruit) {
      throw new Error("Fruit not found");
    }
    const data = storeDeductionFruit(fruit, amount, name);
    return data;
  },
};

module.exports = { removeFruitFromFruitStorage };
