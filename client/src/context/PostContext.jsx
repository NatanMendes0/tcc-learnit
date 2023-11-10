import React, { createContext, useEffect, useState } from "react";
import api from "../api/index";
import { useAuth } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const auth = useAuth();
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (auth.user.token) {
      setToken(auth.user.token);
    }
  }, [auth.user.token]);

  const register = async (info) => {
    try {
      const response = await api.post("/forum/", info, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
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
      const response = await api.get("/forum/get-posts");
      setPosts(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const rating = async (id, data) => {
    try {
      const response = await api.put(`/forum/rating/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        comment: data.comment
      });

      const updatedPost = response.data;
      const updatedPosts = posts.map((post) =>
        post._id === id ? updatedPost : post
      );
      setPosts(updatedPosts);

      toast.success("Comentário adicionado com sucesso!");
    } catch {
      toast.error("Erro ao adicionar comentário");
    }
  };

  const get = async (id) => {
    try {
      const response = await api.get(`forum/get-post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updatePost = async (id, data) => {
    const response = await api.put(`/forum/edit-post/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      const updatedPost = response.data;
      const updatedPosts = posts.map((post) =>
        post._id === id ? updatedPost : post
      );
      setPosts(updatedPosts);
      toast.success("Postagem atualizada com sucesso!");
    } else {
      toast.error("Erro ao atualizar a postagem");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
        rating,
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
