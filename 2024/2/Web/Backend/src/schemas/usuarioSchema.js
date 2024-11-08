import { body } from 'express-validator';

const usuarioSchema = [
  body('nome_completo')
    .isString()
    .withMessage('O nome completo deve ser uma string.')
    .notEmpty()
    .withMessage('Nome completo é obrigatório.')
    .isLength({ min: 3, max: 255 })
    .withMessage('Nome completo deve ter entre 3 e 255 caracteres.'),

  body('email').isEmail().withMessage('O email deve ser válido.').notEmpty().withMessage('Email é obrigatório.'),

  body('senha')
    .isString()
    .withMessage('A senha deve ser uma string.')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter no mínimo 6 caracteres.')
    .notEmpty()
    .withMessage('Senha é obrigatória.'),

  body('tipo_usuario')
    .isString()
    .withMessage('Tipo de usuário deve ser uma string.')
    .notEmpty()
    .withMessage('Tipo de usuário é obrigatório.'),

  body('status').isString().withMessage('Status deve ser uma string.').notEmpty().withMessage('Status é obrigatório.'),

  body('caminho_da_foto').optional().isString().withMessage('Caminho da foto deve ser uma string.'),
];

export default usuarioSchema;
