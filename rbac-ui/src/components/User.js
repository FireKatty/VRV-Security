import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [permittedData, setPermittedData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Simulated API response
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Editor",
        status: "Active",
      };

      const permissions = [
        { id: 1, resource: "Articles", actions: ["View", "Edit"] },
        { id: 2, resource: "Comments", actions: ["View", "Delete"] },
      ];

      setTimeout(() => {
        setUserInfo(userData);
        setPermittedData(permissions);
        setLoading(false);
      }, 1000); // Simulate delay
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* User Information */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Welcome, {userInfo?.name}!
      </Typography>

      <Box
        sx={{
          marginBottom: 4,
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Your Information:
        </Typography>
        <Typography>Name: {userInfo?.name}</Typography>
        <Typography>Email: {userInfo?.email}</Typography>
        <Typography>Role: {userInfo?.role}</Typography>
        <Typography>Status: {userInfo?.status}</Typography>
      </Box>

      {/* Permitted Data */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Your Permissions:
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Resource</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permittedData.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.resource}</TableCell>
                <TableCell>{permission.actions.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserDashboard;
