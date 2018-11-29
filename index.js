const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require('express').Router();
const Router = require("./router");

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:auth/auth", { useNewUrlParser: true });

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);

Router(app);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
