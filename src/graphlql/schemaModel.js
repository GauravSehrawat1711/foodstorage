const { objectType } = require("nexus");

const Fruit = objectType({
  name: "Fruit",
  definition(t) {
    t.string("name");
    t.string("description");
    t.int("limit");
  },
});

const StoreFruit = objectType({
  name: "StoreFruit",
  definition(t) {
    t.nonNull.string("name");
    t.int("amount");
  },
});

module.exports = { Fruit, StoreFruit };
