import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import api from '../api';  // Axios instance

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/notes/');  // API endpoint for fetching users data
        console.log('Users fetched successfully:', res.data);
        setUsers(res.data);  // Store the user data in state
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <CircularProgress />;  // Show loading spinner while fetching data

  if (error) return <p>{error}</p>;  // Show error message if something goes wrong

  return (
    <>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Type</TableCell>
              <TableCell>Transcript</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Confirmed</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid Date</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.user_type}</TableCell>
                <TableCell>{user.transcript}</TableCell>
                <TableCell>{user.time}</TableCell>
                <TableCell>{user.confirmed ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.paid ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.paid_date ? new Date(user.paid_date).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
