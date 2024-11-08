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

// Route para listar materias
router.get('/', getAllSubjects);

// Criar uma nova matéria
router.post('/', subjectSchema, validateSchema, createSubject);

// Route para pegar materia pelo id
router.get('/:id', getSubjectById);

// Route para atualizar materia
router.put('/:id', subjectSchema, validateSchema, updateSubject);

// Route para apagar a materia
router.delete('/:id', deleteSubject);

export default router;
