import { body } from 'express-validator';

const subjectSchema = [
  body('nome_materia')
    .isString()
    .withMessage('Nome da matéria deve ser uma string.')
    .notEmpty()
    .withMessage('Nome da matéria é obrigatório.'),

  body('professor_materia')
    .isString()
    .withMessage('Nome do professor deve ser uma string.')
    .notEmpty()
    .withMessage('Nome do professor é obrigatório.'),

  body('objetivo').optional().isString().withMessage('Objetivo deve ser uma string.'),

  body('ementa').optional().isString().withMessage('Ementa deve ser uma string.'),

  body('carga_horaria').optional().isInt().withMessage('Carga horária deve ser um número inteiro.'),

  body('id_curso').optional().isInt().withMessage('ID do curso deve ser um número inteiro.'),
];

export default subjectSchema;
