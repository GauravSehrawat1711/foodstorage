const { makeSchema, declarativeWrappingPlugin } = require("nexus");
const { Mutation } = require("./mutation/index");
const { Fruit, StoreFruit } = require("./schemaModel");
const { Query } = require("./query/index");

const schema = makeSchema({
  types: [Fruit, StoreFruit, Query, Mutation],
  plugins: [declarativeWrappingPlugin()],
  outputs: {
    schema: __dirname + "./generated/schema.graphql",
    typegen: __dirname + "./generated/typings.ts",
  },
});

module.exports = { schema };
