const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:false},
    completed:{type:Boolean, required:false}
})



module.exports = mongoose.model('Todo', TodoSchema)