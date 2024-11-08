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

router.get('/', getRollCall);
router.post('/', rollCallSchema, validateSchema, createRollCall);
router.get('/:id', getRollCallById);
router.put('/:id', rollCallSchema, validateSchema, updateRollCall);
router.delete('/:id', deleteRollCall);

export default router;
