class CommonError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends CommonError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends CommonError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends CommonError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class EmailInUseError extends CommonError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class UserNotFoundError extends CommonError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  CommonError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  EmailInUseError,
  UserNotFoundError,
};
