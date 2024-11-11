import { body } from 'express-validator';

const rollCallSchema = [
  body('id_aluno')
    .isInt()
    .withMessage('ID do aluno deve ser um número inteiro.')
    .notEmpty()
    .withMessage('ID do aluno é obrigatório.'),

  body('id_turma')
    .isInt()
    .withMessage('ID da turma deve ser um número inteiro.')
    .notEmpty()
    .withMessage('ID da turma é obrigatório.'),

  body('id_materia')
    .isInt()
    .withMessage('ID da matéria deve ser um número inteiro.')
    .notEmpty()
    .withMessage('ID da matéria é obrigatório.'),

  body('data_chamada')
    .isDate()
    .withMessage('Data da chamada deve ser uma data válida.')
    .notEmpty()
    .withMessage('Data da chamada é obrigatória.'),

  body('presenca')
    .isBoolean()
    .withMessage('Presença deve ser um valor booleano (true ou false).')
    .notEmpty()
    .withMessage('Presença é obrigatória.'),

  body('horario_chamada')
    .isString()
    .withMessage('Horário da chamada deve ser uma string.')
    .notEmpty()
    .withMessage('Horário da chamada é obrigatório.'),

  body('justificativa').optional().isString().withMessage('Justificativa deve ser uma string.'),

  body('observacoes').optional().isString().withMessage('Observações deve ser uma string.'),
];

export default rollCallSchema;
