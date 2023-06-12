const mongoose = require("mongoose");
const FruitSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  amount: {
    type:Number
  },
  description: {
    type: String,
    maxlength: 30,
  },
  limit: Number,
});

const StoreFruitSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  amount: Number,
  fruit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fruit",
  },
});
const StoreFruitModel = mongoose.model("Store", StoreFruitSchema);
const FruitModel = mongoose.model("Fruit", FruitSchema);

module.exports = { FruitModel, StoreFruitModel };
