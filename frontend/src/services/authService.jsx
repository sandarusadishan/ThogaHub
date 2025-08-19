import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Change this function to accept `confirmPassword`
const registerUser = async (email, password, confirmPassword, role) => {
  try {
    const response = await axios.post(API_URL + 'register', {
      email,
      password,
      confirmPassword, // Add confirmPassword to the request body
      role,
    });
    return response.data;
  } catch (error) {
    // You should check the error response for a specific message
    const message = error.response?.data?.msg || 'Registration failed';
    console.error('Registration failed:', message);
    throw new Error(message);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || 'Login failed';
    console.error('Login failed:', message);
    throw new Error(message);
  }
};

export { registerUser, loginUser };
