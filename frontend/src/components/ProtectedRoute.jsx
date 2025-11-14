import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { Box, CircularProgress } from "@mui/material";

function ProtectedRoute({ children }) {
  const { token, checkAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        setIsChecking(false);
        setIsAuthenticated(false);
        return;
      }

      const isValid = await checkAuth();
      setIsAuthenticated(isValid);
      setIsChecking(false);
    };

    verifyAuth();
  }, [token, checkAuth]);

  if (isChecking) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
