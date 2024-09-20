import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';

const Login = () => {
  const { login } = useContext(AuthContext);  // Access the login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous error messages
    
    try {
      const response = await axios.post('http://localhost:3333/api/auth/login', {
        email,
        password,
      });
      const token = response.data.token;  // Assuming the token is returned from the server
      login(token);  // Call the login function to save the token and update the authentication state
      navigate('/projects'); // redirect to project list
    } catch (err) {
      setError('Invalid credentials. Please try again.');  // Display an error message if login fails
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Login</Typography>
        
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleLogin} style={{ width: '100%', mt: 3 }}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
