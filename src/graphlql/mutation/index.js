const { extendType } = require("nexus");
const { createFruitForStore } = require("./createFruitForStore");
const { storeFruitToFruitStorage } = require("./storeFruitFruitStorage");
const { removeFruitFromFruitStorage } = require("./removeFruitStorage");
const { updateFruitForFruitStorage } = require("./updateFruitstorage");
const { deleteFruitFromFruitStorage } = require("./deleteFruitFromStore");

const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createFruitForFruitStorage", createFruitForStore);
    t.field("storeFruitToFruitStorage", storeFruitToFruitStorage);
    t.field("removeFruitFromFruitStorage", removeFruitFromFruitStorage);
    t.field("updateFruitForFruitStorage", updateFruitForFruitStorage);
    t.field("deleteFruitFromFruitStorage", deleteFruitFromFruitStorage);
  },
});

module.exports = { Mutation };
