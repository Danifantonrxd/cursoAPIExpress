const express = require('express');

const  { routerAPI }  = require("./routes");
const cors = require('cors');
const {
  errorHandler,
  logErrors,
  boomErrorHandler
} = require("./middlewares/error.handler");

const app = express();
const port = 3010;
const IP = "192.168.0.106";
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
app.use(cors(options));

//----------- Main --------------//
app.get('/', (request, response) => {
  console.log("Nueva Peticion!!");
  response.send("Hola, mi server en express")
});

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//--------------- Listen for petitions -------------------//
app.listen(port, () => {
  console.log("Listening on http://" + IP + ":" + port + "/")
});



