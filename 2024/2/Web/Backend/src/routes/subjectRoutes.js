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

// Criar uma nova matéria
router.post('/', subjectSchema, validateSchema, createSubject);

// Route para listar materias
router.get('/', subjectSchema, validateSchema, getAllSubjects);

// Route para pegar materia pelo id
router.get('/:id', getSubjectById);

// Route para atualizar materia
router.put('/:id', updateSubject);

// Route para apagar a materia
router.delete('/:id', deleteSubject);

export default router;
