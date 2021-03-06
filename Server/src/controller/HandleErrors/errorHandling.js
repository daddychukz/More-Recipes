
const errorHandling = {
  validateSignupErrors(error, response) {
    const errors = {};
    if (error.errors[0].message === 'username must be unique') {
      errors.error = { message: 'Username already exists' };
      return response.status(409).json(errors);
    }
    if (error.errors[0].message === 'email must be unique') {
      errors.error = { message: 'Email already exists' };
      return response.status(409).json(errors);
    }
    if (error.errors[0].message === 'Enter a Valid Email') {
      errors.error = { message: 'Not an email' };
      return response.status(409).json(errors);
    }
    if (error.errors[0].message === 'Full name must only contain letters') {
      errors.error = { message: 'Full name must only contain letters' };
      return response.status(400).json(errors);
    }
  },

  validateRecipeIdErrors(error, response) {
    const errors = {};
    if (error.parent.routine === 'string_to_uuid') {
      errors.error = { message: 'Invalid Recipe ID' };
      response.status(400).json(errors);
    }
    if (error.parent.routine === 'ri_ReportViolation') {
      errors.error = { message: 'Wrong Recipe Id' };
      response.status(400).json(errors);
    }
  },
};

export default errorHandling;
