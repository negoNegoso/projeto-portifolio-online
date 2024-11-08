import { body } from 'express-validator';

const permissoesSchema = [
  body('nome_permissao')
    .isString().withMessage('Nome da permissão deve ser uma string.')
    .notEmpty().withMessage('Nome da permissão é obrigatório.'),

  body('descricao_permissao')
    .optional()
    .isString().withMessage('Descrição da permissão deve ser uma string.')
];

export default permissoesSchema;
