import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Access auth state and logout function

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project Management
          </Typography>
          <Button color="inherit" component={Link} to="/tasks">
            Tasks
          </Button>
          <Button color="inherit" component={Link} to="/projects">
            Projects
          </Button>
          {isAuthenticated ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
