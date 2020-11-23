var queryString = require(‘query-string’);
stringified = queryString.stringify(request.body);
response.redirect("./invoice.html?" + stringified);