// Source: Jasmine Olmos, Mark Chou, Lab13
const querystring = require('querystring');
var express = require('express'); // Express helps to handle multiple http requests, code for server
var myParser = require("body-parser"); //code for server
var products = require("./public/products_data.js"); // require data from javascript file
var filename = 'user_data.json';
var app = express();
var qs = require('querystring');
var querystr = {};
var camera_quantity = {};


/* app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});
*/

app.use(myParser.urlencoded({ extended: true }));


// if values are valid go to invoice, if not, redirect back to shop section
app.get("/process_page", function (request, response) {
   //check for valid quantities
   //look up request.query
   camera_quantity = request.query;
   params = request.query;
   console.log(params);
   if (typeof params['checkout_submit'] != 'undefined') {
      has_errors = false; // assume that quantity values are valid
      total_qty = 0; // see if total is greater than 0
      for (i = 0; i < products.length; i++) {
         if (typeof params[`quantity${i}`] != 'undefined') {
            a_qty = params[`quantity${i}`];
            total_qty += a_qty;
            if (!isNonNegInt(a_qty)) {
               has_errors = true; // see if there is invalid data
            }
         }
      }
      querystr = querystring.stringify(request.query);
      // redirect to invoice if quantity data is valid or respond to invalid data
      if (has_errors || total_qty == 0) {
         //redirect to products page if quantity data is invalid
         querystr = querystring.stringify(request.query);
         response.redirect("products_page.html?" + querystr);
      } else { // quantities entered is valid, send to invoice.html
         response.redirect("login.html?" + querystr);
      }
   }
});

function isNonNegInt(q, returnErrors = false) {
   errors = []; // assume that quantity data is valid 
   if (q == "") { q = 0; }
   if (Number(q) != q) errors.push('Not a number!'); // check if value is a number
   if (q < 0) errors.push('Negative value!'); // check if value is a positive number
   if (parseInt(q) != q) errors.push('Not an integer!'); // check if value is a whole number
   return returnErrors ? errors : (errors.length == 0);
}

fs = require('fs'); // files system module

if (fs.existsSync(filename)) {
   stats = fs.statSync(filename)

   data = fs.readFileSync(filename, 'UTF-8');
   console.log(typeof data);
   users_reg_data = JSON.parse(data);
}

// open login page
app.get("/login.html", function (request, response) {
   str = `
   <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="products-style.css" rel="stylesheet">
</head>
<body>
    <style>
        /* Styling from w3schools webpage template below */
        
        body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif;}
        body, html {
          height: 500%;
          color: #777;
          line-height: 1.8;
        }
        
        /* Create a Parallax Effect */
        .bgimg-1, .bgimg-2, .bgimg-3 {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        
        /* First image (Logo. Full height) */
        .bgimg-1 {
          background-image: url(/images/ocean.jpeg);
          min-height: 3%;
        }
        </style>
        <body>
        
        <!-- Navbar (sit on top) -->
        <div class="w3-top">
          <div class="w3-bar" id="myNavbar">
            <a class="w3-bar-item w3-button w3-hover-black w3-hide-medium w3-hide-large w3-right" href="javascript:void(0);" onclick="toggleFunction()" title="Toggle Navigation Menu">
              <i class="fa fa-bars"></i>
            </a>
            <a href="products_page.html#home" class="w3-bar-item w3-button">HOME</a>
            <a href="products_page.html#about" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-user"></i> ABOUT</a>
            <a href="products_page.html#shop" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-th"></i> SHOP</a>
          </div>
        
          <!-- Navbar on small screens -->
          <div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium">
            <a href="products_page.html#about" class="w3-bar-item w3-button" onclick="toggleFunction()">ABOUT</a>
            <a href="products_page.html#shop" class="w3-bar-item w3-button" onclick="toggleFunction()">SHOP</a>
            <a href="#" class="w3-bar-item w3-button">SEARCH</a>
          </div>
        </div>
        
        <!-- First Parallax Image with Logo Text -->
        <div class="bgimg-1 w3-display-container w3-opacity-min" id="home">
          <div class="w3-display-middle" style="white-space:nowrap;">
            <span class="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">ENTER <span class="w3-hide-small">LOGIN</span> INFO</span>
          </div>
        </div>
        <br>
<div class="card">

    <form name="loginform" method="POST">
        <div>
            <br>
            <input type="text" name="username" size="40" placeholder="username"><br />
            <input type="password" name="password" size="40" placeholder="password"><br/>
            <br>
            <input type="submit" value="Login" id="submit"> </div>
    </form>
</body>

<body>
<div>
    <form action="./registration.html">
    <input type="submit" class="button" value="Create Account" id="regpage" name="register_here">
    </form>
    <br>
</div>

</body>
</html>
`;
response.send(str);
      });

