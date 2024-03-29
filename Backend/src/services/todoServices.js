const jwt = require('jsonwebtoken');


const { hashPassword } = require('../../utils/passwordhashingUtil');
const {isvalidpassword} = require('../../utils/passwordcheckutil')
const {Todo} =  require('../models/todomodels');
const {User} = require('../models/todomodels')




//functions for the user registrations and the login routes
exports.createUser = async({email,password})=>{
    try{
        const existingUser = await  User.findOne({ email: email });
         if (existingUser){
            return{error:"user already  exists"}
        }  
        const hashedpassword = await hashPassword(password)
        const user = new User({ email , password : hashedpassword })
        await user.save();

        //jwt token generation
        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        return { user: { email: user.email, _id: user._id }, token };
    }catch(error){
        console.log("this is create user service",error.message)
        throw new Error(error)
    }
}

exports.login = async({email,password})=>{
    try{
        const user = await User.findOne({ email: email });
    
        if (!user){
           return { error:'No such user found'};
       }
       const validPassord = await isvalidpassword(password,user.password);
       if(validPassord.error){
        return {error:"Invlid password"}
       }

       //JWT token generation
       const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
       return { token, user: { email: user.email, _id: user._id } };
    }catch(error){
        console.log(error.message)
        throw new Error(error)
    }
}

exports.getAllTodos = async(userId)=>{
   try{
    return await Todo.find({user:userId})
   }catch(error){
    console.log("Error in getting all todos", error);
    throw new Error('Error getting todos: ' + error.message);
   }
}

exports.createTodo = async(data)=>{
    try{
        const tododata = {
            ...data,
            user: data.userId
        }
        
        const todo = new Todo(tododata)
        await todo.save();
        return todo
    }catch(error){
        throw new Error('Error creating the todo:'+error.message)
    }
}

exports.getTodoById = async(id,userId)=>{
    try{
        const todo = await Todo.findOne({_id:id,user:userId});
        return todo

    }catch(error){
        throw new Error('error finding todo:'+error.message)
    }
}

exports.updateTodo = async(id,data,userId)=>{
    try{

        const updateTodo = await Todo.findByIdAndUpdate(id,data, {new:true},{user:userId});
        return updateTodo
    }catch(error){
        throw new Error('Error updating the todo'+error.message)
    }
}


exports.deleteTodoById = async(id,userId) =>{
    try{
        
        const todoToBeRemove = await Todo.findById(id)
        if(todoToBeRemove){
            const deletedata = {
            _id:id,
            user:userId
        }
        await Todo.deleteOne(deletedata)
        
        }else{
            throw new Error("this todo does not exist")
        }
        
    }catch(error){
        throw new Error('Error deleting the todo:'+error.message)
    }
}


