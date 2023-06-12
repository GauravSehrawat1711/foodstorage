const { nonNull, stringArg, intArg } = require("nexus");
const {saveNewFruit}=require('../../repository/fruit.repository')
const eventEmitter = require("../../cron-job/cronjob");

const createFruitForStore = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    description: nonNull(stringArg()),
    limit: nonNull(intArg()),
  },
  async resolve(_, { name, description, limit }) {
    const fruit=await saveNewFruit(name, description, limit )
    eventEmitter.emit("fruitCreated", { name, description, limit });
    return fruit;
  },
};

module.exports = { createFruitForStore };
