
import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Checkbox, Link, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import image from '../images/image1.png'

const Signup = ( {onSwitch}) => {
  // State variables for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
        navigate("/admin");
    }
}, [navigate]);

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    // Password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms and conditions.");
      return;
    }

    // Clear any previous error
    setError(""); 

    // Prepare the data to send
    const userData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };

    try {
      // Make the API request using fetch
      const response = await fetch('http://localhost:9876/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.auth) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem('token', JSON.stringify(data.auth));
          navigate("/admin");
        }
      } else {
        // Handle server error
        const errorData = await response.json();
        // console.log(errorData.error)
        setError(errorData.error || 'An error occurred during signup.');
      }
    } catch (error) {
      // Handle fetch error
      setError('Failed to connect to the server. Please try again.');
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#3B3A4D",
      // height: "100vh", // Keep centered
    }}
  >
    <Box
      sx={{
        display: "flex",
        maxWidth: 600, // Reduced size
        width: "100%",
        height: "auto", // Let height adjust based on content
        backgroundColor: "#28273C",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Left Section with Image */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={image}
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Box>
  
      {/* Right Section */}
      <Box
        sx={{
          width: "50%",
          padding: "24px", // Reduced padding
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
          Create an account
        </Typography>
        <Typography
          sx={{
            color: "#B3B3B3",
            margin: "8px 0 16px 0",
          }}
        >
          Already have an account?{" "}
          <Link onClick={onSwitch} sx={{ cursor: "pointer", color: "#9C69E2" }}>
            Log in
          </Link>
        </Typography>
  
        {/* Form Fields */}
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <TextField
              label="First name"
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "black", borderRadius: 1 }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last name"
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "black", borderRadius: 1 }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            sx={{ backgroundColor: "black", borderRadius: 1, marginBottom: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box sx={{ position: "relative", marginBottom: 2 }}>
            <TextField
              label="Enter your password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "black", borderRadius: 1 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              sx={{ position: "absolute", right: 8, top: 12 }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
          <Box sx={{ position: "relative", marginBottom: 2 }}>
            <TextField
              label="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "black", borderRadius: 1 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <IconButton
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              sx={{ position: "absolute", right: 8, top: 12 }}
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
  
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Checkbox
              sx={{ color: "white" }}
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <Typography sx={{ color: "#B3B3B3" }}>
              I agree to the{" "}
              <Link href="#" underline="hover" sx={{ color: "#9C69E2" }}>
                Terms & Conditions
              </Link>
            </Typography>
          </Box>
  
          {error && (
            <Typography sx={{ color: "red", marginBottom: 2 }}>
              {error}
            </Typography>
          )}
  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#9C69E2",
              color: "white",
              fontWeight: "bold",
              padding: "12px",
              borderRadius: 1,
            }}
          >
            Create account
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>  
  );
  
};
export default Signup;
