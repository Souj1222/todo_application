

//imports for the app
const express = require('express')
const app = express();
const routes = require("./api/routes/privateroutes/todoroutes")
const authroutes = require("./api/routes/publicroutes/authenticationroutes")
const authenticate = require("./api/middleware/authmiddleware")
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use('/api/todos',authenticate,routes) //protected route which uses the authetication middle ware and then passes the function to the routes
app.use('/api/auth',authroutes)//auth routes which includes routes related to the register and the login purpose


//export the module to import in the index.js
module.exports=app;
