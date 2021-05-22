const errorHandler = error => {
  if (error.errors.length) {
    const errorMsg = error.errors[0];

    if (errorMsg.message.includes('must be unique')) {
      return `${errorMsg.path.split('.').pop()} must be unique`;
    }
    if (errorMsg.message.includes('cannot be null')) {
      return `${errorMsg.path} cannot be null`;
    }
    if (errorMsg.message.startsWith('Validation')) {
      if (errorMsg.message.includes('isEmail'))
        return "email must be 'example@example.com' format";
      if (errorMsg.message.includes('notEmpty'))
        return `${errorMsg.path} must not be empty`;
    }
  }
};

module.exports = { errorHandler };
