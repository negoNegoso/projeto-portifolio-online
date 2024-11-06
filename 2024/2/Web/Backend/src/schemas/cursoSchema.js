import { body } from 'express-validator';

const cursoSchema = [
  body('nome_curso')
    .isString().withMessage('O nome do curso deve ser uma string.')
    .notEmpty().withMessage('Nome do curso é obrigatório.'),

  body('descricao_curso')
    .optional()
    .isString().withMessage('A descrição do curso deve ser uma string.'),

  body('duracao')
    .optional()
    .isString().withMessage('Duração deve ser uma string.'),

  body('categoria')
    .optional()
    .isString().withMessage('Categoria deve ser uma string.'),

  body('nivel')
    .optional()
    .isString().withMessage('Nível deve ser uma string.'),

  body('carga_horaria')
    .optional()
    .isInt().withMessage('Carga horária deve ser um número inteiro.'),

  body('data_inicio')
    .optional()
    .isDate().withMessage('Data de início deve ser uma data válida.'),

  body('data_fim')
    .optional()
    .isDate().withMessage('Data de fim deve ser uma data válida.')
];

export default cursoSchema;
