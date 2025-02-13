import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Clear token
    setIsAuthenticated(false); // Update state immediately
    navigate("/login", { replace: true }); // Redirect
  }, [navigate, setIsAuthenticated]);

  return null;
};

export default Logout;