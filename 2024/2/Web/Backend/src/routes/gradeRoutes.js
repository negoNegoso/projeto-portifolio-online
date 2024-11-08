import express from 'express';
import {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
} from '../controllers/gradeController.js';
import validateSchema from '../middlewares/validateSchema.js';
import gradeSchema from '../schemas/gradeSchema.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Rota para gerenciamento de notas dos alunos
 */

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Retorna todas as notas
 *     tags: [Notas]
 *     responses:
 *       200:
 *         description: Lista de notas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 */
router.get('/', getAllGrades);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Cria uma nova nota
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       400:
 *         description: Requisição inválida
 */
router.post('/', gradeSchema, validateSchema, createGrade);

/**
 * @swagger
 * /notas/{id}:
 *   get:
 *     summary: Retorna uma nota pelo ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Nota não encontrada
 */
router.get('/:id', getGradeById);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Atualiza uma nota pelo ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Nota não encontrada
 */
router.put('/:id', gradeSchema, validateSchema, updateGrade);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Deleta uma nota pelo ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     responses:
 *       204:
 *         description: Nota deletada com sucesso
 *       404:
 *         description: Nota não encontrada
 */
router.delete('/:id', deleteGrade);

/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       required:
 *         - id_materia
 *         - id_aluno
 *         - nota
 *         - data_avaliacao
 *       properties:
 *         id_nota:
 *           type: integer
 *           description: ID da nota (auto-incrementado)
 *         id_materia:
 *           type: integer
 *           description: ID da matéria
 *         id_aluno:
 *           type: integer
 *           description: ID do aluno
 *         nota:
 *           type: number
 *           format: float
 *           description: Nota do aluno
 *         data_avaliacao:
 *           type: string
 *           format: date
 *           description: Data da avaliação
 *       example:
 *         id_materia: 1
 *         id_aluno: 123
 *         nota: 8.5
 *         data_avaliacao: "2024-11-08"
 */

export default router;
