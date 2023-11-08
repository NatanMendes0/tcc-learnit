import React, { createContext } from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthContext = createContext();

const AuthProvider = ({ children, user, setUser }) => {
  const login = async (info, callback = () => { }) => {
    return await api
      .post("/user/login", info)
      .then((res) => {
        setUser(res.data);
        toast.success("Usuário logado com sucesso");
        return callback();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Ocorreu um erro ao realizar o login");
      });
  };
  const register = async (info, callback = () => { }) => {
    try {
      await api.post("/user/register", info);
      toast.success("Usuário registrado com sucesso");
      return callback();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Não foi possível registrar o usuário"
      );
    }
  };
  const get = async (id) => {
    try {
      const response = await api.get(`user/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const createResetToken = async (email) => {
    try {
      await api.post("/user/forgot-password-token", email);
      toast.success("Um e-mail foi enviado para você!");
    } catch (error) {
      toast.error("Não foi possível enviar o e-mail");
    }
  }

  const resetPassword = async (data) => {
    try {
      await api.put("/user/reset-password/" + data.token, { password: data.password });
      toast.success("Senha alterada com sucesso!");
    } catch (error) {
      toast.error("Não foi possível alterar a senha");
    }
  }

  const update = async (id, data) => {
    setUser({
      ...user,
      name: data.name,
      email: data.email,
      nickname: data.nickname
    });
    try {
      await api.put(`/user/edit-user/${id}`, data);
      toast.success("Usuário atualizado com sucesso");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao atualizar o usuário");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/user/delete-user/${id}`);
      setUser({});
      toast.success("Usuário excluído com sucesso");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao excluir o usuário");
    }
  };

  const logout = async (_) => {
    return await api.get("/user/logout").finally((_) => {
      toast.success("Sessão finalizada!");
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
        createResetToken,
        resetPassword,
        get,
        update,
        remove,
        logout,
      }}
    >
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