const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
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

module.exports.userUploadSchema = Joi.object({
  fullname: Joi.string().required().escapeHTML(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .escapeHTML(),
  role: Joi.string()
    .valid("student", "admin", "faculty")
    .required()
    .escapeHTML(),
}).required();

module.exports.studentRegister = Joi.object({
  user: Joi.object({
    fullname: Joi.string().required().escapeHTML(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required()
      .escapeHTML(),
    role: Joi.string().valid("student").required().escapeHTML(),
  }).required(),
}).required();

module.exports.facultyRegister = Joi.object({
  user: Joi.object({
    fullname: Joi.string().required().escapeHTML(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required()
      .escapeHTML(),
    role: Joi.string().valid("faculty").required().escapeHTML(),
  }).required(),
}).required();
