

//imports for the app
const expresss = require('express')
const app = expresss();
const routes = require("./api/routes/todoroutes")


app.use(expresss.json())
app.use('/api/todos',routes)



//export the module to import in the index.js
module.exports=app;
