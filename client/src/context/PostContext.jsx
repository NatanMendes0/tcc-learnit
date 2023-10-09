import React, { createContext, useEffect, useState } from "react";

import api from "../api/index";

import { useAuth } from "./AuthContext";

/* Toast */
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostContext = createContext();

const PostProvider = ({ children }) => {

  const auth = useAuth();

  /* Estado local para armazenar o token */
  const [token, setToken] = useState("");

  /* Atualizar o token local sempre que o token do usuário for atualizado */
  useEffect(() => {
    if (auth.user.token) {
      setToken(auth.user.token);
    }
  }, [auth.user.token]);


  const [posts, setPosts] = useState([]);

  const register = async (info) => {
    try {
      const response = await api.post("/forum/", info, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        },
      });

      setPosts(response.data);

      return response.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Ocorreu um erro ao cadastrar o tópico"
      );
    }
  };

  const list = async () => {
    try {
      const response = await api.get("/forum/get-posts", {
        headers: {
          Authorization: `Bearer ${auth.token}`,          
        },
      });

      setPosts(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const get = async (id) => {
    try {
      const response = await api.get(`forum/get-post/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updatePost = async (id, data) => {
    try {
      const response = await api.put(`/forum/edit-post/${id}`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedPost = response.data;
      const updatedPosts = posts.map((post) =>
        post._id === id ? updatedPost : post
      );
      setPosts(updatedPosts);

      toast.success("Postagem atualizada com sucesso!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao atualizar a postagem");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);

      toast.success("Tópico removido com sucesso!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        register,
        list,
        get,
        remove,
        updatePost,
      }}
    >
      {children}
      <ToastContainer />
    </PostContext.Provider>
  );
};

const usePost = () => {
  const context = React.useContext(PostContext);

  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }

  return context;
};

export { PostProvider, usePost };
