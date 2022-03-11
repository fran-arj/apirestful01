const express = require('express');
//const { Router } = express;
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log('Servidor levantado en el puerto: ' + server.address().port);
});

server.on('error', (error) => console.log(`hubo un error ${error}`));

const routerProductos = express.Router();

routerProductos.use(express.urlencoded({ extended: true }));
routerProductos.use(express.json());

routerProductos.get('/productos', (req, res) => {
  console.log('get productos');
});

routerProductos.get('/productos/:id', (req, res) => {
  console.log('get productos ID');
});

routerProductos.post('/productos', (req, res) => {
  console.log('post productos');
});

routerProductos.put('/productos/:id', (req, res) => {
  console.log('put productos ID');
});

routerProductos.delete('/productos/:id', (req, res) => {
  console.log('delete productos ID');
});

app.use('/api', routerProductos);
