'use strict';
var dns = require('dns')
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors');
const { stringify } = require('querystring');
require('dotenv')

var app = express();

var port = process.env.PORT || 3000;

process.env.MONGO_URI="mongodb+srv://John:3216@fcc-cluster.edllc.mongodb.net/URLShortener?retryWrites=true&w=majority"

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true})

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Conection error"))
db.once("open", console.log.bind(console, "Connected"))

const ShortsSchema = mongoose.Schema({
  origin: {type: String, required: true},
  new: {type: Number, required: true, unique: true}
})

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
  
app.post("/api/shorturl/new", (req, res) => {
  res.send({url: req.body.url})
})

app.get("/api/shorturl/:index", (req, res) => {
  res.redirect("/")
})

app.listen(port, function () {
  console.log('Node.js listening ...');
});