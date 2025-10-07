import Joi from "joi";

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(), // stronger minimum than schema
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message,
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message,
    });
  }

  next();
};

export { signupValidation, loginValidation };
