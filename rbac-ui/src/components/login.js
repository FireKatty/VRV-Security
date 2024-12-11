
import React, { useState,useEffect } from "react";
import { Box, Typography, TextField, Button, Checkbox, Link, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import image from '../images/image1.png'

const Login = ({onSwitch}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const auth = localStorage.getItem("token")

  // Redirect to home if already authenticated
  useEffect(() => {
    if (auth) {
        navigate("/admin");
    }
  }, [auth, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const loginData = { email, password, rememberMe };
    console.log(loginData)
    try {
      // Fetch API to authenticate the user
      const response = await fetch("http://localhost:9876/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      
      // Check for specific status codes
      if (response.status === 400) {
        const errorData = await response.json();
        setErrorMessage("Invalid credentials: " + (errorData.message || "Bad reques"));
        return;
      } else if (response.status === 401) {
          setErrorMessage("Unauthorized: Incorrect email or password.");
          return;
      } else if (response.status === 500) {
          setErrorMessage("Server error. Please try again later.");
          return;
      }
      const data = await response.json();

      if (response.ok) {
        if (data.auth) {
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('token', JSON.stringify(data.auth));
          navigate("/admin"); // Navigate to the home page
        }
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
        // backgroundColor: "#3B3A4D",
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: 900,
          width: "100%",
          backgroundColor: "#28273C",
          borderRadius: "12px",
          overflow: "hidden",
          // boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden", // Ensures the image stays within bounds
          }}
        >
          <img
            src={image} // Use the imported image here
            alt="Login Illustration"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            width: "50%",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
            Log in
          </Typography>
          <Typography
            sx={{
              color: "#B3B3B3",
              margin: "8px 0 16px 0",
            }}
          >
            Don't have an account?{" "}
                <Link onClick={onSwitch} sx={{ cursor: "pointer", color: "#9C69E2" }}>
                Create One
                </Link>
          </Typography>

          {/* Form Fields */}
          <Box component="form" noValidate autoComplete="off" onSubmit={handleLogin}>
          {errorMessage && (
            <div className="lebel" style={{ color: 'red' , marginBottom: "15px" }}>
                {errorMessage}
            </div>
            )}
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "black",
                borderRadius: 1,
                marginBottom: 2,
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Enter your password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "black",
                borderRadius: 1,
                marginBottom: 2,
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Remember Me */}
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "white" }}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
              sx={{ color: "#B3B3B3", marginBottom: 2 }}
            />

            {/* Error Message */}
            {error && (
              <Typography sx={{ color: "red", marginBottom: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#9C69E2",
                color: "white",
                fontWeight: "bold",
                padding: "12px",
                borderRadius: 1,
              }}
              type="submit"
            >
              Log in
            </Button>
          </Box>

          {/* Forgot Password */}
          <Typography
            sx={{
              color: "#B3B3B3",
              textAlign: "center",
              margin: "16px 0",
            }}
          >
            <Link href="#" underline="hover" sx={{ color: "#9C69E2" }}>
              Forgot your password?
            </Link>
          </Typography>

          {/* Social Buttons */}
          <Typography
            sx={{
              color: "#B3B3B3",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            Or log in with
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: 1,
                textTransform: "none",
                padding: "8px 16px",
              }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: 1,
                textTransform: "none",
                padding: "8px 16px",
              }}
            >
              Apple
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


export default Login;
