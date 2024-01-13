const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use((req, res, next) =>{
    res.status(404).sendFile(path.join(__dirname,'views', 'page-not-found.html'));
});

app.listen(3000);