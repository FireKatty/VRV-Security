// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Drawer,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { ChevronLeft, Edit, Delete } from "@mui/icons-material";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [viewUsers, setViewUsers] = useState(false);
//   const [openUserDrawer, setOpenUserDrawer] = useState(false);
//   const [newUser, setNewUser] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     salary: "",
//     role: "",
//     status: "Active",
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   // Role-based permissions
//   const rolePermissions = {
//     Admin: ["Read", "Write", "Delete"],
//     Manager: ["Read", "Write"],
//     Employee: ["Read"],
//   };

//   // Function to update permissions based on role
//   const getPermissionsForRole = (role) => {
//     return rolePermissions[role] || ["Read"];
//   };

//   const handleAddUser = () => {
//     const permissions = getPermissionsForRole(newUser.role);
//     setUsers([...users, { id: users.length + 1, ...newUser, permissions }]);
//     resetNewUser();
//   };

//   const handleEditUser = () => {
//     const permissions = getPermissionsForRole(editingUser.role);
//     setUsers(
//       users.map((user) =>
//         user.id === editingUser.id ? { ...editingUser, permissions } : user
//       )
//     );
//     resetNewUser();
//   };

//   const handleDeleteUser = (id) => {
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   const toggleUserStatus = (id) => {
//     setUsers(
//       users.map((user) =>
//         user.id === id
//           ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
//           : user
//       )
//     );
//   };

//   const handleRoleChange = (id, role) => {
//     const permissions = getPermissionsForRole(role);
//     setUsers(
//       users.map((user) =>
//         user.id === id ? { ...user, role, permissions } : user
//       )
//     );
//   };

//   const resetNewUser = () => {
//     setNewUser({
//       name: "",
//       email: "",
//       phoneNumber: "",
//       salary: "",
//       role: "",
//       status: "Active",
//     });
//     setOpenUserDrawer(false);
//     setEditMode(false);
//     setEditingUser(null);
//   };

//   const addUser = async(event)=>{
//     event.preventDefault();
//     try {
      
//     } catch (error) {
      
//     }

//   }



//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" sx={{ marginBottom: 3 }}>
//         Admin Dashboard
//       </Typography>

//       {/* View/Hide User Info */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
//         <Button variant="contained" onClick={() => setOpenUserDrawer(true)}>
//           Add User
//         </Button>
//         <Button
//           variant="contained"
//           onClick={() => setViewUsers(!viewUsers)}
//           color={viewUsers ? "secondary" : "primary"}
//         >
//           {viewUsers ? "Hide User Info" : "View User Info"}
//         </Button>
//       </Box>

//       {/* User Drawer */}
//       <Drawer
//         anchor="right"
//         open={openUserDrawer}
//         onClose={resetNewUser}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: 400,
//             padding: 2,
//           },
//         }}
//       >
//         <Box>
//           <IconButton onClick={resetNewUser}>
//             <ChevronLeft />
//           </IconButton>
//           <Typography variant="h6" sx={{ marginBottom: 2 }}>
//             {editMode ? "Edit User" : "Add New User"}
//           </Typography>
//           <TextField
//             label="Name"
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.name : newUser.name}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, name: e.target.value })
//                 : setNewUser({ ...newUser, name: e.target.value })
//             }
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.email : newUser.email}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, email: e.target.value })
//                 : setNewUser({ ...newUser, email: e.target.value })
//             }
//           />
//           <TextField
//             label="Phone Number"
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.phoneNumber : newUser.phoneNumber}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, phoneNumber: e.target.value })
//                 : setNewUser({ ...newUser, phoneNumber: e.target.value })
//             }
//           />
//           <TextField
//             label="Salary"
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.salary : newUser.salary}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, salary: e.target.value })
//                 : setNewUser({ ...newUser, salary: e.target.value })
//             }
//           />
//           <Select
//             label="Role"
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.role : newUser.role}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, role: e.target.value })
//                 : setNewUser({ ...newUser, role: e.target.value })
//             }
//             displayEmpty
//           >
//             <MenuItem value="" disabled>
//               Select Role
//             </MenuItem>
//             <MenuItem value="Admin">Admin</MenuItem>
//             <MenuItem value="Manager">Manager</MenuItem>
//             <MenuItem value="Employee">Employee</MenuItem>
//           </Select>
//           <Button
//             variant="contained"
//             fullWidth
//             sx={{ marginTop: 2 }}
//             onClick={editMode ? handleEditUser : handleAddUser}
//           >
//             {editMode ? "Update User" : "Add User"}
//           </Button>
//         </Box>
//       </Drawer>

