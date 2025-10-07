const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().min(1).max(255).required(), // not null
  lastName: Joi.string().min(1).max(255).required(),  // not null
  email: Joi.string().email().max(255).required()     // unique + not null
});

module.exports = { userSchema };
