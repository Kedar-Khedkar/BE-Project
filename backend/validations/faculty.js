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

const facultyRegister = Joi.object({
  /* A validation schema for faculty register. */
  user: Joi.object({
    fullname: Joi.string().trim().required().escapeHTML(),
    // .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
    //   name: "firstname<space>lastname [Alphabets Only]",
    // }),
    email: Joi.string().trim().lowercase().email().required().escapeHTML(),
    role: Joi.string()
      .trim()
      .lowercase()
      .valid("faculty")
      .required()
      .escapeHTML(),
  }).required(),
}).required();

module.exports.validateFaculty = (req, res, next) => {
  const { error } = facultyRegister.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const claimSchema = Joi.object({
  subIds: Joi.array()
    .items(
      Joi.string()
        .trim()
        .required()
        .escapeHTML()
        .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" })
        .required()
    )
    .required(),
});

module.exports.validateClaimReq = (req, res, next) => {
  const { error } = claimSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
