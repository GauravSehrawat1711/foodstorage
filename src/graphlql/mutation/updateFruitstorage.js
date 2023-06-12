const { intArg, stringArg, nonNull } = require("nexus");
const eventEmitter = require("../../cron-job/cronjob");
const { findFruits, updateFruit } = require("../../repository/fruit.repository");

const updateFruitForFruitStorage = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    description: nonNull(stringArg()),
    limit: nonNull(intArg()),
  },
  async resolve(_, { name, description, limit }) {
    const fruit = await findFruits(name);
    if(!fruit){
      throw new Error('Fruit not found!')
    }
    const data = updateFruit(fruit, name, description, limit);
    eventEmitter.emit("fruitUpdated", { name, description, limit });
    return data;
  },
};

module.exports = { updateFruitForFruitStorage };
