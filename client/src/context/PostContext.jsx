import React, { createContext, useEffect, useState } from "react";
import api from "../api/index";
import { useAuth } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostContext = createContext();

const PostProvider = ({ children }) => {

  const auth = useAuth();

  /* Estado local para armazenar o token */
  const [token, setToken] = useState("");

  useEffect(() => {
    if (auth.user.token) {
      setToken(auth.user.token);
    }
  }, [auth.user.token]);


  const [posts, setPosts] = useState([]);

  const register = async (data) => {
    try {
      const response = await api.post("/forum/", data, {
        headers: {
          Authorization: `Bearer ${token}`,

          /* O header abaixo é necessário para o multer funcionar */
          "Content-Type": "multipart/form-data",
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
       await api.put(`/forum/rating/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        comment: data.comment
      });

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
    try {
       await api.put(`/forum/edit-post/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Postagem atualizada com sucesso!");
    }
    catch (error) {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar a postagem"
      );
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
