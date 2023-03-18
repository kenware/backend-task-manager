const Joi = require('joi');

const task = Joi.object({
  title: Joi.string().required(),
  status: Joi.string().required(),
  description: Joi.string(),
});

export default task;