//       {/* User Table */}
//       {viewUsers && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Phone Number</TableCell>
//                 <TableCell>Salary</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Permissions</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.phoneNumber}</TableCell>
//                   <TableCell>{user.salary}</TableCell>
//                   <TableCell>
//                     <Select
//                       value={user.role}
//                       onChange={(e) => handleRoleChange(user.id, e.target.value)}
//                     >
//                       <MenuItem value="Admin">Admin</MenuItem>
//                       <MenuItem value="Manager">Manager</MenuItem>
//                       <MenuItem value="Employee">Employee</MenuItem>
//                     </Select>
//                   </TableCell>
//                   <TableCell>{user.permissions.join(", ")}</TableCell> {/* Display permissions */}
//                   <TableCell>
//                     <Button
//                       variant="outlined"
//                       onClick={() => toggleUserStatus(user.id)}
//                     >
//                       {user.status}
//                     </Button>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => {
//                       setEditMode(true);
//                       setEditingUser(user);
//                       setOpenUserDrawer(true);
//                     }}>
//                       <Edit />
//                     </IconButton>
//                     <IconButton onClick={() => handleDeleteUser(user.id)}>
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default AdminDashboard;


// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Drawer,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { ChevronLeft, Edit, Delete } from "@mui/icons-material";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [viewUsers, setViewUsers] = useState(false);
//   const [openUserDrawer, setOpenUserDrawer] = useState(false);
//   const [newUser, setNewUser] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     salary: "",
//     role: "",
//     status: "Active",
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   // Role-based permissions
//   const rolePermissions = {
//     Admin: ["Read", "Write", "Delete"],
//     Manager: ["Read", "Write"],
//     Employee: ["Read"],
//   };

//   // Function to update permissions based on role
//   const getPermissionsForRole = (role) => {
//     return rolePermissions[role] || ["Read"];
//   };

//   // Handle adding a new user
//   const handleAddUser = async(event) => {
//     event.preventDefault();
//     const permissions = getPermissionsForRole(newUser.role);

//     // Add new user to the users array
//     setUsers((prevUsers) => {
//       const updatedUsers = [...prevUsers, { id: prevUsers.length + 1, ...newUser, permissions }];
//       console.log("Users before reset:", updatedUsers); // Log current users
//       return updatedUsers;
//     });

//     try {
//       const response = await fetch("http://localhost:9876/api/data/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({newUser,permissions}),
//       });
//       if (response.ok) {
//         console.log(response)
//         // const newUser = await response.json();
//         // setUsers([...users, newUser]);
//         // resetNewUser();
//       }
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }

//     // Clear users array after adding
//     setTimeout(() => {
//       setUsers([]); // Reset users array
//     }, 0);

//     resetNewUser();
//   };

//   // Fetch User Data From DataBase
//   const fetchUsersFromDatabase = async () => {
//     try {
//       console.log("fetch apii run")
//       const response = await fetch("http://localhost:9876/api/data/list", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         setUsers(data);
//       } else {
//         console.error("Failed to fetch users");
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
  
//   const toggleViewUsers = () => {
//     if (!viewUsers) {
//       console.log("toggle run")
//       fetchUsersFromDatabase();
//     }
//     setViewUsers(!viewUsers);
//   };
  

//   // Handle editing a user
//   const handleEditUser = () => {
//     const permissions = getPermissionsForRole(editingUser.role);
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === editingUser.id ? { ...editingUser, permissions } : user
//       )
//     );
//     resetNewUser();
//   };

//   // Handle deleting a user
//   const handleDeleteUser = async (id) => {
//     try {
//       console.log({name:"runapii",id})
//       const response = await fetch(`http://localhost:9876/api/data/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (response.ok) {
//         // Remove the user from the local state
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//         console.log(`User with ID ${id} deleted successfully.`);
//       } else {
//         console.error(`Failed to delete user with ID ${id}.`);
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };
  

//   // Toggle user status between Active and Inactive
//   const toggleUserStatus = (id) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === id
//           ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
//           : user
//       )
//     );
//   };

//   // Update role and permissions for a user
//   const handleRoleChange = (id, role) => {
//     const permissions = getPermissionsForRole(role);
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === id ? { ...user, role, permissions } : user
//       )
//     );
//   };

//   // Reset new user form and state
//   const resetNewUser = () => {
//     setNewUser({
//       name: "",
//       email: "",
//       phoneNumber: "",
//       salary: "",
//       role: "",
//       status: "Active",
//     });
//     setOpenUserDrawer(false);
//     setEditMode(false);
//     setEditingUser(null);
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" sx={{ marginBottom: 3 }}>
//         Admin Dashboard
//       </Typography>

