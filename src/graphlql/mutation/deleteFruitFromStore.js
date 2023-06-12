const { booleanArg, stringArg, nonNull } = require("nexus");
const eventEmitter = require("../../cron-job/cronjob");
const {
  findFruits,
  deleteFruit,
  deleteSoftFruit,
} = require("../../repository/fruit.repository");
const { deleteStoreFruit } = require("../../repository/store.repository");

const deleteFruitFromFruitStorage = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    forceDelete: booleanArg(),
  },
  async resolve(_, { name, forceDelete }) {
    const fruit = await findFruits(name);
    if (!fruit) {
      throw new Error(`Fruit with name ${name} not found.`);
    }

    if (forceDelete) {
      await deleteFruit(fruit);
      await deleteStoreFruit(name);
    } else {
      fruit.amount = 0;
      await deleteSoftFruit(fruit);
    }
    eventEmitter.emit("fruitDeleted", { name });
    return fruit;
  },
};

module.exports = { deleteFruitFromFruitStorage };
