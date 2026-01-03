import express from 'express';
import gameController from '../controller/gameController.js';

const router = express.Router();

router.post('/', gameController.createGame);
router.get('/', gameController.getAllGame);
router.put('/:id', gameController.updateGame);
router.get('/:id', gameController.singleGame);

export default router;