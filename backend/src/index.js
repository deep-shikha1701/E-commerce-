const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');   
const cors = require('cors');

//Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/page');

//Environment Variables
env.config();

//mongodb
//mongodb+srv://root:<password>@cluster0.jd5hw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongoose.connect(mongodb+srv://clusterAnything.mongodb.net/test?retryWrites=true&w=majority, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jd5hw.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
).then(() => {
    console.log('Database Conneted successfully');
});

// app.use(bodyParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes)
app.use('/api', pageRoutes);


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})