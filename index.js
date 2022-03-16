const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('public'));

const server = app.listen(PORT, () => {
  console.log('Servidor levantado en el puerto: ' + server.address().port);
});

server.on('error', (error) => console.log(`hubo un error ${error}`));

const routerProductos = express.Router();

routerProductos.use(express.urlencoded({ extended: true }));
routerProductos.use(express.json());

let productos = [];

const nextID = () => {
  const ids = productos.map((e) => e.Id);
  const maxID = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  return maxID;
};

routerProductos.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

routerProductos.get('/productos', (req, res) => {
  res.json(productos);
});

routerProductos.get('/productos/:id', (req, res) => {
  const contenidoID = productos.find((e) => e.Id == req.params.id);
  if (typeof contenidoID === 'object') {
    res.json(contenidoID);
  } else {
    res.json({ mensaje: `Producto Id: ${req.params.id} no encontrado` });
  }
});

routerProductos.post('/productos', (req, res) => {
  const newID = nextID();
  const newProduct = { Id: newID, ...req.body };
  productos.push(newProduct);
  res.json({ mensaje: `se agrego producto ${newID} correctamente` });
});

routerProductos.put('/productos/:id', (req, res) => {
  productos = productos.map((p) =>
    p.Id == req.params.id ? { Id: p.Id, ...req.body } : p
  );
  res.json({ mensaje: `se actualizo producto ${req.params.id} correctamente` });
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
