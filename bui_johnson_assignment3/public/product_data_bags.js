// Product Data
bags = [

    {
        "model": "More Miles Pack39L",
        "color": "Black",
        "price": 228.00,
        "image": "bag2.png"
    },
    {
        "model": "More Miles Active Backpack Spectra 17L",
        "color": "Olive",
        "price": 138.00,
        "image": "bag3.png"
    },
    {
        "model": "Easy Access Crossbody",
        "color": "Black",
        "price": 40.00,
        "image": "bag4.png"
    },
    {
        "model": "More Miles Duffel 40L",
        "color": "Black",
        "price": 198.00,
        "image": "bag1.png"
    }
];

if (typeof module != 'undefined') { //if the type of the module is defined
    module.exports.bags = bags; //export the product_data
}