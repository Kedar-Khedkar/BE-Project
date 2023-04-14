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

module.exports.Joi = BaseJoi.extend(extension);
