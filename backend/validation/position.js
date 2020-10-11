const Validator = require("validator");
const { validText, validId } = require("./validitation-helpers");

const MIN_WAGE = 1;
const MAX_WAGE = 1000000;

const validatePositions = positionArray => {
  let errors = {};
  
  positionArray.forEach(position => {
    let pos = position;
    pos.title = validText(pos.title) ? pos.title : "";
    pos.description = validText(pos.description) ? pos.description : "";
    pos.user = validId(pos.user) ? pos.user : "";
    pos.wage = String(pos.wage) ? String(pos.wage) : -1;

    if (Validator.isEmpty(pos.title)) {
      errors.title = "Position title is required";
    }
    
    if (Validator.isEmpty(pos.description)) {
      errors.description = "Position description is required";
    }

    if (Validator.isEmpty(pos.user)) {
      errors.user = "Position user id is required";
    }

    if (!Validator.isInt(pos.wage, { min: MIN_WAGE, max: MAX_WAGE })) {
      errors.wage = `Wage needs to be a valid number between ${MIN_WAGE} and ${MAX_WAGE}`;
    }

  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}
  
module.exports = validatePositions;