// frontend/src/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Assuming backend server is running on this URL

const api = axios.create({
  baseURL: BASE_URL,
});

const signup = async (formData) => {
  try {
    // Send a POST request to the backend endpoint for user registration
    const response = await api.post('/signup', formData);

    // Extract the token and message from the response data
    const { token, message } = response.data;

    // Store the JWT token in localStorage for future requests
    localStorage.setItem('token', token);

    // Return success message and JWT token
    return { success: true, message };
  } catch (error) {
    // Handle errors if the request fails
    // Extract error message from the response data
    const errorMessage = error.response ? error.response.data.message : 'Failed to sign up';

    // Return error message
    return { success: false, message: errorMessage };
  }
};

const getPosts = () => {
  return api.get('/posts');
};

export default {
  signup,
  getPosts,
};
