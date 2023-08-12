import React, { createContext } from "react";

import api from "../api";

import { useAuth } from "./AuthContext";

/* Toast */
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

const PostProvider = ({ children, post, setPost }) => {
  const auth = useAuth();

  //criar um novo post
  const register = async (info, callback = () => {}) => {
    return await api
      .post("/post/", info, {
        headers: { Authorization: `Bearer ${auth.user.token}` },
      })
      .then((res) => {
        setPost(res.data);
        toast.success("Post criado com sucesso");
        return callback();
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "Ocorreu um erro ao criar o post"
        );
      });
  };

  return (
    <AuthContext.Provider
      value={{
        post,
        setPost,
        register,
      }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

const usePost = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};

export { PostProvider, usePost };
