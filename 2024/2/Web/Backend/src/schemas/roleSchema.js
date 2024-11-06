import { body } from 'express-validator';

const rolesSchema = [
  body('id_usuario')
    .isInt().withMessage('ID do usuário deve ser um número inteiro.')
    .notEmpty().withMessage('ID do usuário é obrigatório.'),

  body('id_permissao')
    .optional()
    .isInt().withMessage('ID da permissão deve ser um número inteiro.')
];

export default rolesSchema;
