
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
      return response.status(406).json(errors);
    }
    if (!errors.error) {
      errors.error = { message: error.errors[0].message };
      return response.status(406).json(errors);
    }
  },

  validateRecipeIdErrors(error, response) {
    const errors = {};
    if (error.parent.routine === 'string_to_uuid') {
      errors.error = { message: 'Invalid Recipe ID' };
      response.status(406).json(errors);
    }
    if (!errors.error) {
      errors.error = { message: 'Something Went Wrong' };
      response.status(500).json(errors);
    }
  },
};

export default errorHandling;
