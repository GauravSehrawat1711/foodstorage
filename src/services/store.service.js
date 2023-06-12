const storeCreateService = (fruitData, name, amount) => {
  if (fruitData === null) {
    throw new Error(`${name} not found in fruitList.`);
  }
  if (fruitData?.limit < amount) {
    throw new Error(
      `${name} amount cannot be exceed the ${fruitData?.limit} limit as mentioned in fruitList.`
    );
  }
  if (amount < 0) {
    throw new Error(`Amount cannot be negative.`);
  }
};

const storeRemoveService = (fruitData, name, amount) => {
  if (fruitData?.limit < amount) {
    throw new Error(
      `cannot remove ${name}  as amount is more the ${fruitData?.limit} limit in fruitList.`
    );
  }
};

const storeDeductionFruit = async (fruit, amount, name) => {
  if (amount < 0) {
    throw new Error(`Amount cannot be negative.`);
  }
  let remaining = fruit.amount;

  fruit.amount -= amount;
  if (fruit.amount < 0) {
    throw new Error(
      `Removal of amount of fruit is failed as ${remaining} ${name} are remaining in store.`
    );
  }
  const data = await fruit.save();
  return data;
};

module.exports = {
  storeCreateService,
  storeRemoveService,
  storeDeductionFruit,
};
