// Product Data
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
];

if (typeof module != 'undefined') { //if the type of the module is defined
    module.exports.pants = pants; //export the product_data
}