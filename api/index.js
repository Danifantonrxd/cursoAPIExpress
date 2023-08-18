const express = require('express');
const pool = require("./libs/postgres.pool");
const { models } = require("./libs/sequelize");
const { checkApiKey } = require("./middlewares/auth.handler");

const  { routerAPI }  = require("./routes");
const cors = require('cors');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
  ormErrorHandler
} = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3010;
const IP = "192.168.0.103";
//const { faker } = require("@faker-js/faker");

app.use(express.json());

const whiteList = ["http://localhost:5500", "https://myapp.com"];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  }
}
app.use(cors());

require("./utils/auth");

//----------- Main --------------//
app.get('/', (request, response) => {
  console.log("Nueva Peticion!!");
  response.send("Hola, mi server en express")
});

app.get('/nueva-ruta', checkApiKey,(request, response) => {
  console.log("Nueva Peticion!!");
  response.send("Hola, ruta protegida")
});

routerAPI(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

//--------------- Listen for petitions -------------------//
app.listen(port, async () => {
  console.log("Listening on http://" + IP + ":" + port + "/");
  console.log(process.env.NODE_ENV);
});




