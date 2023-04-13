const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");
const ExpressError = require("../utils/ExpressError");

const extension = (joi) => ({
  /**
   * It takes a Joi instance as an argument, and returns an object that defines a new Joi type called
   * "string", which is based on the existing Joi string type, and which adds a new rule called
   * "escapeHTML" that uses the sanitize-html library to remove any HTML tags from the string
   *
   * Args:
   *   joi: The Joi instance.
   *
   * Returns:
   *   A function that returns an object.
   */
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML":
      "WARNING: {{#label}} must not include HTML, This instance will be reported.",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const attend = Joi.object({
  StudentUserId: Joi.number().required(),
  presentee: Joi.boolean().required(),
  SubjectSubCode: Joi.string()
    .trim()
    .required()
    .escapeHTML()
    .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
  createdAt: Joi.date().required(),
}).required();

module.exports.validateUpdateReq = (req, res, next) => {
  const { error } = attend.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const attendMultiple = Joi.array()
  .items(
    Joi.object({
      StudentUserId: Joi.number().required(),
      presentee: Joi.boolean().required(),
      SubjectSubCode: Joi.string()
        .trim()
        .required()
        .escapeHTML()
        .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
      createdAt: Joi.date().required(),
    }).required()
  )
  .required();

module.exports.validateMultiple = (req, res, next) => {
  const { error } = attendMultiple.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const getAttendance = Joi.object({
  filters: Joi.object({
    for: Joi.date().required(),
    subject: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
  }).required(),
});

module.exports.validateSearchReq = (req, res, next) => {
  const { error } = getAttendance.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
