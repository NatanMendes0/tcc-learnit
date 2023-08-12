import React, { createContext } from "react";

import api from "../api";

/* Toast */
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

const AuthProvider = ({ children, user, setUser }) => {
  const login = async (info, callback = () => {}) => {
    return await api
      .post("/user/login", info)
      .then((res) => {
        setUser(res.data);
        toast.success("Usuário logado com sucesso");
        return callback();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Ocorreu um erro ao logar");
      });
  };

  const register = async (info, callback = () => {}) => {
    return await api
      .post("/user/register", info)
      .then((res) => {
        setUser(res.data);
        toast.success("Usuário registrado com sucesso");
        return callback();
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            "Ocorreu um erro ao registrar o usuário"
        );
      });
  };

  const logout = async (_) => {
    return await api.get("/user/logout").finally((_) => {
      toast.success("Deslogado com sucesso");
      setUser({});
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Boolean(user?._id),
        user,
        setUser,
        login,
        register,
        logout,
      }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
