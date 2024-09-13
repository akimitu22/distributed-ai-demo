const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

app.post('/tasks', (req, res) => {
  const task = {
    id: Date.now(),
    type: req.body.type,
    status: 'pending',
    result: null
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    task.status = 'completed';
    task.result = req.body.result;
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
