const { intArg, stringArg, nonNull } = require("nexus");
const {storeCreateService}=require('../../services/store.service')
const {saveFruit}=require('../../repository/store.repository')
const {findFruits}=require('../../repository/fruit.repository')

const storeFruitToFruitStorage = {
  type: "StoreFruit",
  args: {
    name: nonNull(stringArg()),
    amount: nonNull(intArg()),
  },
  async resolve(_, { name, amount }) {
    try{

      const fruitData=await findFruits(name)
      storeCreateService(fruitData,name,amount)
      const data=await saveFruit(name,amount)
      return data;
    }catch(error){
      throw new Error(error)
    }
    
  },
};

module.exports = { storeFruitToFruitStorage };
