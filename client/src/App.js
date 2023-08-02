import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState({
    username: null,
    email: null,
  });

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getUser")
      .then((user) => {
        setUser(user.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
