//This file containes the JSON object for the products

var products = 
[
    {
        "bracelet": "Silver Turtle",
        "price": 25.00,
        "image": "bracelet1.png"
    },
    {
        "bracelet": "Silver Mermaid",
        "price": 25.00,
        "image": "bracelet2.png"
    },
    {
        "bracelet": "Crystal Paw",
        "price": 35.00,
        "image": "bracelet3.png"
    },
    {
        "bracelet": "Pair of Wings",
        "price": 45.00,
        "image": "bracelet4.png"
    },
    {
        "bracelet": "Layered Rose Gold Turtle",
        "price": 65.00,
        "image": "bracelet5.jpg"
    },
]
if(typeof module != 'undefined') {
    module.exports.products = products;
  }