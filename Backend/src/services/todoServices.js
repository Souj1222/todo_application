const Todo =  require('../models/todomodels');


exports.getAllTodos = async()=>{
   try{
    return await Todo.find()
   }catch(error){
    console.log("Error in getting all todos", error);
    throw new Error('Error getting todos: ' + error.message);
   }
}

exports.createTodo = async(data)=>{
    try{
        const todo = new Todo(data)
        await todo.save();
        return todo
    }catch(error){
        throw new Error('Error creating the todo:'+error.message)
    }
}

exports.getTodoById = async(id)=>{
    try{
        const todo = await Todo.findById(id);
        return todo

    }catch(error){
        throw new Error('error finding todo:'+error.message)
    }
}

exports.updateTodo = async(id,data)=>{
    try{
        const updateTodo = await Todo.findByIdAndUpdate(id,data, {new:true});
        return updateTodo
    }catch(error){
        throw new Error('Error updating the todo'+error.message)
    }
}


exports.deleteTodoById = async(id) =>{
    try{
        await Todo.findByIdAndDelete(id)
    }catch(error){
        throw new Error('Error deleting the todo:'+error.message)
    }
}