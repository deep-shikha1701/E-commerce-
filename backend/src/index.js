const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Environment Variables
env.config();

//mongodb
//mongodb+srv://root:<password>@cluster0.jd5hw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongoose.connect(mongodb+srv://clusterAnything.mongodb.net/test?retryWrites=true&w=majority, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jd5hw.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    {   
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
    ).then(() => {
        console.log('Database Conneted successfully');
    });

// app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello From the Server'
    });
})


app.post('/data', (req, res,next) => {
    res.status(200).json({
        message: req.body
    });
})      

app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})