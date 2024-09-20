import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext'; // Import AuthContext for handling logout

const Logout = () => {
  const { logout } = useContext(AuthContext); // Access the logout function from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic
    logout();

    // Redirect to the login page or home page after logout
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div className="logout-container">
      <p>Logging you out...</p>
    </div>
  );
};

export default Logout;
