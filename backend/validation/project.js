const Validator = require("validator");
const validatePositions = require("./position");
const { validText, validArray } = require("./validitation-helpers");

const validateProject = data => {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.description = validText(data.description) ? data.description : "";
  data.positions = validArray(data.positions) ? data.positions : [];


  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  const positions = validatePositions(data.positions);
  if (!positions.isValid) {
    errors.positions = positions.errors;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

module.exports = validateProject;