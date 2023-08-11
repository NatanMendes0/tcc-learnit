import React, { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import api from "./api";

/* Pages */
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Navbar from "./Views/Navbar";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    api
      .get("/user/relogin")
      .then((res) => {
        res?.data && setUser(res.data);
        console.log(res, res.data);
      })
      .catch((_) => {});
  }, []);

  return (
    <AuthProvider user={user} setUser={setUser}>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-bg_primary text-font_secondary">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
