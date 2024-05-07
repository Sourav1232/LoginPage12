import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import ErrorMessage from './ErrorMessage';
import api from '../api';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    profilePicture: '', // Add profilePicture to formData
    termsAccepted: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Function to handle file upload for profile picture
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: file, // Update profilePicture in formData with the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validator.isEmail(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      await api.signup(formData);
      setSuccess(true);
      setError('');
      alert('Welcome! A confirmation email has been sent to your email address.');
      navigate('/post-list');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500"
    >
      <motion.div 
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ yoyo: Infinity, duration: 2, ease: "easeInOut" }}
        className="bg-white p-8 rounded-md shadow-md w-full md:w-1/2 lg:w-1/3"
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-center text-blue-500 mb-6"
        >
          Sign Up
        </motion.h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Confirm Password"
          />
          {/* Profile Picture */}
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileUpload} // Call handleFileUpload function when a file is selected
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {/* Optional Name field */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Name"
          />
          {/* Checkbox for terms acceptance */}
          <label className="flex items-center mb-4 text-gray-800">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
              className="mr-2"
            />
            I agree to the terms and conditions
          </label>
          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
          {/* Error message */}
          {error && <ErrorMessage message={error} />}
          {/* Success message */}
          {success && <p className="text-green-500 text-sm mb-4">Signup successful!</p>}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SignupForm;
