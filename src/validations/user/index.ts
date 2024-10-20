import Joi from "joi";
import { password } from "../common";

const getUserById = {
  query: Joi.object().keys({
    id: Joi.string().guid(),
  }),
};

const create = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    gender: Joi.boolean().required(),
    userName: Joi.string().max(255).required(),
    firstName: Joi.string().max(255),
    lastName: Joi.string().max(255),
    dateOfBirth: Joi.date(),
    phone: Joi.string().max(50).required(),
  }),
};

export default { getUserById, create };
