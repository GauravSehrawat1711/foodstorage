const { booleanArg, stringArg, nonNull } = require("nexus");
const eventEmitter = require("../../domain-event/domainEvent");
const {
  findFruits,
  deleteFruit,
  deleteSoftFruit,
} = require("../../repository/fruit.repository");
const { deleteStoreFruit } = require("../../repository/store.repository");
const { default: mongoose } = require("mongoose");

const deleteFruitFromFruitStorage = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    forceDelete: booleanArg(),
  },
  async resolve(_, { name, forceDelete }) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    const fruit = await findFruits(name);
    try{

      if (!fruit) {
        await session.abortTransaction();
        await session.endSession();
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
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
      } finally {
        await session.endSession();
      }
    },
};

module.exports = { deleteFruitFromFruitStorage };
