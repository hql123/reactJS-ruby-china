/* eslint-disable */
const addPrototype = () => {
  Array.prototype.group = function(key) {
    var result = {};
    this.map(item => ({section: key(item), value: item})).forEach(item => {
      result[item.section] = result[item.section] || [];
      result[item.section].push(item.value);
    });
    return Object.keys(result).map(item => ({section: item, data: result[item]}));
  }
}
module.exports = {
  addPrototype
}
