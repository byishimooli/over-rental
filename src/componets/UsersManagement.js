import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sanitize HTML to prevent XSS
  const escapeHtml = (unsafe) => {
    return unsafe
      ? unsafe.toString()
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      : '';
  };

  // Check if user is authenticated
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  };

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please log in to access this page');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8090/api/users/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          let errorMessage = 'Unexpected error occurred';
          
          if (response.status === 401) {
            errorMessage = 'Unauthorized access: Your session has expired. Please log in again.';
            localStorage.removeItem('token');
            // Optional: Redirect to login page
            // window.location.href = '/login';
          } else if (response.status === 403) {
            errorMessage = 'Access denied: Insufficient privileges';
          } else {
            errorMessage = `HTTP error! status: ${response.status}`;
          }

          throw new Error(errorMessage);
        }

        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user handler
  const handleDelete = async (userId) => {
    if (!checkAuth()) {
      setError('Please log in to perform this action');
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:8090/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        // Remove the deleted user from the state
        setUsers(users.filter((user) => user.id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        console.error("Delete Error:", error);
        alert('Failed to delete the user. Please try again later.');
      }
    }
  };

  // Edit user handler
  const handleEdit = (userId) => {
    if (!checkAuth()) {
      setError('Please log in to perform this action');
      return;
    }
    // Navigate to edit page or open edit modal
    window.location.href = `/edit-user.html?id=${userId}`;
  };

  // Download users as CSV
  const downloadTableAsCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // CSV Headers
    const headers = ['ID', 'Email', 'Username', 'Phone', 'Role'];
    csvContent += headers.join(',') + '\r\n';

    // CSV Rows
    users.forEach(user => {
      const rowData = [
        escapeHtml(user.id),
        escapeHtml(user.email),
        escapeHtml(user.username),
        escapeHtml(user.phone),
        escapeHtml(user.role)
      ];
      csvContent += rowData.join(',') + '\r\n';
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'users_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render loading state
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  // Render error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-management-container">
      <h2>Manage Users</h2>
      
      {users.length > 0 ? (
        <>
          <button onClick={downloadTableAsCSV}>Download CSV</button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{escapeHtml(user.id)}</td>
                  <td>{escapeHtml(user.email)}</td>
                  <td>{escapeHtml(user.username)}</td>
                  <td>{escapeHtml(user.phone)}</td>
                  <td>{escapeHtml(user.role)}</td>
                  <td>
                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};
 
export default UserManagement;