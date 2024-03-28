const express = require('express');
const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
//define the port else it will use port 3000 by default
const PORT = process.env.PORT || 3000



//connect to MongoDB database using Mongoose ORM
mongoose.connect(process.env.MONGOURI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=> console.error(err))


//start listening on that specific port
app.listen(PORT , () => {
    console.log(`Server is running at http://localhost:${PORT}`)
    
}); 

