const ObjectId = require('mongoose').Types.ObjectId;

const validText = str => {
  return typeof str === 'string' && str.trim().length > 0;
}

const validId = id => {
  return ObjectId.isValid(id);
}

const validArray = arr => {
  return arr && arr.length && arr.length > 0;
}

const validDate = str => {
  const date = new Date(str);
  return date.getTime();
}

module.exports = {
  validText,
  validDate,
  validArray,
  validId
};