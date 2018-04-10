var express = require('./app/core/server/config/express.js');

var app = express();
app.listen(3000);
module.exports = app;
console.log("server running at http://localhost:3000/edu");
