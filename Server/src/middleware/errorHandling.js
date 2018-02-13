
/**
   * @description error methods to handle exceptions and validate fields
   *
   * @function errorHandling
   *
   * @param {object} request HTTP request
   * @param {object} respons HTTP response
   * @param {function} next
   *
   * @returns { object } response message object
   */
const errorHandling = {
  validateFields(request, response, next) {
    const {
      Email, UserName, FullName, Password, ConfirmPassword
    } = request.body;
    const errors = {};
    if (!Email || Email.trim().length === 0) {
      errors.error = { message: 'Email Field should not be Empty' };
    } else if (!UserName || UserName.trim().length === 0) {
      errors.error = { message: 'Username Field should not be Empty' };
    } else if (!FullName || FullName.trim().length === 0) {
      errors.error = { message: 'Fullname Field should not be Empty' };
    } else if (!Password) {
      errors.error = { message: 'Password Field should not be Empty' };
    } else if (Password !== ConfirmPassword) {
      errors.error = { message: 'Password Mismatch!' };
    } else {
      next();
    }
    return response.status(406).json(errors);
  },

  validateErrors(error, response) {
    const errors = {};
    if (error.errors[0].message === 'username must be unique') {
      errors.error = { message: 'Username already exists' };
    }
    if (error.errors[0].message === 'email must be unique') {
      errors.error = { message: 'Email already exists' };
    }
    if (error.errors[0].message === 'enter a Valid Email') {
      errors.err = { message: 'Not an email' };
    }
    if (!errors.error) {
      errors.error = { message: error.errors[0].message };
    }
    return response.status(409).json(errors);
  }
};

export default errorHandling;