//       {/* View/Hide User Info */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
//         <Button variant="contained" onClick={() => setOpenUserDrawer(true)}>
//           Add User
//         </Button>
//         <Button
//           variant="contained"
//           onClick={toggleViewUsers}
//           color={viewUsers ? "secondary" : "primary"}
//         >
//           {viewUsers ? "Hide User Info" : "View User Info"}
//         </Button>

//       </Box>

//       {/* User Drawer */}
//       <Drawer
//         anchor="right"
//         open={openUserDrawer}
//         onClose={resetNewUser}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: 400,
//             padding: 2,
//           },
//         }}
//       >
//         <Box>
//           <IconButton onClick={resetNewUser}>
//             <ChevronLeft />
//           </IconButton>
//           <Typography variant="h6" sx={{ marginBottom: 2 }}>
//             {editMode ? "Edit User" : "Add New User"}
//           </Typography>
//           <TextField
//             label="Name"
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.name : newUser.name}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, name: e.target.value })
//                 : setNewUser({ ...newUser, name: e.target.value })
//             }
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.email : newUser.email}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, email: e.target.value })
//                 : setNewUser({ ...newUser, email: e.target.value })
//             }
//           />
//           <TextField
//             label="Phone Number"
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.phoneNumber : newUser.phoneNumber}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, phoneNumber: e.target.value })
//                 : setNewUser({ ...newUser, phoneNumber: e.target.value })
//             }
//           />
//           <TextField
//             label="Salary"
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.salary : newUser.salary}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, salary: e.target.value })
//                 : setNewUser({ ...newUser, salary: e.target.value })
//             }
//           />
//           <Select
//             fullWidth
//             margin="normal"
//             value={editMode ? editingUser?.role : newUser.role}
//             onChange={(e) =>
//               editMode
//                 ? setEditingUser({ ...editingUser, role: e.target.value })
//                 : setNewUser({ ...newUser, role: e.target.value })
//             }
//             displayEmpty
//           >
//             <MenuItem value="" disabled>
//               Select Role
//             </MenuItem>
//             <MenuItem value="Admin">Admin</MenuItem>
//             <MenuItem value="Manager">Manager</MenuItem>
//             <MenuItem value="Employee">Employee</MenuItem>
//           </Select>
//           <Button
//             variant="contained"
//             fullWidth
//             sx={{ marginTop: 2 }}
//             onClick={editMode ? handleEditUser : handleAddUser}
//           >
//             {editMode ? "Update User" : "Add User"}
//           </Button>
//         </Box>
//       </Drawer>

//       {/* User Table */}
//       {viewUsers && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Phone Number</TableCell>
//                 <TableCell>Salary</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Permissions</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.phoneNumber}</TableCell>
//                   <TableCell>{user.salary}</TableCell>
//                   <TableCell>
//                     <Select
//                       value={user.role}
//                       onChange={(e) => handleRoleChange(user.id, e.target.value)}
//                     >
//                       <MenuItem value="Admin">Admin</MenuItem>
//                       <MenuItem value="Manager">Manager</MenuItem>
//                       <MenuItem value="Employee">Employee</MenuItem>
//                     </Select>
//                   </TableCell>
//                   <TableCell>{user.permissions.join(", ")}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="outlined"
//                       onClick={() => toggleUserStatus(user.id)}
//                     >
//                       {user.status}
//                     </Button>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton
//                       onClick={() => {
//                         setEditMode(true);
//                         setEditingUser(user);
//                         setOpenUserDrawer(true);
//                       }}
//                     >
//                       <Edit />
//                     </IconButton>
//                     <IconButton onClick={() => handleDeleteUser(user.id)}>
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default AdminDashboard;



