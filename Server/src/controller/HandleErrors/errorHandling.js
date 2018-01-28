
const errorHandling = {
  validateSignupErrors(error, response) {
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
  },

  validateRecipeIdErrors(error, response) {
    const errors = {};
    if (error.parent.routine === 'string_to_uuid') {
      errors.error = { message: 'Invalid Recipe ID' };
      response.status(406).json(errors);
    }
    if (error.parent.routine === 'string_to_uuid') {
      errors[0] = { message: 'Invalid Recipe ID' };
      response.status(406).send(errors);
    }
    if (error.parent.routine === 'ri_ReportViolation') {
      errors[0] = { message: 'User not found' };
      response.status(406).send(errors);
    }
    if (!errors.error) {
      errors.error = { message: 'Something Went Wrong' };
      response.status(500).json(errors);
    }
  },
};

export default errorHandling;
