const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
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

module.exports.userUploadSchema = Joi.object({
  fullname: Joi.string()
    .required()
    .escapeHTML()
    .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
      name: "firstname<space>lastname [Alphabets Only]",
    }),
  email: Joi.string().email().required().escapeHTML(),
  role: Joi.string()
    .valid("student", "admin", "faculty")
    .required()
    .escapeHTML(),
}).required();

module.exports.studentRegister = Joi.object({
  user: Joi.object({
    fullname: Joi.string()
      .required()
      .escapeHTML()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
        name: "firstname<space>lastname [Alphabets Only]",
      }),
    email: Joi.string().email().required().escapeHTML(),
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

module.exports.subjectSchema = Joi.object({
  subject: Joi.object({
    subCode: Joi.string().required().escapeHTML(),
    subName: Joi.string().required().escapeHTML(),
    pract: Joi.number().integer(),
    oral: Joi.number().integer(),
    termWork: Joi.number().integer(),
    sem: Joi.number().integer().max(8).required(),
  }),
});

module.exports.forgotpassword = Joi.object({
  email: Joi.string().required().email().escapeHTML(),
});

module.exports.resetpassword = Joi.object({
  email: Joi.string().required().email().escapeHTML(),
  token: Joi.string().required().escapeHTML(),
});
