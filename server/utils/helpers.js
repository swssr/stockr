const mongoose = require("mongoose");

function calcTotal(arr = [], initialTotal) {
  let accumulator = initialTotal || 0;
  for (const item of arr) {
    accumulator += item.subTotal;
  }
  return accumulator;
}

function removeDuplicates(array, prop) {
  const result = [];
  const map = new Map();
  for (const item of array) {
    if (!map.has(item[prop])) {
      map.set(item[prop], true);
      result.push({ ...item });
    }
  }
  return result;
}

/** Handy inheritance/extender function.
 * Creates new Schema then assigns the properties of parent schema.
 * */
const extendSchema = (_Schema, obj) =>
  new mongoose.Schema(Object.assign({}, _Schema.obj, obj));

module.exports = {
  extendSchema,
  calcTotal,
  removeDuplicates
};