app.post("/login.html", function (request, response) {
         // Process login form POST and redirect to logged in page if ok, back to login page if not
         console.log(camera_quantity);
         the_username = request.body.username;
         console.log(the_username, "Username is", typeof (users_reg_data[the_username]));
         //validate login data
         if (typeof users_reg_data[the_username] != 'undefined') {
            //To check if the username exists in the json data
            if (users_reg_data[the_username].password == request.body.password) {
               //make the query string of prod quant needed for invoice
               theQuantQuerystring = qs.stringify(camera_quantity);
               response.redirect('/invoice.html?' + theQuantQuerystring + `&username=${the_username}`);
             
            } else {
               response.redirect('./login.html?')
               
            }
         }
      });

      app.get("/registration.html", function (request, response) {
         // Give a simple register form
      
         str = `
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Registration</title>
             <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
             <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             <link href="products-style.css" rel="stylesheet">
             <script>src ="server.js"</script>
         </head>
         <script>
             var password = document.getElementById("password") //turns password into an object
             ,repeat_password = document.getElementById("repeat_password"); //turns repeat password into an object
             
             function validatePassword(){
               if(password.value != repeat_password.value) { //if password is not equal to repeat password, say passwords don't match
                 alert("Passwords do not match.");
             response.redirect('public/registration.html') 
               } 
             else{
                 response.redirect('Login_Successful') 
             }
           
             }
               validatePassword();
           </script>
         <body>
             <style>
                 /* Styling from w3schools webpage template below */
                 
                 body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif;}
                 body, html {
                   height: 500%;
                   color: #777;
                   line-height: 1.8;
                 }
                 
                 /* Create a Parallax Effect */
                 .bgimg-1, .bgimg-2, .bgimg-3 {
                   background-attachment: fixed;
                   background-position: center;
                   background-repeat: no-repeat;
                   background-size: cover;
                 }
                 
                 /* First image (Logo. Full height) */
                 .bgimg-1 {
                   background-image: url(/images/ocean.jpeg);
                   min-height: 3%;
                 }
                 </style>
                 <body>
                 
                 <!-- Navbar (sit on top) -->
                 <div class="w3-top">
                   <div class="w3-bar" id="myNavbar">
                     <a class="w3-bar-item w3-button w3-hover-black w3-hide-medium w3-hide-large w3-right" href="javascript:void(0);" onclick="toggleFunction()" title="Toggle Navigation Menu">
                       <i class="fa fa-bars"></i>
                     </a>
                     <a href="products_page.html#home" class="w3-bar-item w3-button">HOME</a>
                     <a href="products_page.html#about" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-user"></i> ABOUT</a>
                     <a href="products_page.html#shop" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-th"></i> SHOP</a>
                   </div>
                 
                   <!-- Navbar on small screens -->
                   <div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium">
                     <a href="products_page.html#about" class="w3-bar-item w3-button" onclick="toggleFunction()">ABOUT</a>
                     <a href="products_page.html#shop" class="w3-bar-item w3-button" onclick="toggleFunction()">SHOP</a>
                     <a href="#" class="w3-bar-item w3-button">SEARCH</a>
                   </div>
                 </div>
                 
                 <!-- First Parallax Image with Logo Text -->
                 <div class="bgimg-1 w3-display-container w3-opacity-min" id="home">
                   <div class="w3-display-middle" style="white-space:nowrap;">
                     <span class="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">REGISTER <span class="w3-hide-small">BELOW</span>
                   </div>
                 </div>
                 <br>
                 <div style="margin-left:auto;margin-right: auto;padding:1px 16px;height:1000px;">
         
                     <!--textboxes for registration input. pattern specifies what characters are necessary for given textboxes.-->
                     <div class="card">
                             <form  method="POST" action="" onsubmit=validatePassword() >
                             <br>
                               <input type="text" name="fullname" size="40" pattern="[a-zA-Z]+[ ]+[a-zA-Z]+" maxlength="30" placeholder="First & Last Name"><br />
                               <input type="text" name="username" size="40" pattern=".[a-z0-9]{3,10}" required title="Minimum 4 Characters, Maximum 10 Characters, Numbers/Letters Only" placeholder="Username" ><br />
                               <input type="email" name="email" size="40" placeholder="Email" pattern="[a-z0-9._]+@[a-z0-9]+\.[a-z]{3,}$" required title="Please enter valid email."><br />
                               <input type="password" id="password" name="password"  size="40" pattern=".{8,}" required title="8 Characters Minimum" placeholder="Password"><br />
                               <input type="password" id="repeat_password" name="repeat_password" size="40" pattern=".{8,}" required title="8 Characters Minimum" placeholder="Repeat Password"><br />
                            
                               <input type="submit" value="Register" id="submit">
                           </form></div>
         </body>               
         </html>
         `;
         response.send(str);
               });

               app.post("/registration.html", function (request, response) {
                  // process a simple register form
                  console.log(camera_quantity);
                  the_username = request.body.username;
                  console.log(the_username, "Username is", typeof (users_reg_data[the_username]));
               
                  username = request.body.username;//Save new user to file name (users_reg_data)
               
                  errors = [];//Checks to see if username already exists
               
                  if (typeof users_reg_data[username] != 'undefined') {
                     errors.push("Username is Already Taken");
                  }
               
                  console.log(errors, users_reg_data);
               
                  if (errors.length == 0) {
                     users_reg_data[username] = {};
                     users_reg_data[username].username = request.body.username
                     users_reg_data[username].password = request.body.password;
                     users_reg_data[username].email = request.body.email;
               
                     theQuantQuerystring = qs.stringify(camera_quantity);
                     fs.writeFileSync(filename, JSON.stringify(users_reg_data));
                     response.redirect("/invoice.html?" + theQuantQuerystring + `&username=${the_username}`);
                     
               
                  }
               });
               
               
               app.all('*', function (request, response, next) {
                  console.log(request.method + ' to ' + request.path);
                  next();
               });

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));