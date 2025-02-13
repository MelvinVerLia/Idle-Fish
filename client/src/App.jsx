import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Gacha from "./routes/Gacha.jsx";
import Factory from "./routes/Factory.jsx";
import Shop from "./routes/Shop.jsx";
import Profile from "./routes/Profile.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Logout from "./components/Logout.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      return decoded.exp * 1000 > Date.now(); // Check if expired
    } catch (error) {
      return false;
    }
  };
  
  useEffect(() => {
    setIsAuthenticated(checkAuth());
    const interval = setInterval(() => {
      setIsAuthenticated(checkAuth());
    }, 1000); // Check every 1 seconds in case token updates

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Gacha /> : <Navigate to="/login" />}
        />
        <Route
          path="/shop"
          element={isAuthenticated ? <Shop /> : <Navigate to="/login" />}
        />
        <Route
          path="/idle"
          element={isAuthenticated ? <Factory /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;
