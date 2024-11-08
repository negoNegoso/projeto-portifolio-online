import express from 'express';
import {
  getRollCall,
  getRollCallById,
  createRollCall,
  updateRollCall,
  deleteRollCall,
} from '../controllers/rollCallController.js';
import validateSchema from '../middlewares/validateSchema.js';
import rollCallSchema from '../schemas/rollCallSchema.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chamadas
 *   description: Gerenciamento de chamadas dos alunos
 */

/**
 * @swagger
 * /chamadas:
 *   get:
 *     summary: Retorna todas as chamadas
 *     tags: [Chamadas]
 *     responses:
 *       200:
 *         description: Lista de chamadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chamadas'
 */
router.get('/', getRollCall);

/**
 * @swagger
 * /chamadas:
 *   post:
 *     summary: Cria uma nova chamada
 *     tags: [Chamadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chamadas'
 *     responses:
 *       201:
 *         description: Chamada criada com sucesso
 *       400:
 *         description: Requisição inválida
 */
router.post('/', rollCallSchema, validateSchema, createRollCall);

/**
 * @swagger
 * /chamadas/{id}:
 *   get:
 *     summary: Retorna uma chamada pelo ID
 *     tags: [Chamadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da chamada
 *     responses:
 *       200:
 *         description: Chamada encontrada
 *       404:
 *         description: Chamada não encontrada
 */
router.get('/:id', getRollCallById);

/**
 * @swagger
 * /chamadas/{id}:
 *   put:
 *     summary: Atualiza uma chamada pelo ID
 *     tags: [Chamadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da chamada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chamadas'
 *     responses:
 *       200:
 *         description: Chamada atualizada com sucesso
 *       404:
 *         description: Chamada não encontrada
 */
router.put('/:id', rollCallSchema, validateSchema, updateRollCall);

/**
 * @swagger
 * /chamadas/{id}:
 *   delete:
 *     summary: Deleta uma chamada pelo ID
 *     tags: [Chamadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da chamada
 *     responses:
 *       204:
 *         description: Chamada deletada com sucesso
 *       404:
 *         description: Chamada não encontrada
 */
router.delete('/:id', deleteRollCall);

/**
 * @swagger
 * components:
 *   schemas:
 *     Chamadas:
 *       type: object
 *       properties:
 *         id_chamada:
 *           type: integer
 *           description: ID único da chamada
 *         id_aluno:
 *           type: integer
 *           description: ID do aluno relacionado
 *         id_turma:
 *           type: integer
 *           description: ID da turma relacionada
 *         id_materia:
 *           type: integer
 *           description: ID da matéria relacionada
 *         data_chamada:
 *           type: string
 *           format: date
 *           description: Data da chamada
 *         presenca:
 *           type: boolean
 *           description: Indica se o aluno estava presente
 *         justificativa:
 *           type: string
 *           description: Justificativa da ausência, se aplicável
 *         horario_chamada:
 *           type: string
 *           format: time
 *           description: Horário em que a chamada foi realizada
 *         observacoes:
 *           type: string
 *           description: Observações adicionais sobre a chamada
 *       required:
 *         - id_aluno
 *         - id_turma
 *         - id_materia
 *         - data_chamada
 *         - presenca
 */

export default router;
