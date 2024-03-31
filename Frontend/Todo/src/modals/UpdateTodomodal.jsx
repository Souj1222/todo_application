import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { authDataInStore } from "../store/auth/authSlice";
import { TODO_API } from "../constants/ApiEndPoints";

function UpdateTodoModal({ open, onClose, onSubmit,TodoId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {user} = useSelector(authDataInStore);

  const handleSubmit = async () => {
    // Here you might want to call an API to add the todo
    const token = user.token;
    const data = {  description,title };
    console.log(data)
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify(data)
      };
    const response = await fetch(TODO_API.UPDATE_TODO(TodoId),options);

    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedtodo = await response.json(); // Assuming your API responds with the added todo item
    

    onSubmit(updatedtodo);
    setTitle(""); // Reset the title
    setDescription(""); // Reset the description
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>update Todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          make changes in your todo
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Todo</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateTodoModal;
