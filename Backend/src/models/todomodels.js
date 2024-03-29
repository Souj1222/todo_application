const mongoose = require('mongoose')

const {Schema} = mongoose

const TodoSchema = new Schema({
    title:{type:String, required:true},
    description:{type:String, required:false},
    completed:{type:Boolean, required:false},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const UserSchema = new Schema({
    email:{type:String, required:true},
    password:{type:String,required:true}
})

const Todo = mongoose.model('Todo',TodoSchema)
const User = mongoose.model('User',UserSchema)

module.exports = {Todo, User}; 