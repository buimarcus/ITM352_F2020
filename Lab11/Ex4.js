var values = ["2", "-3", "asdf", "-3.1456", "5"];

function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(stringToCheck) != stringToCheck) errors.push(' Not an integer!'); // Check that it is an integer

    /*
    if (returnErrors) {
        return errors;
    } else {
        return errors.length == 0;      // this line was used to replace the entire commented out section below
    }
    */
    
    /* if (errors.lenth == 0) { // no errors in errors array, return true
        return true;
    } else      // found something in errors array, return false
    {
        return false;
    }
    */
   return returnErrors ? errors : (errors.length == 0);          // ternary expression, if then else built into one
}

for (i = 0; i < values.length; i++) {
    console.log("String \'" + values[i] + "\' is " + isNonNegInt(values[i],true).join("||"));
}