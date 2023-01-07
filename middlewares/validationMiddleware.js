const Joi = require('joi');

const contactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
      .required(),
    favorite: Joi.boolean(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

const updateValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
    favorite: Joi.boolean(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

const favoriteValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

const subscriptionValidation = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().required().valid('starter', 'pro', 'business'),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

module.exports = { contactValidation, updateValidation, favoriteValidation, subscriptionValidation };
