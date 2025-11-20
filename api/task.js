// api/tasks.js
let tasks = [
  {
    id: 1,
    title: "Complete Angular Task Manager",
    description: "Build a full-featured task management application",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-11-25",
    createdAt: "2025-11-15"
  },
  {
    id: 2,
    title: "Review Project Documentation",
    description: "Go through all project documents",
    status: "pending",
    priority: "medium",
    dueDate: "2025-11-22",
    createdAt: "2025-11-18"
  },
  {
    id: 3,
    title: "Setup JSON Server",
    description: "Configure JSON Server for development",
    status: "completed",
    priority: "high",
    dueDate: "2025-11-20",
    createdAt: "2025-11-10"
  }
];

let nextId = 4;

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, url } = req;
  const urlParts = url.split('/');
  const id = urlParts[urlParts.length - 1];

  // GET all tasks
  if (method === 'GET' && !id.match(/^\d+$/)) {
    res.status(200).json(tasks);
  }
  // GET single task
  else if (method === 'GET' && id.match(/^\d+$/)) {
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  }
  // POST - Create task
  else if (method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newTask = JSON.parse(body);
      newTask.id = nextId++;
      tasks.push(newTask);
      res.status(201).json(newTask);
    });
  }
  // PUT - Update task
  else if (method === 'PUT' && id.match(/^\d+$/)) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedTask = JSON.parse(body);
      const index = tasks.findIndex(t => t.id === parseInt(id));
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        res.status(200).json(tasks[index]);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    });
  }
  // DELETE task
  else if (method === 'DELETE' && id.match(/^\d+$/)) {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
      tasks.splice(index, 1);
      res.status(200).json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  }
  else {
    res.status(404).json({ error: 'Not found' });
  }
};