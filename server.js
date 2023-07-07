const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let activities = [];

// Obtener todas las actividades
app.get('/api/activities', (req, res) => {
  res.json(activities);
});

// Agregar una nueva actividad
app.post('/api/activities/', (req, res) => {
  const activity = req.body;
  activity.id = generateId()
  activities.push(activity);
  res.sendStatus(200);
});

function generateId() {
  const ids = activities.map(activity => activity.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}


// Obtener una actividad por ID
app.get('/api/activities/:id', (req, res) => {
  const id = req.params.id;
  const activity = activities.find(activity => activity.id === id);
  if (activity) {
    res.json(activity);
  } else {
    res.sendStatus(404);
  }
});

// Actualizar una actividad existente
app.put('/api/activities/:id', (req, res) => {
  console.log('id',req.params.id);
  const id = req.params.id;
  const updatedActivity = req.body; // No es necesario obtener solo el ID


  const index = activities.findIndex(activity => activity.id == id);
  console.log('index', index);
  console.log('activities', activities);
  if (index !== -1) {
    activities[index] = updatedActivity;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Eliminar una actividad
app.delete('/api/activities/:id', (req, res) => {
  console.log('id',req.params.id);
  const id = req.params.id;
  const index = activities.findIndex(activity => activity.id == id);
  console.log('id',id);
  console.log('index',index);
  if (index !== -1) {
    activities.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
