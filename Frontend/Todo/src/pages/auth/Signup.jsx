import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/auth/authSlice'; // Adjust the import path to your actual authSlice location
import APP_ENDPOINTS from '../../constants/AppEndPoints'; // Adjust the import path to your actual AppEndpoints location
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AUTH_END_POINTS } from '../../constants/ApiEndPoints';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    // Include other registration fields as needed
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Placeholder for your API call to the signup endpoint
    try {
      const response = await fetch('https://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      const data = await response.json();
      // Dispatch the register action with the API response data
      dispatch(register(data));
      // Navigate to the home page or a post-signup page
      navigate(APP_ENDPOINTS.ROOT);
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error (e.g., show an error message)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
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
            value={userData.email}
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
            autoComplete="new-password"
            value={userData.password}
            onChange={handleChange}
          />
          {/* Include other fields as needed */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
