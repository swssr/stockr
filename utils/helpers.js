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

module.exports = {
  calcTotal,
  removeDuplicates
};
