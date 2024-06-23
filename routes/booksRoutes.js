import express from 'express';
import booksController from '../controllers/booksController.js';

const router = express.Router();

router.get('/', booksController.getAll);
router.post('/', booksController.create);
router.route('/:id')
    .get(booksController.find)
    .put(booksController.update)
    .delete(booksController.delete);

export default router;
