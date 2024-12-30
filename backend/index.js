const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { body, param, query, validationResult } = require('express-validator');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Web Server
const app = express();
app.use(express.json());
app.use(cors());

// DB
mongoose.connect('mongodb://localhost:27017/db').then(() => console.log('Connected to DB')).catch(err => console.error(err));

// Task Model
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);


// Swagger
const swaggerDocs = swaggerJsDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'Task API with Swagger',
        },
        servers: [
            { url: 'http://localhost:3000' }
        ]
    },
    apis: [__filename]
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Endpoints

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Validation error
 */
app.post('/api/tasks',
    body('title').notEmpty().withMessage('Title is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description } = req.body;
            const task = new Task({ title, description });
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Error occurred while creating task' });
        }
    });

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: Get tasks
 *       500:
 *         description: Error occurred while getting tasks
 */
app.get('/api/tasks', async (req, res) => {
    try {
        const { completed } = req.query;
        const filter = completed !== undefined ? { completed: completed === 'true' } : {};
        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while getting tasks' });
    }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get task 
 *       404:
 *         description: Task not found
 */
app.get('/api/tasks/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Error occurred while getting task' });
        }
    });

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string 
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */
app.put('/api/tasks/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updates = req.body;
            const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Update failed' });
        }
    });

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
app.delete('/api/tasks/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const task = await Task.findByIdAndDelete(req.params.id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json({ message: 'Deleted task' });
        } catch (error) {
            res.status(500).json({ error: 'Error occurred while deleting task' });
        }
    });

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));

