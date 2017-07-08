var glob = require("glob")
var fs = require('fs');
// options is optional 
var files = glob.sync("./src/**/*s.js");

console.log(files);

var data = fs.readFileSync(files[0], 'utf8');

console.log(data);