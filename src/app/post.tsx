'use client'
import { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.boogiecoin.com/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Api-Secret": "justboogie",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      console.log(data.message); // or show a success message to the user
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message); // Set error state to display error message
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>User Registration</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
