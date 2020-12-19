/* 
Server generated from Tyler Johnson 
Referenced from info_server_Ex4.js from Lab13 & help from Kylee Dean-Kobatake
*/

var data = require('./public/product_data.js'); //load services_data.js file and set the variable to 'data'//
var services_array = data.products; //set variable 'services_array' to data.products//
const queryString = require('query-string'); //read variable 'queryString' as the loaded query-string module//
var express = require('express'); //load and cache express module//
var app = express(); //set module to variable 'app'//
var myParser = require("body-parser"); //load and cache body parser module//
var session = require('express-session');
// So it'll load querystring//
var filename = 'user_data.json'; // new//
var fs = require('fs'); //Load file system//


app.use(myParser.urlencoded({ extended: true }));
app.use(session({secret: "ITM352 rocks!"}));

app.all('*', function (request, response, next) {
  console.log(`Got a ${request.method} to path ${request.path}`);
  // need to initialize an object to store the cart in the session. We do it when there is any request so that we don't have to check it exists
  // anytime it's used
  if(typeof request.session.cart == 'undefined') { request.session.cart = {}; } 
  next();
});

app.post("/get_products_data", function (request, response) {
  response.json(products_data);
});

app.get("/add_to_cart", function (request, response) {
  var products_key = request.query['products_key']; // get the product key sent from the form post
  var quantities = request.query['quantities'].map(Number); // Get quantities from the form post and convert strings from form post to numbers
  request.session.cart[products_key] = quantities; // store the quantities array in the session cart object with the same products_key. 
  response.redirect('./cart.html');
});

app.get("/get_cart", function (request, response) {
  response.json(request.session.cart);
});



//added just now
if (fs.existsSync(filename)) {
  stats = fs.statSync(filename) //gets stats from file
  console.log(filename + 'has' + stats.size + 'characters');

  data = fs.readFileSync(filename, 'utf-8');
  users_reg_data = JSON.parse(data);
} else {
  console.log(filename + 'does not exist!');
}

app.all('*', function (request, response, next) { //for all request methods//
  console.log(request.method + ' to ' + request.path); //type in the console the request method and the path//
  next(); //keep going
});

app.use(myParser.urlencoded({ extended: true })); //get data in the body//

app.post("/purchase_submit_button", function (request, response) {
  let POST = request.body; // data would be packaged in the body//

  if (typeof POST['purchase_submit_button'] != 'undefined') {
    var hasvalidquantities = true; // assuming that the variable will be true// 
    var hasquantities = false
    for (i = 0; i < products.length; i++) {

      qty = POST[`quantity${i}`];
      hasquantities = hasquantities || qty > 0; // If its value is larger than 0 then it is good//
      hasvalidquantities = hasvalidquantities && isNonNegInt(qty);    // if it is both a quantity over 0 and is valid//     
    }
    // if all quantities are valid, login/register// 
    const stringified = queryString.stringify(POST);
    if (hasvalidquantities && hasquantities) {
      response.redirect("./login.html?" + stringified); //direct to login
      return; //stops the function
    }
    else { response.redirect("./index.html" + stringified) }
  }
});

//repeats the isNonNegInt function from the index.html file because there is no relation between the index.html page and server
function isNonNegInt(q, returnErrors = false) {
  errors = []; // assume that quantity data is valid
  if (q == "") { q = 0; }
  if (Number(q) != q) errors.push('Not a number!'); //check if value is a #
  if (q < 0) errors.push('Negative value!'); //check if value is a positive #
  if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole #
  return returnErrors ? errors : (errors.length == 0);
}

// login stuff starts here , add more comments and reference// 
app.post("/process_login", function (req, res) {
  var LogError = [];
  console.log(req.query);
  the_username = req.body.username.toLowerCase();
  if (typeof users_reg_data[the_username] != 'undefined') {
    //Asking object if it has matching username, if it doesnt itll be undefined.
    if (users_reg_data[the_username].password == req.body.password) {
      req.query.username = the_username;
      console.log(users_reg_data[req.query.username].name);
      req.query.name = users_reg_data[req.query.username].name
      res.redirect('/cart.html?' + queryString.stringify(req.query));
      return;
      //Redirect them to invoice here if they logged in correctly//
    } else {
      LogError.push = ('Invalid Password');
      console.log(LogError);
      req.query.username = the_username;
      req.query.name = users_reg_data[the_username].name;
      req.query.LogError = LogError.join(';');
    }
  } else {
    LogError.push = ('Invalid Username');
    console.log(LogError);
    req.query.username = the_username;
    req.query.LogError = LogError.join(';');
  }

  res.redirect('./login.html?' + queryString.stringify(req.query));
});

