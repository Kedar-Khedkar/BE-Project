module.exports = (func) => {
  /* A function that takes in a function as an argument and returns a function that takes in a middleware while catching any asyncronous errors using catch. */
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
