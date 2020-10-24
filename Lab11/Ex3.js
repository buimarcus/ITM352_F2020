var attributes  =  "Marcus;20;MIS;";

var Marcus = attributes.split(";");

/* for (attrib of Marcus) {
    console.log(attrib);
}
*/

Marcus_string = Marcus.join(",");

console.log(Marcus_string);

for (i=0; i < attributes.length; i++) {
    console.log(typeof attributes[i]);
}