import { body } from 'express-validator';

const alunoSchema = [
  body('nome_completo')
    .isString().withMessage('Nome completo deve ser uma string.')
    .isLength({ min: 3, max: 255 }).withMessage('Nome completo deve ter entre 3 e 255 caracteres.')
    .notEmpty().withMessage('Nome completo é obrigatório.'),

  body('RA')
    .isInt().withMessage('RA deve ser um número inteiro.')
    .notEmpty().withMessage('RA é obrigatório.'),

  body('senha')
    .isString().withMessage('Senha deve ser uma string.')
    .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres.')
    .notEmpty().withMessage('Senha é obrigatória.'),

  body('data_nascimento')
    .optional()
    .isDate().withMessage('Data de nascimento deve ser uma data válida.'),

  body('genero')
    .optional()
    .isString().withMessage('Gênero deve ser uma string.'),

  body('endereco')
    .optional()
    .isString().withMessage('Endereço deve ser uma string.'),

  body('email')
    .optional()
    .isEmail().withMessage('Email deve ser válido.'),

  body('telefone')
    .optional()
    .isString().withMessage('Telefone deve ser uma string.'),

  body('documento_identidade')
    .isString().withMessage('Documento de identidade deve ser uma string.')
    .notEmpty().withMessage('Documento de identidade é obrigatório.'),

  body('cpf')
    .isString().withMessage('CPF deve ser uma string.')
    .isLength({ min: 11, max: 11 }).withMessage('CPF deve ter exatamente 11 caracteres.')
    .matches(/^\d+$/).withMessage('CPF deve conter apenas números.')
    .notEmpty().withMessage('CPF é obrigatório.'),

  body('data_matricula')
    .optional()
    .isDate().withMessage('Data de matrícula deve ser uma data válida.'),

  body('numero_matricula')
    .optional()
    .isString().withMessage('Número de matrícula deve ser uma string.'),

  body('id_curso')
    .optional()
    .isInt().withMessage('ID do curso deve ser um número inteiro.'),

  body('id_turma')
    .optional()
    .isInt().withMessage('ID da turma deve ser um número inteiro.'),

  body('caminho_da_foto')
    .optional()
    .isString().withMessage('Caminho da foto deve ser uma string.')
];

export default alunoSchema;
