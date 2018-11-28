const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:auth/auth", { useNewUrlParser: true });

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

router(app);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
