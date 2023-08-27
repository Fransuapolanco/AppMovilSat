// Importar las dependencias
const express = require('express');
const app = express();

// Ruta para manejar la solicitud GET en /registro
app.get('/registro-ticket', function(req, res) {
  // Obtener los parámetros de la solicitud GET
  const nombre = req.query.nombre;
  const email = req.query.email;
  const unidadSeleccionada = document.querySelector('#unidad').value;
  const mensaje = req.query.mensaje;



// Enviar una respuesta al cliente
  res.send('Solicitud de registro recibida');
});

// Iniciar el servidor en el puerto
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
