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
    .trim()
    .required()
    .escapeHTML()
    .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
      name: "firstname<space>lastname [Alphabets Only]",
    }),
  email: Joi.string().trim().email().required().escapeHTML(),
  role: Joi.string()
    .trim()
    .valid("student", "admin", "faculty")
    .required()
    .escapeHTML(),
}).required();

module.exports.studentRegister = Joi.object({
  user: Joi.object({
    fullname: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
        name: "firstname<space>lastname [Alphabets Only]",
      }),
    email: Joi.string().trim().email().required().escapeHTML(),
    role: Joi.string().trim().valid("student").required().escapeHTML(),
  }).required(),
}).required();

module.exports.facultyRegister = Joi.object({
  user: Joi.object({
    fullname: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
        name: "firstname<space>lastname [Alphabets Only]",
      }),
    email: Joi.string().trim().email().required().escapeHTML(),
    role: Joi.string().trim().valid("faculty").required().escapeHTML(),
  }).required(),
}).required();

module.exports.subjectSchema = Joi.object({
  subject: Joi.object({
    subCode: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
    subName: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^(?![0-9]*$)[A-z- 0-9]+$/, {
        name: "AlphaNumeric but not only numeric ('-' allowed)",
      }),
    pract: Joi.number().integer(),
    oral: Joi.number().integer(),
    termWork: Joi.number().integer(),
    sem: Joi.number().integer().max(8).required(),
  }),
});

module.exports.forgotpassword = Joi.object({
  email: Joi.string().trim().required().email().escapeHTML(),
});

module.exports.resetpassword = Joi.object({
  email: Joi.string().trim().required().email().escapeHTML(),
  token: Joi.string().trim().required().escapeHTML(),
});
