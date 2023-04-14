const { Joi } = require("./joiExtension");
const ExpressError = require("../utils/ExpressError");

const cropCoordinates = Joi.object({
  coords: Joi.array()
    .items(Joi.array().items(Joi.number()).min(4).max(4).required())
    .min(1)
    .required(),
  seatnos: Joi.array()
    .items(Joi.array().items(Joi.number()).min(4).max(4).required())
    .min(1)
    .required(),
  pages: Joi.number().min(1).required(),
  name: Joi.string()
    .pattern(
      /^public\/uploads\/[a-zA-Z0-9]+[^!@#$%^&*(),.?":{}|<>~`'\\\/]+\.pdf$/,
      { name: "Upload path" }
    )
    .escapeHTML()
    .required(),
  image: Joi.string()
    .pattern(/^\d+.jpeg$/, { name: "Image path" })
    .escapeHTML()
    .required(),
}).required();

module.exports.validateCoords = (req, res, next) => {
  const { error } = cropCoordinates.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
