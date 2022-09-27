const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

const url = 'mongodb://localhost/realestate'
mongoose.connect(url);
const con = mongoose.connection;

con.on('open',function(){

console.log("connected");

})

const customerrouter = require('./routes/customer')
app.use('/customer',customerrouter)

const soldpropertyrouter = require('./routes/soldproperty')
app.use('/soldproperty',soldpropertyrouter)


app.listen(5050,()=>
{
    console.log("Its Connected To The Port")
})