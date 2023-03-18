const Joi = require('joi');

const createUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
});

const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default { createUser, loginUser };
