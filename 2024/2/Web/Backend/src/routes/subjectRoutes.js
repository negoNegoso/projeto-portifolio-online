const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Criar uma nova matéria
router.post('/', subjectController.createSubject);

// Route para listar materias
router.get('/', subjectController.getAllSubjects);

// Route para pegar materia pelo id
router.get('/:id', subjectController.getSubjectById);

// Route para atualizar materia
router.put('/:id', subjectController.updateSubject);

// Route para apagar a materia
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
