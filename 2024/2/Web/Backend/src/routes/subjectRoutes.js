import express from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectController.js';
import validateSchema from '../middlewares/validateSchema.js';
import subjectSchema from '../schemas/subjectSchema.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Matérias
 *   description: Gerenciamento de matérias
 */

/**
 * @swagger
 * /materias:
 *   get:
 *     summary: Retorna todas as matérias
 *     tags: [Matérias]
 *     responses:
 *       200:
 *         description: Lista de matérias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Matérias'
 */
router.get('/', getAllSubjects);

/**
 * @swagger
 * /materias:
 *   post:
 *     summary: Cria uma nova matéria
 *     tags: [Matérias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Matérias'
 *     responses:
 *       201:
 *         description: Matéria criada com sucesso
 *       400:
 *         description: Requisição inválida
 */
router.post('/', subjectSchema, validateSchema, createSubject);

/**
 * @swagger
 * /materias/{id}:
 *   get:
 *     summary: Retorna uma matéria pelo ID
 *     tags: [Matérias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da matéria
 *     responses:
 *       200:
 *         description: Matéria encontrada
 *       404:
 *         description: Matéria não encontrada
 */
router.get('/:id', getSubjectById);

/**
 * @swagger
 * /materias/{id}:
 *   put:
 *     summary: Atualiza uma matéria pelo ID
 *     tags: [Matérias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da matéria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Matérias'
 *     responses:
 *       200:
 *         description: Matéria atualizada com sucesso
 *       404:
 *         description: Matéria não encontrada
 */
router.put('/:id', subjectSchema, validateSchema, updateSubject);

/**
 * @swagger
 * /materias/{id}:
 *   delete:
 *     summary: Deleta uma matéria pelo ID
 *     tags: [Matérias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da matéria
 *     responses:
 *       204:
 *         description: Matéria deletada com sucesso
 *       404:
 *         description: Matéria não encontrada
 */
router.delete('/:id', deleteSubject);

/**
 * @swagger
 * components:
 *   schemas:
 *     Matérias:
 *       type: object
 *       properties:
 *         id_materia:
 *           type: integer
 *           description: ID único da matéria
 *         nome_materia:
 *           type: string
 *           description: Nome da matéria
 *         professor_materia:
 *           type: string
 *           description: Nome do professor da matéria
 *         objetivo:
 *           type: string
 *           description: Objetivo da matéria
 *         ementa:
 *           type: string
 *           description: Conteúdo programático da matéria
 *         carga_horaria:
 *           type: integer
 *           description: Carga horária da matéria em horas
 *         id_curso:
 *           type: integer
 *           description: ID do curso relacionado
 *       required:
 *         - nome_materia
 *         - professor_materia
 */

export default router;
