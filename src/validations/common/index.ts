import Joi from "joi";

export const password = (value: string, helpers: Joi.CustomHelpers) => {
  if (value.length < 8) {
    return helpers.error("any.min", { limit: 8 });
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error("string.pattern.base", {
      name: "password",
      pattern: "at least 1 letter and 1 number",
    });
  }
  return value;
};
