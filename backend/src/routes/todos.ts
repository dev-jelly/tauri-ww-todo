import { Router } from 'express';
import prisma from '../utils/prisma';
import { verifyToken, AuthRequest } from '../middleware/auth';

const router = Router();

// All routes protected
router.use(verifyToken);

// Get all todos for the authenticated user
router.get('/', async (req: AuthRequest, res) => {
  try {
    const todos = await prisma.todo.findMany({ where: { userId: req.userId } });
    res.json(todos);
  } catch (e) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Create a new todo
router.post('/', async (req: AuthRequest, res) => {
  const { title } = req.body as { title: string };
  if (!title) return res.status(400).json({ message: 'title required' });

  try {
    const todo = await prisma.todo.create({ data: { title, userId: req.userId! } });
    res.status(201).json(todo);
  } catch (e) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

// Toggle complete
router.patch('/:id', async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed: req.body.completed },
    });
    res.json(todo);
  } catch (e) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

// Delete todo
router.delete('/:id', async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.todo.delete({ where: { id } });
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

export default router;
