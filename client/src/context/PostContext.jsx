import React, { createContext, useState } from "react";

import api from "../api/index";

import { useAuth } from "./AuthContext";

/* Toast */
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const auth = useAuth();

  const [posts, setPosts] = useState([]);

  const register = async (info, callback = () => {}) => {
    return await api
      .post("/forum/", info, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        toast.success("Tópico criado com sucesso!");
        return callback();
      }
      )
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Ocorreu um erro ao cadastrar o tópico')
      })
  };

  const list = async () => {
    try {
      const response = await api.get("/posts", {
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
      const response = await api.get(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const update = async (id, data, callback) => {
    try {
      const response = await api.put(`/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const index = posts.findIndex((post) => post.id === id);
      const newPosts = [...posts];
      newPosts[index] = response.data;
      setPosts(newPosts);

      toast.success("Tópico atualizado com sucesso!");
      callback();
    } catch (error) {
      toast.error(error.response.data.message);
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
        update,
        remove,
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
