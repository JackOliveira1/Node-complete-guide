const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
        'data',
        'cart.json'
);

module.exports = class  Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if(!err){
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updateProduct;

            if(existingProduct){
                updateProduct = { ...existingProduct };
                updateProduct.qty = updateProduct.qty +1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            } else {
                updateProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updateProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })
    }


    static deleteProduct(id, price) {
        fs.readFile(p, (err, fileContent) => {
           if(err)  {
                return;
           }
           const updateCart = {...JSON.parse(fileContent)};
           const product = updateCart.products.findIndex(prod => prod.id === id);
           const productQty = product.qty;
           updateCart.products = updateCart.products.filter(prod => prod.id !== id);
           updateCart.totalPrice = updateCart.totalPrice - price * productQty;
            fs.writeFile(p, JSON.stringify(updateCart), (err) => {
                console.log(err);
            })
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}