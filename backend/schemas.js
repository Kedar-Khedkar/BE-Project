const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

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

module.exports.userUploadSchema = Joi.object({
  /* A validation schema for user upload. */
  fullname: Joi.string()
    .trim()
    .required()
    .escapeHTML()
    .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
      name: "firstname<space>lastname [Alphabets Only]",
    }),
  email: Joi.string().trim().lowercase().email().required().escapeHTML(),
  role: Joi.string()
    .trim()
    .valid("student", "admin", "faculty")
    .required()
    .escapeHTML(),
}).required();

module.exports.studentRegister = Joi.object({
  /* A validation schema for student register. */
  user: Joi.object({
    fullname: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
        name: "firstname<space>lastname [Alphabets Only]",
      }),
    email: Joi.string().trim().lowercase().email().required().escapeHTML(),
    role: Joi.string()
      .trim()
      .lowercase()
      .valid("student")
      .required()
      .escapeHTML(),
  }).required(),
}).required();

module.exports.facultyRegister = Joi.object({
  /* A validation schema for faculty register. */
  user: Joi.object({
    fullname: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
        name: "firstname<space>lastname [Alphabets Only]",
      }),
    email: Joi.string().trim().lowercase().email().required().escapeHTML(),
    role: Joi.string()
      .trim()
      .lowercase()
      .valid("faculty")
      .required()
      .escapeHTML(),
  }).required(),
}).required();

module.exports.subjectSchema = Joi.object({
  /* A validation schema for subject. */
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
  /* A validation schema for email. */
  email: Joi.string().trim().lowercase().required().email().escapeHTML(),
});

module.exports.resetpassword = Joi.object({
  /* A validation schema for email and token. */
  email: Joi.string().trim().lowercase().required().email().escapeHTML(),
  token: Joi.string().trim().lowercase().required().escapeHTML(),
  password1: Joi.string().trim().lowercase().required().escapeHTML(),
  password2: Joi.string().trim().lowercase().required().escapeHTML(),
});

module.exports.userSchema = Joi.object({
  user: Joi.object({
    fullname: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
        name: "firstname<space>lastname [Alphabets Only]",
      }),
    email: Joi.string().trim().lowercase().email().required().escapeHTML(),
    role: Joi.string()
      .trim()
      .lowercase()
      .valid("faculty", "student", "admin")
      .required()
      .escapeHTML(),
  }).required(),
}).required();

module.exports.utSchema = Joi.object({
  unitTest: Joi.object({
    UT1: Joi.number().integer().max(50).allow(null),
    UT2: Joi.number().integer().max(50).allow(null),
    UT3: Joi.number().integer().max(50).allow(null),
    UT4: Joi.number().integer().max(50).allow(null),
    UT5: Joi.number().integer().max(50).allow(null),
    UT6: Joi.number().integer().max(50).allow(null),
    SubjectSubCode: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
    StudentUserId: Joi.number().required(),
  }).required(),
}).required();


module.exports.studentSchema = Joi.object({
  student : Joi.object({
    rollno: Joi.number().integer().required(),
    curr_sem : Joi.number().integer().max(8).required(),
    curryear: Joi.number().integer().max(5).required(),
    examseatno: Joi.string().escapeHTML().allow(null),
    prn: Joi.string().escapeHTML(),
    parents_mob_no: Joi.number(),
    parents_email: Joi.string().trim().lowercase().email().escapeHTML(),
  })
})