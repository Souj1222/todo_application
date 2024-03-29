//controller for the fetching all the todo lists
const todoServices = require('../../services/todoServices')


//list all todos
exports.listtodos = async(req,res)=>{
    const userId = req.user.userId
    console.log(userId)
    const todos = await todoServices.getAllTodos(userId);
    if(todos.length <1){
        res.json('No Todo List Found').status(404)
    }else{
         res.json(todos)
    }
   
}

//create  a new todo 
exports.createtodo = async(req,res)=>{
    const userId = req.user.userId
    const {title, description} = req.body;
    const todo = await todoServices.createTodo({title, description,userId})
    res.status(201).json(todo)
}

//reading a individual todo
exports.readtodo = async(req,res)=>{
    console.log("this is the readtodo function")
    const {id} = req.params;
    const userId = req.user.userId

    try{
        const todo = await todoServices.getTodoById(id,userId)
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
    const userId = req.user.userId
    const{title,description} = req.body
    try{
        const updateTodo = await todoServices.updateTodo(id,{title,description},userId)
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
const userId = req.user.userId
try{
   let deleteTodo = await todoServices.deleteTodoById(id,userId)
   if (!deleteTodo) {
       return res.status(404).json({ message: "The Todo with the provided ID does not exist!" });
   }
   res.status(200).json({ message: "The Todo has been deleted successfully!" })
} catch(err) {
    console.log(err);
    res.status(500).json({ message: err.message });
}
};


//register function 
exports.register = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password ){
            return res.status(400).json({message:"Please provide email and password"});
        }else{
            const user = await  todoServices.createUser({email,password});
            res.status(201).json(user);
        }

    }catch(error){
        res.status(500).json({message:error.message})
        console.log(error.message)
    }
}


//user login
exports.login = async (req,res)=>{
    try{
    //get the data from body of request
    const {email,password}=req.body;
    
    //check if there is no email or password then send a response to client
    if(!email||!password) return res.status(400).json({message:'please provide an email and a password'})

    const user = await todoServices.login({email,password})
    res.status(201).json(user)

    }catch(error){
        console.log(error.message,"failed to login")
        res.status(500).json({message:error.message})
    }
}