

//imports for the app
const express = require('express')
const app = express();
const routes = require("./api/routes/privateroutes/todoroutes")
const authroutes = require("./api/routes/publicroutes/authenticationroutes")


app.use(express.json())
app.use('/api/todos',routes)
app.use('/api/auth',authroutes)


//export the module to import in the index.js
module.exports=app;
