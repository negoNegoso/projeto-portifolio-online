import express from 'express';
import {
  getRollCall,
  getRollCallById,
  createRollCall,
  updateRollCall,
  deleteRollCall,
} from '../controllers/rollCallController.js';

const router = express.Router();

router.get('/rollcall', getRollCall);
router.post('/rollcall', createRollCall);
router.get('/rollcalls/:id', getRollCallById);
router.put('/rollcalls/:id', updateRollCall);
router.delete('/rollcalls/:id', deleteRollCall);

export default router;