// correct 
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
  const [editMode, setEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Role-based permissions
  const rolePermissions = {
    Admin: ["Read", "Write", "Delete"],
    Manager: ["Read", "Write"],
    Employee: ["Read"],
  };

  // Function to update permissions based on role
  const getPermissionsForRole = (role) => {
    return rolePermissions[role] || ["Read"];
  };

  // Handle adding a new user
  const handleAddUser = async(event) => {
    event.preventDefault();
    const permissions = getPermissionsForRole(newUser.role);
    try {
      const response = await fetch("http://localhost:9876/api/data/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({newUser,permissions}),
      });
      if (response.ok) {
        console.log(response)
        // const newUser = await response.json();
        // setUsers([...users, newUser]);
        // resetNewUser();
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }

    // Clear users array after adding
    setTimeout(() => {
      setUsers([]); // Reset users array
    }, 0);

    resetNewUser();
  };

  // Fetch User Data From DataBase
  const fetchUsersFromDatabase = async () => {
    try {
      console.log("fetch apii run")
      const response = await fetch("http://localhost:9876/api/data/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const toggleViewUsers = () => {
    if (!viewUsers) {
      console.log("toggle run")
      fetchUsersFromDatabase();
    }
    setViewUsers(!viewUsers);
  };
  

  // Handle editing a user
  // const handleEditUser = async () => {
  //   const permissions = getPermissionsForRole(editingUser.role);
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === editingUser.id ? { ...editingUser, permissions } : user
  //     )
  //   );

  //   try {
  //     const response = await fetch(`http://localhost:9876/api/data/update/${editingUser.id}`, {
  //       method: "PUT", // Corrected the method to PUT
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ editingUser, permissions }), // Sending the whole edited user data with updated permissions
  //     });

  //     if (response.ok) {
  //       const updatedUser = await response.json();
  //       console.log(updatedUser)
  //       // Get the updated user from the response
  //       setUsers((prevUsers) =>
  //         prevUsers.map((user) =>
  //           user.id === editingUser.id ? updatedUser : user
  //         )
  //       );
  //       console.log(users)
  //       resetNewUser();
  //     }
  //   } catch (error) {
  //     console.error("Error editing user:", error);
  //   }
  // };


  const handleEditUser = async () => {
    const permissions = getPermissionsForRole(editingUser.role) || []; // Ensure permissions is always an array
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUser.id ? { ...editingUser, permissions } : user
      )
    );
    try {
      const response = await fetch(`http://localhost:9876/api/data/update/${editingUser.id}`, {
        method: "PUT", // Corrected the method to PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ editingUser, permissions }), // Sending the whole edited user data with updated permissions
      });
  
      if (response.ok) {
        fetchUsersFromDatabase();
        // const updatedUser = await response.json();
        // console.log(updatedUser);
        // // Get the updated user from the response
        // setUsers((prevUsers) =>
        //   prevUsers.map((user) =>
        //     user.id === editingUser.id ? updatedUser : user
        //   )
        // );
        // console.log(users);
        resetNewUser();
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };
  

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    try {
      console.log({name:"runapii",id})
      const response = await fetch(`http://localhost:9876/api/data/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // Remove the user from the local state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        console.log(`User with ID ${id} deleted successfully.`);
      } else {
        console.error(`Failed to delete user with ID ${id}.`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  // Toggle user status between Active and Inactive
  const toggleUserStatus = async (id) => {
    try {
      // Call the backend API to toggle the user's status
      const response = await fetch(`http://localhost:9876/api/data/toggleStatus/${id}`, {
        method: "PUT", // PUT request to update the status
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // Get the updated user object from the response
        const updatedUser = await response.json();
  
        // Update the users list in state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? updatedUser : user
          )
        );
  
        console.log("User status updated successfully:", updatedUser);
      } else {
        console.error("Failed to toggle user status. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };
  
  // Update role and permissions for a user
  const handleRoleChange = async (id, role) => {
    const permissions = getPermissionsForRole(role); // Get the permissions for the selected role
    
    // Update the local state to reflect the changes
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role, permissions } : user
      )
    );
  
    try {
      const response = await fetch(`http://localhost:9876/api/data/editrole/${id}`, { // Use id here, not editingUser.id
        method: "PUT", // Corrected the method to PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, permissions }), // Send updated role and permissions in the body
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser);
        
        // Update the local state with the updated user from the response
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? updatedUser : user
          )
        );
        
        console.log(users); // Log the updated users
        resetNewUser(); // Reset form or relevant state after update
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };
  

  // Reset new user form and state
  const resetNewUser = () => {
    setNewUser({
      name: "",
      email: "",
      phoneNumber: "",
      salary: "",
      role: "",
      status: "Active",
    });
    setOpenUserDrawer(false);
    setEditMode(false);
    setEditingUser(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Admin Dashboard
      </Typography>

      {/* View/Hide User Info */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <Button variant="contained" onClick={() => setOpenUserDrawer(true)}>
          Add User
        </Button>
        <Button
          variant="contained"
          onClick={toggleViewUsers}
          color={viewUsers ? "secondary" : "primary"}
        >
          {viewUsers ? "Hide User Info" : "View User Info"}
        </Button>

      </Box>

      {/* User Drawer */}
      <Drawer
        anchor="right"
        open={openUserDrawer}
        onClose={resetNewUser}
        sx={{
          "& .MuiDrawer-paper": {
            width: 400,
            padding: 2,
          },
        }}
      >
        <Box>
          <IconButton onClick={resetNewUser}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {editMode ? "Edit User" : "Add New User"}
          </Typography>
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
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </Select>
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

      {/* User Table */}
      {viewUsers && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.salary}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Employee">Employee</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{user.permissions.join(", ")}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setEditMode(true);
                        setEditingUser(user);
                        setOpenUserDrawer(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminDashboard;
