// Final Change
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import { ChevronLeft, Edit, Delete } from "@mui/icons-material";
import Header from "./Header";
import image from "../images/19.jpg"
// 17,19
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [viewUsers, setViewUsers] = useState(false);
  const [openUserDrawer, setOpenUserDrawer] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    salary: "",
    role: "",
    status: "Active",
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const rolePermissions = {
    Admin: ["Read", "Write", "Delete"],
    Manager: ["Read", "Write"],
    Employee: ["Read"],
  };

  const getPermissionsForRole = (role) => {
    return rolePermissions[role] || ["Read"];
  };

  const validateUser = (user) => {
    const errors = {};

    if (!user.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "Invalid email address.";
    }

    if (!/^\d{10}$/.test(user.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!/^\d+$/.test(user.salary)) {
      errors.salary = "Salary must be a numeric value.";
    }

    if (!user.role) {
      errors.role = "Role is required.";
    }

    return errors;
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    const validationErrors = validateUser(newUser);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const permissions = getPermissionsForRole(newUser.role);
    try {
      const response = await fetch("http://localhost:9876/api/data/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem('token'))
        },
        body: JSON.stringify({ newUser, permissions }),
      });
      if (response.ok) {
        fetchUsersFromDatabase();
        console.log(response);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }

    setTimeout(() => {
      setUsers([]);
    }, 0);

    resetNewUser();
  };

  const fetchUsersFromDatabase = async () => {
    try {
      console.log("fetch apii run");
      const response = await fetch("http://localhost:9876/api/data/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem('token'))
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        console.log(users);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleViewUsers = () => {
    if (!viewUsers) {
      console.log("toggle run");
      fetchUsersFromDatabase();
    }
    setViewUsers(!viewUsers);
  };

  const handleEditUser = async (event) => {
    event.preventDefault();

    const validationErrors = validateUser(editingUser);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const permissions = getPermissionsForRole(editingUser.role) || [];

    try {
      const response = await fetch(`http://localhost:9876/api/data/update/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem('token'))
        },
        body: JSON.stringify({ ...editingUser, permissions }),
      });

      if (response.ok) {
        await fetchUsersFromDatabase();
      } else {
        console.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUser.id ? { ...editingUser, permissions } : user
      )
    );

    setEditMode(false);
    setEditingUser(null);
    setOpenUserDrawer(false);
  };

  const handleDeleteUser = async (id) => {
    try {
      console.log({ name: "runapii", id });
      const response = await fetch(`http://localhost:9876/api/data/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem('token'))
        },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        console.log(`User with ID ${id} deleted successfully.`);
      } else {
        console.error(`Failed to delete user with ID ${id}.`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleUserStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:9876/api/data/toggleStatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem('token'))
        },
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? updatedUser : user))
        );
        console.log("User status updated successfully:", updatedUser);
      } else {
        console.error("Failed to toggle user status.");
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const handleRoleChange = async (id, role) => {
    const permissions = getPermissionsForRole(role);

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role, permissions } : user
      )
    );

    try {
      const response = await fetch(`http://localhost:9876/api/data/editrole/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem('token'))
        },
        body: JSON.stringify({ role, permissions }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? updatedUser : user))
        );
        resetNewUser();
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const resetNewUser = () => {
    setNewUser({
      name: "",
      email: "",
      phoneNumber: "",
      salary: "",
      role: "",
      status: "Active",
    });
    setErrors({});
    setOpenUserDrawer(false);
    setEditMode(false);
    setEditingUser(null);
  };

  return (
    <Box>
      <Box sx={{padding: 3,
     backgroundImage: `url(${image})`, // Add your image URL here
     backgroundSize: "cover", // Ensure the image covers the entire container
     backgroundPosition: "center", // Center the image
     backgroundAttachment: "fixed", // Fix the image position when scrolling (optional)
     minHeight: "calc(100vh - 49px)", // Adjust dynamically to the viewport, considering a header/footer of 64px
     opacity: 0.9, // Adjust transparency
     overflow: "hidden", // Prevent scrollbars
    }} // Prevent any scrollbars from appearing
    
    >
      <Header/>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          textAlign: "center",
          color: "#00FFF", // Text color to ensure visibility
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Add shadow for extra emphasis
        }}
      >
        Admin Dashboard
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <Button
          variant="contained"
          onClick={() => setOpenUserDrawer(true)}
          sx={{
            color: "#fff",
            backgroundColor: "#00796b",
            "&:hover": { backgroundColor: "#004d40" },
          }}
        >
          Add User
        </Button>
        <Button
          variant="contained"
          onClick={toggleViewUsers}
          color={viewUsers ? "secondary" : "primary"}
          sx={{
            color: "#fff",
            backgroundColor: "#00796b",
            "&:hover": { backgroundColor: "#004d40" },
          }}
        >
          {viewUsers ? "Hide User Info" : "View User Info"}
        </Button>
        </Box>
      

      <Drawer
        anchor="right"
        open={openUserDrawer}
        onClose={resetNewUser}
        sx={{
          "& .MuiDrawer-paper": {
            width: 400,
            padding: 2,
            backgroundColor: "rgba(0.5,0.5,0.5,0.5)", // Apply transparency to the drawer
          },
        }}
      >
        <Box>
          <IconButton onClick={resetNewUser}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" sx={{ marginBottom: 2, color: "#000", fontWeight: "bold",marginTop:5  }}>
            {editMode ? "Edit User" : "Add New User"}
          </Typography>

          {/* Add New User Form Fields */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={editMode ? editingUser?.name : newUser.name}
            onChange={(e) =>
              editMode
                ? setEditingUser({ ...editingUser, name: e.target.value })
                : setNewUser({ ...newUser, name: e.target.value })
            }
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={editMode ? editingUser?.email : newUser.email}
            onChange={(e) =>
              editMode
                ? setEditingUser({ ...editingUser, email: e.target.value })
                : setNewUser({ ...newUser, email: e.target.value })
            }
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={editMode ? editingUser?.phoneNumber : newUser.phoneNumber}
            onChange={(e) =>
              editMode
                ? setEditingUser({ ...editingUser, phoneNumber: e.target.value })
                : setNewUser({ ...newUser, phoneNumber: e.target.value })
            }
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            label="Salary"
            fullWidth
            margin="normal"
            value={editMode ? editingUser?.salary : newUser.salary}
            onChange={(e) =>
              editMode
                ? setEditingUser({ ...editingUser, salary: e.target.value })
                : setNewUser({ ...newUser, salary: e.target.value })
            }
            error={!!errors.salary}
            helperText={errors.salary}
          />
          <Select
            fullWidth
            margin="normal"
            value={editMode ? editingUser?.role : newUser.role}
            onChange={(e) =>
              editMode
                ? setEditingUser({ ...editingUser, role: e.target.value })
                : setNewUser({ ...newUser, role: e.target.value })
            }
            displayEmpty
            error={!!errors.role}
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </Select>
          {errors.role && <Typography color="error">{errors.role}</Typography>}
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={editMode ? handleEditUser : handleAddUser}
          >
            {editMode ? "Update User" : "Add User"}
          </Button>
        </Box>
      </Drawer>

      {viewUsers && (
          <Box sx={{ marginTop: 7 }}>
            <TableContainer component={Paper} sx={{ maxHeight: "450px", overflowY: "auto", backgroundColor: "rgba(255,255,255,.3)" }}>
              <Table>
                <TableHead stickyHeader sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <TableRow>
                    <TableCell sx={{ color: "#ecf0f1" }}>ID</TableCell>
                    <TableCell sx={{ color: "#ecf0f1" }}>Name</TableCell>
                    <TableCell sx={{ color: "#ecf0f1" }}>Email</TableCell>
                    <TableCell sx={{ color: "#ecf0f1" }}>Phone Number</TableCell>
                    <TableCell sx={{ color: "#ecf0f1" }}>Salary</TableCell>
                    <TableCell sx={{ color: "#ecf0f1" }}>Role</TableCell>
                    <TableCell sx={{ color: "#ecf0f1" }}>Permissions</TableCell>
                    <TableCell sx={{ color: "#ecf0f1" }}>Status</TableCell>
                    <TableCell sx={{ color: "#ecf0f1" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.result === "Not Found" || users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} sx={{ textAlign: "center", color: "#000ecf0f1", padding: "20px", fontWeight: "bold" , backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        No User Available
                      </TableCell>
                    </TableRow>
                  ) : (
                    Array.isArray(users) &&
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell sx={{ color: "#000" }}>{user.id}</TableCell>
                        <TableCell sx={{ color: "#000" }}>{user.name}</TableCell>
                        <TableCell sx={{ color: "#000" }}>{user.email}</TableCell>
                        <TableCell sx={{ color: "#000" }}>{user.phoneNumber}</TableCell>
                        <TableCell sx={{ color: "#000" }}>{user.salary}</TableCell>
                        <TableCell sx={{ color: "#000" }}>
                          <Select
                            sx={{
                              color: "#000",
                              border: "1px solid #00796b",
                              borderRadius: "4px",
                              "& .MuiSelect-icon": {
                                color: "#00796b",
                              },
                            }}
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                            <MenuItem value="Employee">Employee</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell sx={{ color: "#000" }}>{user.permissions.join(", ")}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            sx={{
                              color: user.status === "Active" ? "green" : "red",
                              borderColor: user.status === "Active" ? "green" : "red",
                            }}
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            sx={{ color: "#00796b" }}
                            onClick={() => {
                              setEditMode(true);
                              setEditingUser(user);
                              setOpenUserDrawer(true);
                            }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            sx={{ color: "#d32f2f" }}
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;