var fs = require('fs');
var app = express();

var filename = "user_data.json";

if (fs.existsSync(filename)) {
    fileStats = fs.statSync(filename);
    console.log("File " + filename + " has " + fileStats.size + " characters")

raw_data = fs.readFileSync(filename, 'utf-8');

// console.log(user_data);

user_data = JSON.parse(raw_data);
console.log("User_data=", user_data);
} else {
    console.log("Sorry can't read file " + filename);
}