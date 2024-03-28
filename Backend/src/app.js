

//imports for the app
const express = require('express')
const app = express();
const routes = require("./api/routes/todoroutes")


app.use(express.json())
app.use('/api/todos',routes)



//export the module to import in the index.js
module.exports=app;
