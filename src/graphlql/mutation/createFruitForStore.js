const { nonNull, stringArg, intArg } = require("nexus");
const { saveNewFruit } = require("../../repository/fruit.repository");
const eventEmitter = require("../../domain-event/domainEvent");
const { mongoose } = require("mongoose");

const createFruitForStore = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    description: nonNull(stringArg()),
    limit: intArg(),
  },
  async resolve(_, { name, description, limit }) {
    const session =await mongoose.startSession();
    (await session).startTransaction();
    try {
      const fruit = await saveNewFruit(
        name,
        description,
        limit
      )
     await session.commitTransaction();
      eventEmitter.emit("fruitCreated", { name, description, limit });
      return fruit;
    } catch (err) {
      (await session).abortTransaction();
      (await session).endSession();
      throw new Error(err);
    } finally {
      (await session).endSession();
    }
  },
};

module.exports = { createFruitForStore };
