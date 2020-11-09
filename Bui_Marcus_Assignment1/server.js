// Source: Jasmine Olmos, Mark Chou, Lab13
const querystring = require('querystring');
var express = require('express'); // Express helps to handle multiple http requests, code for server
var myParser = require("body-parser"); //code for server
var products = require("./public/products_data.js"); // require data from javascript file

var app = express();
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

app.use(myParser.urlencoded({ extended: true }));

// if values are valid go to invoice, if not, redirect back to shop section
app.get("/process_page", function (request, response) {
   //check for valid quantities
   //look up request.query
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
         response.redirect("invoice.html?" + querystr);
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

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));