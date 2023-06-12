const { intArg, stringArg, nonNull } = require("nexus");
const eventEmitter = require("../../domain-event/domainEvent");
const {
  findFruits,
  updateFruit,
} = require("../../repository/fruit.repository");
const { default: mongoose } = require("mongoose");

const updateFruitForFruitStorage = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    description: stringArg(),
    limit: intArg(),
  },
  async resolve(_, { name, description, limit }) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      const fruit = await findFruits(name);
      if (!fruit) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error("Fruit not found!");
      }
      
      const data = updateFruit(fruit, name, description, limit);
      await session.commitTransaction()
      eventEmitter.emit("fruitUpdated", { name, description, limit });
      return data;
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    } finally {
      await session.endSession();
    }
  },
};

module.exports = { updateFruitForFruitStorage };
