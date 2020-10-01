var number = 0;     // Counter for age
var myAge = 20;     // my age

console.log("Silly counting program for Ex2 with Break");
while (number < myAge) {
    
    number++;
    if ((number >= myAge / 2) && (number <= myAge * 3/4)) {
        continue;
    }
    console.log("Age=" + number);
}
console.log("No age zone!");