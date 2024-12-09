import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Private from "./components/pc";
import Login from "./components/login";
import Signup from "./components/signup";
import LandingPage from "./components/landingPage";
import AdminPage from "./components/adminPage"


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Protected routes with Header */}
          <Route element={<Private />}>
              <Route path="/admin" element={<AdminPage />} />
          </Route>
          {/* Unprotected Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
