import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Tasks from './components/Tasks';
import Projects from './components/Projects';
import Logout from './components/Logout';
import { AuthProvider } from './providers/AuthContext';
import ProtectedRoute from './components/ProtectedRoutes'; // Import the ProtectedRoute
import './styles/App.scss'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<ProtectedRoute element={<Tasks />} />} />
          <Route path="/projects" element={<ProtectedRoute element={<Projects />} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<ProtectedRoute element={<Tasks />} />} /> {/* Default route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
