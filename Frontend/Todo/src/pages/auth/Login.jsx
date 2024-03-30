import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authDataInStore, login } from "../../store/auth/authSlice"; // Adjust the import path to your actual authSlice location
import APP_ENDPOINTS from "../../constants/AppEndPoints"; // Adjust the import path to your actual AppEndpoints location
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AUTH_END_POINTS } from "../../constants/ApiEndPoints";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { isLoggedIn } = useSelector(authDataInStore);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const {user} = useSelector(authDataInStore)


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Placeholder for your API call
    try {
      const response = await fetch(AUTH_END_POINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This line is important for sending JSON data
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();

      if (data.error) {
        alert("Invalid credentials!");
        navigate(APP_ENDPOINTS.AUTH);
      } else {
        // Navigate to the home page upon successful login
        navigate(APP_ENDPOINTS.ROOT);
        // Dispatch the login action with the API response data
        dispatch(login(data));
      }
      
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
