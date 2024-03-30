import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authDataInStore } from "../../store/auth/authSlice";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
import AddTodoModal from "../../modals/AddNewTodoModal";

const Home = () => {
  const { user } = useSelector(authDataInStore);
  const [todos, setTodos] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);


  useEffect(() => {
    todolist();
  }, []);

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
      const response = await fetch("https://localhost:3000/api/todos", options);

      if (!response.ok) {
        throw new Error("HTTP-Error: Can't get data");
      }

      const data = await response.json();

      setTodos(data);
      
    } catch (error) {
      return null;
    }
  };

  const handleopenmodal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddTodoSubmit = (newTodo) => {
    // Add the new todo to the current list of todos
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  return (
    <Box
      minWidth={"800px"}
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
      >
        <Typography color={"black"} variant="h6">
          Your Todo list
        </Typography>
        <Button color="primary" onClick={handleopenmodal}>
          add new todo
        </Button>
        <AddTodoModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleAddTodoSubmit}
      />
      </Box>
      <Divider  />
      <Box mt={2}>
      {todos.map((todo) => (
        <Accordion key={todo._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${todo._id}-content`}
            id={`panel${todo._id}-header`}
          >
            <Typography>{todo.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{todo.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </Box>
    </Box>
  );
};

export default Home;
