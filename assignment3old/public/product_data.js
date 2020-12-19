// Product Data

products = [

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
    ],

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
    ],

    pants = [
        {
            "model": "T.H.E Short",
            "color":"Black",
            "price": 68.00,
            "image": "shorts1.png"
        },
        {
            "model": "Train to Beach Short",
            "color":"Navy",
            "price": 88.00,
            "image": "shorts2.png"
        },
        {
            "model": "License to Train Jogger",
            "color":"Black",
            "price": 128.00,
            "image": "jogger1.png"
        },
        {
            "model": "ABC Jogger",
            "color":"Light Gray/Black",
            "price": 128.00,
            "image": "jogger2.png"
        }
    ],

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
    ]

];


if (typeof module != 'undefined') { //if the type of the module is defined
    module.exports.products = products; //export the product_data
}