
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;
  const userName = user?.result?.firstName || "User";
  const navigate = useNavigate();

  const onLogout = ()=>{
    localStorage.clear();
    navigate('/');
  }
  



  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
          backgroundColor: "#2c3e50", // Custom dark color
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0)",
          background: "rgba(0,0,.0,0)"
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Side: Logo and Company Name */}
          <Box sx={{ display: "flex", alignItems: "center"  }}>
            <Avatar
              src="https://vrvsecurity.in/static/media/favicon.cc3b0694d956aaccd51d.ico"
              alt="Company Logo"
              sx={{ width: 40, height: 40, marginRight: 1 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#1a1a1a", // Light color for contrast
              }}
            >
              VRV Security
            </Typography>
          </Box>

          {/* Right Side: Welcome message and Logout button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body1"
              sx={{ marginRight: 2, color: "black" }} // Muted color
            >
              Welcome, {userName}!
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={onLogout}
              sx={{
                borderColor: "#2c3e50", // Dark border color for contrast
                color: "#2c3e50", // Text color for contrast
                "&:hover": {
                  backgroundColor: "#1a1a1a", // Very dark background on hover
                  color: "#ecf0f1", // Light text on hover for better visibility
                },
              }}
            >
              Logout
            </Button>

          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer to prevent content overlap */}
      <Toolbar />
    </>
  );
};

export default Header;
