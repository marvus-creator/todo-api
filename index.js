const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to understand JSON (Required)
app.use(express.json());

// --- REQUIREMENT: Store tasks in a simple array (The "Database") ---
// We must include sample data (at least 3 tasks)
let tasks = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Finish homework", completed: false },
    { id: 3, title: "Clean room", completed: false }
];

// --- 1. GET: View all tasks ---
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// --- 2. POST: Add a new task ---
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1, // Creates a simple ID
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// --- 3. PUT: Update an entire task ---
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex !== -1) {
        // Update the task completely
        tasks[taskIndex] = { id: id, ...req.body };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).send('Task not found');
    }
});

// --- 4. PATCH: Update part of a task (e.g., mark as done) ---
app.patch('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (task) {
        // Update only the parts we send
        if (req.body.title) task.title = req.body.title;
        if (req.body.completed !== undefined) task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// --- 5. DELETE: Remove a task ---
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove the task
        res.send('Task deleted successfully');
    } else {
        res.status(404).send('Task not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});