"use strict";

require('dotenv').config();

require('express-async-errors'); //async errors


var express = require('express');

var app = express();

var connectDB = require("./db/connect");

var productsRouter = require("./routes/products");

var notFoundMiddleware = require('./middleware/not-found');

var errorMiddleware = require('./middleware/error-handler'); //middleware


app.use(express.json()); //routes

app.get('/', function (req, res) {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
app.use('/api/v1/products', productsRouter); //products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);
var port = process.env.PORT || 5000;

var start = function start() {
  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(connectDB(process.env.MONGO_URI));

        case 3:
          app.listen(port, console.log("Server is listening port ".concat(port, "...")));
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

start();