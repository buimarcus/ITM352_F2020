// Product Data
shirts = [
    {
        "model": "Metal Vent Tech Short Sleeve 1.0",
        "color": "Olive",
        "price": 78.00,
        "image": "metal1.png"
    },
    {
        "model": "Metal Vent Tech Short Sleeve 2.0",
        "color": "Maroon",
        "price": 80.00,
        "image": "metal2.png"
    },
    {
        "model": "Metal Vent Tech Short Sleeve 2.0",
        "color": "Charcoal",
        "price": 80.00,
        "image": "metal3.png"
    },
    {
        "model": "Metal Vent Tech Short Sleeve 1.0",
        "color": "Graphite",
        "price": 78.00,
        "image": "metal4.png"
    }
];

if (typeof module != 'undefined') { //if the type of the module is defined
    module.exports.shirts = shirts; //export the product_data
}