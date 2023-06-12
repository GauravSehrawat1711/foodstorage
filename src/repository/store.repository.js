const { StoreFruitModel } = require("../model/schema");

const findStoreFruit = async (name) => {
  const data=await StoreFruitModel.findOne({ name });
  return data
};

const saveFruit = async (name, amount) => {
  const isAlready=await  StoreFruitModel.find({name})
  console.log(isAlready)
  if(isAlready.length>0){
    throw new Error("Allready stored")
  }
   const fruit = new StoreFruitModel({
    name,
    amount,
  });
  return fruit.save();
};

const deleteStoreFruit=async(name)=>{
  await StoreFruitModel.deleteMany({ name: name });
}

module.exports = { saveFruit, findStoreFruit,deleteStoreFruit };
