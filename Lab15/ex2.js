/*
AUTHOR: Marcus Bui
Date Created:
Purpose: Lab 15
*/

var express = require('express');
var fs = require('fs');
var app = express();
var myParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
const { type } = require('os');

app.use(cookieParser());
app.use(session({secret: "ITM352 rocks!", saveUninitialized: false, resave: false})); // typically it is something long and hard to decrypt



app.use(myParser.urlencoded({ extended: true }));

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

app.get("/set_cookie", function (request, response) {
    // set a cookied called myname to be my name
    response.cookie('myName', 'Marcus Bui', {maxAge: 10000}).send('cookie set');
 });

 
 app.get("/use_cookie", function (request, response) {
    // use the cookie if it has been set
    output = "No myName cookie found";
    if (typeof request.cookies.myName != 'undefined') {
        output = `Welcome to the Use Cookie page ${request.cookies.myName}`;
    }
    response.send(output);
 });

 app.get("/use_session", function (request, response) {
    // print the value of the session ID
    response.send(`Welcome, your session ID is ${request.session.id}`);
 });


app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="/login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
console.log("Got a POST login request");
POST = request.body;

user_name_from_form = POST["username"];
console.log("User name from form = " + user_name_from_form);
if (user_data[user_name_from_form] != undefined) {
    if (typeof request.session.last_login != 'undefined') {
       var msg = `You last logged in at ${request.session.last_login}`;
    var now = new Date(); 
    } else {
        var msg = '';
        var now = 'first visit!';
    }
    request.session.last_login = now;
    response.cookie('username', user_name_from_form).send (`${msg}<br>${user_name_from_form} logged in at ${now}`);
} else {
    response.send('Sorry Charlie!');
}
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    // process a simple register form
    POST = request.body;
    
    if (POST["username"] != undefined && POST['password' != undefined]) {                 // validate user input
        username = POST["username"];
        user_data[username] = {};
        user_data[username].name = username;
        user_data[username].password = POST['password'];
        user_data[username].email = POST['email'];

        data = JSON.stringify(user_data);
        fs.writeFileSync(filename, data, "utf-8");

        response.send("User " + username + " logged in");
    }
 });


app.listen(8080, () => console.log(`listening on port 8080`));
