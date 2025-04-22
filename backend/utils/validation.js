// backend/utils/validation.js
// this imported function will gather errors and saves them in an array
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  // validationRecult will check the check the validation errors
  const validationErrors = validationResult(req);

  // check if the array is empty or not and if there are erros that happen they will turn them into
//  error objs and pass them to the handlevalidationerror function
  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  // if no errors it will cont to either a new route handler or middlaware validation checker
  next();
};

module.exports = {
  handleValidationErrors
};
