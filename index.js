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

let productos = [
  {
    Id: 1,
    title: 'PC',
    price: 1250,
    thumbnail:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRpDp8UndVwMQ2BH97xSmdNxv7HAp5VCqyBphqq-OpVswSMHnhCz3f7LUl1e9_EGFloBo_QG0noF4w&usqp=CAc',
  },
];

const nextID = () => {
  const ids = productos.map((e) => e.Id);
  const maxID = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  //const maxID = productos.length > 0 ? productos.length + 1 : 1;
  return maxID;
};

routerProductos.get('/productos', (req, res) => {
  res.json(productos);
});

routerProductos.get('/productos/:id', (req, res) => {
  console.log('get productos ID');
});

routerProductos.post('/productos', (req, res) => {
  const newID = nextID();
  const newProduct = { Id: newID, ...req.body };
  productos.push(newProduct);
  res.json({ mensaje: `se agrego producto ${newID} correctamente` });
});

routerProductos.put('/productos/:id', (req, res) => {
  console.log('put productos ID');
});

routerProductos.delete('/productos/:id', (req, res) => {
  const productosTemp = productos.filter((e) => e.Id != req.params.id);
  if (productosTemp.length === productos.length) {
    res.json({ mensaje: `Error producto Id: ${req.params.id} no encontrado` });
  } else {
    productos = productosTemp;
    res.json({ mensaje: `se eliminó producto ${req.params.id} correctamente` });
  }
});

app.use('/api', routerProductos);
