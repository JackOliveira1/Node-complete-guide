const Cart = require('./cart');
const db = require('../util/database');
module.exports = class Product {
    constructor(id ,title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.description, this.imageUrl]
        )
    }


    static delete(id) {
    }



    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id, cb) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
}