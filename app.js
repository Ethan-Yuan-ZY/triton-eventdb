const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const http = require("http");

const graphqlAPISchema = require("./graphqlAPI/schema/index");
const graphqlAPIResolvers = require("./graphqlAPI/resolvers/index");
const Authenticate = require("./middleware/authenticate.js");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./triton_eventdb-frontend/src/assets/images",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-UPLOAD-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single("myImage");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST", "GET", "OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(Authenticate);

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    if (!err) return res.send(200).end();
  });
});

app.use(
  "/graphqlAPI",
  graphqlHttp({
    schema: graphqlAPISchema,
    rootValue: graphqlAPIResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eqmdz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
