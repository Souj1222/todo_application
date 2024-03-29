import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import APP_ENDPOINTS from '../../constants/AppEndPoints';

const Auth = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Authentication
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            component={Link}
            to="/login" // Adjust the path based on your routing setup
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            component={Link}
            to="/sign_up" // Adjust the path based on your routing setup
          >
            Signup
          </Button>
          <Outlet /> {/* This will render the LoginForm, Login, or Signup components based on the route */}
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
