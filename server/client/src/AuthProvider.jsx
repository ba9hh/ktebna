import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/validateToken", { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
        console.log(response.data);
      })
      .catch((error) => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleGoogleLogin = async (
    googleResponse,
    { redirect = true } = {}
  ) => {
    try {
      const { credential } = googleResponse;
      const response = await axios.post(
        "http://localhost:3000/api/auth/google",
        { token: credential },
        { withCredentials: true }
      );
      console.log(response.data.user);
      setUser(response.data.user);
      if (redirect) {
        navigate("/");
      }
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/api/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        handleGoogleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
