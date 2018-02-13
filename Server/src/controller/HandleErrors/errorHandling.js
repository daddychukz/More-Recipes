
const errorHandling = {
  validateRecipeIdErrors(error, response) {
    const errors = {};
    if (error.parent.routine === 'string_to_uuid') {
      errors.error = { message: 'Invalid Recipe ID' };
      response.status(400).json(errors);
    }
    if (error.parent.routine === 'ri_ReportViolation') {
      errors.error = { message: 'Invalid Recipe ID' };
      response.status(400).json(errors);
    }
    if (!errors.error) {
      errors.error = { message: 'Something Went Wrong' };
      response.status(500).json(errors);
    }
  },
};

export default errorHandling;
