const { FruitModel } = require("../model/schema");

const findFruits = async (name) => {
  const data = await FruitModel.findOne({ name });
  return data;
};

const saveNewFruit = (name, description, limit) => {
  const fruit = new FruitModel({
    name,
    description,
    limit,
  });
  return fruit.save();
};

const updateFruit = async (fruit, name, description, limit) => {
  fruit.name = name;
  fruit.description = description;
  fruit.limit = limit;
  const data = await fruit.save();
  return data;
};

const deleteFruit = async (fruit) => {
  await fruit.deleteOne();
};

const deleteSoftFruit = async (fruit) => {
  await fruit.save();
};
module.exports = {
  findFruits,
  saveNewFruit,
  updateFruit,
  deleteFruit,
  deleteSoftFruit,
};
