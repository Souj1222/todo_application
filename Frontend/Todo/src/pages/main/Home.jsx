import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authDataInStore } from "../../store/auth/authSlice";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import AddTodoModal from "../../modals/AddNewTodoModal";
import { handleDeleteTodo } from "../utils/UtilsFunctions";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TODO_API } from "../../constants/ApiEndPoints";
import UpdateTodoModal from "../../modals/UpdateTodomodal";
import LogoutIcon from '@mui/icons-material/Logout';


const Home = () => {
  const { user } = useSelector(authDataInStore);//fetching the current user from the redux store
  const [todos, setTodos] = React.useState([]);//state to handle the list of the todos
  const [openModal, setOpenModal] = React.useState(false);//state to track the models open and close
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);//state to open and close the update modal
  const [currentTodo, setCurrentTodo] = React.useState(null); // To track the todo being edited


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  //useeffect to update the todolist  whenver the component mounts
  useEffect(() => {
    todolist();
  }, []);

  //function to fetch the todolist of respective user
  const todolist = async () => {
    try {
      const token = user.token;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(TODO_API.GET_ALL_TODOS, options);

      if (!response.ok) {
        throw new Error("HTTP-Error: Can't get data");
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        setTodos([]);
      }
    } catch (error) {
      setTodos([]);
    }
  };



  const handleopenmodal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  //function to handle the add submit and get the added todo from the child component 
  const handleAddTodoSubmit = (newTodo) => {
    // Add the new todo to the current list of todos
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };


  //function to open the update modal
  const handleOpenUpdateModal = (todo) => {
    setCurrentTodo(todo); // Set the current todo to be edited
    setUpdateModalOpen(true); // Open the modal
  };


  //function to delete the todo
  const onDelete = async (todoId) => {
    const token = user.token;
    if (token) {
      const result = await handleDeleteTodo(todoId, token);
      
      if (result == "success") {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== todoId)
        );
      }
    } else {
      console.error("user_token not found");
    }
  };

  //handlelogout function
  const  handleLogOut=()=>{
    localStorage.removeItem('user');
    window.location.reload();
  }

  return (
    <Box
    sx={{minWidth: isMobile?"0": "800PX"}}
      
      display="flex"
      flexDirection="column"
      minHeight={"65vh"}
      bgcolor={"floralwhite"}
      borderRadius={3}
      p={2}
    >
      <Box
        minWidth={"100%"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
        maxHeight={48}
      >
        <Typography color={"black"} sx={{varient : isMobile? "h3":"h5", fontWeight:"bold" }}>
          Your Todo list
        </Typography>
        <Box>
        <Button color="primary" onClick={handleopenmodal}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyItems={"center"}
            gap={1}
          >
            <AddCircleOutlineTwoToneIcon />
            {isMobile? "" : "add new"}
          </Box>
        </Button>
        <Button
          onClick={handleLogOut}

        >
          <LogoutIcon />
        </Button>
        </Box>
        
        <AddTodoModal
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleAddTodoSubmit}
        />
        <UpdateTodoModal
          open={updateModalOpen}
          TodoId = {currentTodo && currentTodo._id}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={(updatedTodo) => {
            setTodos((prevTodos) =>
              prevTodos.map((todo) =>
                todo._id === updatedTodo._id ? updatedTodo : todo
              )
            );
            setUpdateModalOpen(false); // Close the modal after submitting
            
          }}
          todo={currentTodo} // Pass the currentTodo as a prop if you need to pre-fill the modal with todo details
        />
      </Box>
      <Divider />
      <Box maxHeight={"60vh"} overflow={"auto"} mt={2}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Accordion key={todo._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${todo._id}-content`}
                id={`panel${todo._id}-header`}
              >
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  alignItems={"center"}
                  mr={2}
                >
                  <Typography>{todo.title}</Typography>
                  <Box display={"flex"} alignItems={"center"}>
                    {/* //update button */}
                    <Button
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent accordion from expanding
                        handleOpenUpdateModal(todo);
                      }}
                      onFocus={(event) => event.stopPropagation()} // Prevent focus from expanding the accordion
                    >
                      <EditIcon />
                    </Button>
                    {/* delete button */}
                    <Button
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent accordion from expanding
                        onDelete(todo._id);
                      }}
                      onFocus={(event) => event.stopPropagation()} // Prevent focus from expanding the accordion
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{todo.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"50vh"}
          >
            <Typography
              variant="subtitle1"
              color={"black"}
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              Create your todo list.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
