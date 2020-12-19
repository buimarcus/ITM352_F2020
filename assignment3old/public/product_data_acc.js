// Product Data
acc = [
    {
        "model": "The Reversible (Big) Mat 5mm",
        "color": "Blue Marble",
        "price": 78.00,
        "image": "acc1.png"
    },
    {
        "model": "Metal Vent Tech Headband",
        "color": "Gray",
        "price": 18.00,
        "image": "acc2.png"
    },
    {
        "model": "T.H.E. Set",
        "color": "Teal Marble",
        "price": 178.00,
        "image": "acc3.png"
    },
    {
        "model": "The Yoga Mat Bag 16L",
        "color": "Black",
        "price": 68.00,
        "image": "acc4.png"
    }
];

if (typeof module != 'undefined') { //if the type of the module is defined
    module.exports.acc = acc; //export the product_data
}