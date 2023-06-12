const { queryType } = require("nexus");
const { findFruit } = require("./findFruit");

const Query = queryType({
  definition(t) {
    t.field("findFruit", findFruit);
  },
});

module.exports = { Query };
