const express = require('express');
const pool = require('./libs/postgres.pool');
const { checkApiKey } = require('./middlewares/auth.handler');
const path = require('path');
const { routerAPI } = require('./routes');
const cors = require('cors');
const { errorHandler, logErrors, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3010;
const IP = '192.168.0.109';

app.use(express.json());
app.use(cors());

require('./utils/auth');

//----------- Main --------------//
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/mojon', (request, response) => {
  response.sendFile(path.join(__dirname, '../index2.html'));
});

app.get('/nueva-ruta', checkApiKey, (request, response) => {
  //console.log("Nueva Peticion!!");
  response.send('Hola, ruta protegida');
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

//--------------- Listen for petitions -------------------//
app.listen(port, async () => {
  console.log('Listening on http://' + IP + ':' + port + '/');
  console.log(process.env.NODE_ENV);
});

routerAPI(app);
