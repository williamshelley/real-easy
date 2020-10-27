const Validator = require("validator");
const { validText, validId } = require("./validitation-helpers");

const MIN_WAGE = 1;
const MAX_WAGE = 1000000;

const validateOnePosition = data => {
  let errors = {};

  data.title = validText(data.title) ? data.title : "";
  data.description = validText(data.description) ? data.description : "";
  data.wage = String(data.wage) ? String(data.wage) : -1;

  if (Validator.isEmpty(data.title)) {
    errors.title = "Position title is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Position description is required";
  }

  if (!Validator.isInt(data.wage, { min: MIN_WAGE, max: MAX_WAGE })) {
    errors.wage = `Wage needs to be a valid number between ${MIN_WAGE} and ${MAX_WAGE}`;
  }

  return {
    errors,
    isValid: Object.values(errors).length === 0
  }
}

const validatePositions = data => {
  let errors = {};
  data.forEach((position, idx) => {
    let validation = validateOnePosition(position);
    if (!validation.isValid) {
      errors[idx] = validation.errors;
    }
  });

  return {
    errors,
    isValid: Object.values(errors).length === 0
  }
}

module.exports = validatePositions;