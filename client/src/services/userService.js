// src/api/userService.js

import axios from 'axios';

// Define the base URL for your API
const API_URL = 'http://localhost:3333/users';

// Function to fetch users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response); // Log the full response
    return response.data; // Return the data part of the response
  } catch (error) {
    console.error('Error fetching users from server:', error);
    throw error; // Re-throw error to handle it where the function is called
  }
};
