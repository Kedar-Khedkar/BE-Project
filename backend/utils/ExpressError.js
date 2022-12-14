/* The ExpressError class is a subclass of the built-in Error class. It has a constructor that takes a
message and a status code and assigns them to the instance's message and statusCode properties. */
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
