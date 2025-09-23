import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);

        try {
          // Verify token with backend
          const response = await authAPI.getAdminInfo();
          setUser(response.data);
          setIsAuthenticated(true);

          // Update stored user info
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Token verification failed:", error);
          // Clear invalid token
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else if (storedUser) {
        // Set user info if available (for display purposes)
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      const {
        token: newToken,
        user: username,
        is_admin,
        message,
      } = response.data;

      // Store token and user info
      localStorage.setItem("token", newToken);

      const userInfo = {
        username,
        is_admin,
        is_staff: true, // All admins are staff
      };

      localStorage.setItem("user", JSON.stringify(userInfo));

      setToken(newToken);
      setUser(userInfo);
      setIsAuthenticated(true);

      return {
        success: true,
        message,
        user: userInfo,
      };
    } catch (error) {
      console.error("Login failed:", error);

      const errorMessage = error.response?.data?.error || "Login failed";

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUserInfo = async () => {
    if (!token) return;

    try {
      const response = await authAPI.getAdminInfo();
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to refresh user info:", error);
      // Don't logout automatically - token might still be valid
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
