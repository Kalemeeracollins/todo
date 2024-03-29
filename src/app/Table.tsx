
'use client'
import React, { useState, useEffect } from 'react';

const Table = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({
    Username: '',
    Phone: '',
    Email: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/users.json');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setFormData(userToEdit);
    setEditingUserId(userId);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.Username || !formData.Phone || !formData.Email) return;
    if (editingUserId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === editingUserId ? { ...formData, id: user.id } : user
      );
      setUsers(updatedUsers);
      setFormData({ Username: '', Phone: '', Email: '' });
      setEditingUserId(null);
    } else {
      addUser({ ...formData, id: Date.now() });
      setFormData({ Username: '', Phone: '', Email: '' });
    }
  };

  return (
    <div>
      <AddUserForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid red', padding: '8px' }}>Edit user</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Username</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Phone</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
              <td style={{ border: '1px solid black', padding: '8px' }}>{user.Username}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{user.Phone}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{user.Email}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddUserForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input  style={{ color: 'black' }}
        type="text"
        placeholder="Username"
        name="Username"
        value={formData.Username}
        onChange={handleChange}
      />
      <input style={{ color: 'black' }}
        type="text"
        placeholder="Phone"
        name="Phone"
        value={formData.Phone}
        onChange={handleChange}
      />
      <input style={{ color: 'black' }}
        type="email"
        placeholder="Email"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
      />
      <button type="submit">Add User</button>
    </form>
  );
};
const inputStyle = {
  marginBottom: '10px',
  padding: '8px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '8px 16px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Table;
