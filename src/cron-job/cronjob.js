const EventEmitter = require("events");

const eventEmitter = new EventEmitter();
   eventEmitter.on("fruitCreated", ({ name, description, limit }) => {
    console.log(`New fruit created in this fruitList: ${name} ${description} ${limit}`);
   });

   eventEmitter.on("fruitUpdated", ({ name, description, limit }) => {
    console.log(`Fruit updated: ${name} ${description} ${limit}`);
   });

   eventEmitter.on("fruitDeleted", ({ name }) => {
    console.log(`Fruit deleted: ${name}`);
  });

module.exports = eventEmitter;
