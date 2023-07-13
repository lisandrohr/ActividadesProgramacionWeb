const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let vehicles = [];

app.get('/api/vehicles', (req, res) => {
  res.json(vehicles);
});

app.post('/api/vehicles/', (req, res) => {
  const vehicle = req.body;
  vehicle.id = generateId()
  vehicles.push(vehicle);
  res.sendStatus(200);
});

function generateId() {
  const ids = vehicles.map(vehicle => vehicle.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

app.get('/api/vehicles/:id', (req, res) => {
  const id = req.params.id;
  const vehicle = vehicles.find(vehicle => vehicle.id === id);
  if (vehicle) {
    res.json(vehicle);
  } else {
    res.sendStatus(404);
  }
});

app.put('/api/vehicles/:id', (req, res) => {
  const id = req.params.id;
  const updatedVehicle = req.body;

  const index = vehicles.findIndex(vehicle => vehicle.id == id);
  if (index !== -1) {
    vehicles[index] = updatedVehicle;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/api/vehicles/:id', (req, res) => {
  const id = req.params.id;
  const index = vehicles.findIndex(vehicle => vehicle.id == id);
  if (index !== -1) {
    vehicles.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
