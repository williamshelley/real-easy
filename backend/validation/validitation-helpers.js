
const validText = str => {
  return typeof str === 'string' && str.trim().length > 0;
}

const validDate = str => {
  const date = new Date(str);
  return date.getTime();
}

module.exports = {
  validText,
  validDate
};