app.post("/process_register", function (req, res) {
  qstr = req.body
  console.log(qstr);
  var errors = [];
  // Referenced code from Kylee Dean-Kobatake
  if (/^[A-Za-z]+$/.test(req.body.name)) {
  }
  else {
    errors.push('Use Letters Only for Full Name')
  }
  // validating name
  if (req.body.name == "") {
    errors.push('Invalid Full Name');
  }
  // length of full name is less than 30
  if ((req.body.fullname.length > 30)) {
    errors.push('Full Name Too Long')
  }
  // length of full name is between 0 and 25 
  if ((req.body.fullname.length > 25 && req.body.fullname.length < 0)) {
    errors.push('Full Name Too Long')
  }

  var reguser = req.body.username.toLowerCase();
  if (typeof users_reg_data[reguser] != 'undefined') {
    errors.push('Username taken')
  }
  // Referenced code from Kylee Dean-Kobatake
  if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
  }
  else {
    errors.push('Letters And Numbers Only for Username')
  }

  //Password min is 6 characters long 
  if ((req.body.password.length < 6 && req.body.username.length > 20)) {
    errors.push('Password Too Short')
  }
  // If passwords match
  if (req.body.password !== req.body.repeat_password) {
    errors.push('Password Not a Match')
  }

  //if no errors, this makes it remember the user's registration in the json made 
  // Reused code from Lab14
  if (errors.length == 0) {
    POST = req.body;
    console.log('no errors');
    var username = POST["username"];
    users_reg_data[username] = {}; //make it 'userS'
    users_reg_data[username].name = username;
    users_reg_data[username].password = POST['password'];
    users_reg_data[username].email = POST['email'];
    data = JSON.stringify(users_reg_data); // change to users
    fs.writeFileSync(filename, data, "utf-8");
    res.redirect('./invoice.html?' + queryString.stringify(req.query) + queryString.stringify(req.body));
    
  }
  //directs user to registration page if there are errrors
  if (errors.length > 0) {
    console.log(errors)
    req.query.name = req.body.name;
    req.query.username = req.body.username;
    req.query.password = req.body.password;
    req.query.repeat_password = req.body.repeat_password;
    req.query.email = req.body.email;

    req.query.errors = errors.join(';');
    res.redirect('register.html?' + queryString.stringify(req.query))
  }
});

// Generates invoice
app.post("/purchase_submit_button", function (request, response) {
  let POST = request.body; // data would be packaged in the body//
  console.log(POST);
  if (typeof POST['purchase_submit_button'] != 'undefined') {
    var hasvalidquantities = true; // creates a varibale assuming that it will be true// 
    var hasquantities = false
    for (i = 0; i < products.length; i++) {

      qty = POST[`quantity${i}`];
      hasquantities = hasquantities || qty > 0; // If its value bigger than 0 then it is good//
      hasvalidquantities = hasvalidquantities && isNonNegInt(qty);    // if it is both a quantity over 0 sand is valid//     
    }
    // if all quantities are valid, it will generate the invoice// 
    const stringified = queryString.stringify(POST);
    if (hasvalidquantities && hasquantities) {
      response.redirect("./login.html?" + stringified); // using the login.html and all the data that is inputed//
    }
    else { response.redirect("./index.html") }
  }
})


function isNonNegInt(q, returnErrors = false) {
  errors = []; // assume that quantity data is valid 
  if (q == "") { q = 0; }
  if (Number(q) != q) errors.push('Not a number!'); //check if value is a number
  if (q < 0) errors.push('Negative value!'); //check if value is a positive number
  if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole number
  return returnErrors ? errors : (errors.length == 0);

}
app.use(express.static('./public')); //Creates static server using express from the public folder
app.listen(8080, () => console.log(`listen on port 8080`))