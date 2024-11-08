import { validationResult } from 'express-validator';

const validateSchema = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(error => error.msg)
    });
  }

  next();
};

export default validateSchema;
