//controller for the fetching all the todo lists
const todoServices = require('../../services/todoServices')


//list all todos
exports.listtodos = async(req,res)=>{
    const todos = await todoServices.getAllTodos();
    if(todos.length <1){
        res.json('No Todo List Found').status(404)
    }else{
         res.json(todos)
    }
   
}

//create  a new todo 
exports.createtodo = async(req,res)=>{
    const {title, description} = req.body;
    const todo = await todoServices.createTodo({title, description})
    res.status(201).json(todo)
}

//reading a individual todo
exports.readtodo = async(req,res)=>{
    console.log("this is the readtodo function")
    const {id} = req.params;

    try{
        const todo = await todoServices.getTodoById(id)
        if(!todo){
            return res.status(404).json({message:"The Todo with given ID was not found."});
        }
        res.json(todo);
    

    }catch(error){
        res.status(400).json({message:"error reading todo",error:error.message})
    }
}



//updating the individual todo

exports.updateTodo = async(req,res)=>{
    const{id} = req.params;
    const{title,description} = req.body
    try{
        const updateTodo = await todoServices.updateTodo(id,{title,description})
        if(!updateTodo){
            return res.status(404).json({message:'Cannot Update The Todo'})
        }
        res.json(updateTodo)
    }catch(error){
        res.status( 500).send("Error updating the todo")
    }
}


exports.deleteTodo=async (req,res)=> {
const { id } = req.params;
try{
   let deleteTodo = await todoServices.deleteTodoById(id)
   if (!deleteTodo) {
       return res.status(404).json({ message: "The Todo with the provided ID does not exist!" });
   }
   res.status(200).json({ message: "The Todo has been deleted successfully!" })
} catch(err) {
    console.log(err);
    res.status(500).json({ message: err.message });
}
};