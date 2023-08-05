import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import CreatePost from "./components/createPost";
import Post from "./components/post";
import EditPost from "./components/editPost";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState({
    name: null,
    nickname: null,
    email: null,
  });

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getUser")
      .then((response) => {
        const { name, nickname, email } = response.data; // Obtém os atributos do usuário da resposta
        setUser({ name, nickname, email }); // Atualiza o estado com os atributos do usuário
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/editPost/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
