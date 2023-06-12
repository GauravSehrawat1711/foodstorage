const { ApolloServer } = require("@apollo/server");
const {schema} = require("./graphlql/schema");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connectDB = require("./config/dbConfig");
require("dotenv").config();


async function startApolloServer() {
  const server = new ApolloServer({ schema });
  await connectDB();
  await startStandaloneServer(server, {listen: { port: 4000 },
  }).then(()=>{
    console.log("connected")
  })
}

startApolloServer()
