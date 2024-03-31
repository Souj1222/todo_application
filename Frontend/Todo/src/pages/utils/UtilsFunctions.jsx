
import { TODO_API } from "../../constants/ApiEndPoints";

export const handleDeleteTodo = async (todoId,token) => {
 
  try {
    
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    if (todoId) {
      const response = await fetch(TODO_API.DELETE_TODO(todoId), options);
      console.log(response)
      if(!response.ok){
        return "success"
      }else{
        return "error"
      }
    }else{
        throw new Error("No Todo Id Provided");
    }
  } catch (error) {
    return error;
  }
};
