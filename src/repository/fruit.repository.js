const { FruitModel } = require("../model/schema");

const findFruits = async (name) => {
  const data = await FruitModel.findOne({ name });
  return data;
};

const saveNewFruit = async (name, description, limit) => {
  const isAlready=await FruitModel.find({name})
    if(isAlready?.length>0){
    throw new Error("Already exists")
  }
  const fruit = new  FruitModel({
    name,
    description,
    limit,
  }).save()
  return fruit;
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
