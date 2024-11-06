import { body } from 'express-validator';

const turmaSchema = [
  body('nome_turma')
    .isString().withMessage('Nome da turma deve ser uma string.')
    .notEmpty().withMessage('Nome da turma é obrigatório.'),

  body('ano_letivo')
    .isString().withMessage('Ano letivo deve ser uma string.')
    .notEmpty().withMessage('Ano letivo é obrigatório.'),

  body('id_curso')
    .optional()
    .isInt().withMessage('ID do curso deve ser um número inteiro.'),

  body('horario')
    .optional()
    .isString().withMessage('Horário deve ser uma string.'),

  body('sala')
    .optional()
    .isString().withMessage('Sala deve ser uma string.'),

  body('professor_responsavel')
    .optional()
    .isString().withMessage('Professor responsável deve ser uma string.'),

  body('capacidade_maxima')
    .optional()
    .isInt().withMessage('Capacidade máxima deve ser um número inteiro.')
];

export default turmaSchema;
