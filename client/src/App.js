import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import api from "./api";

/* Pages */
import Homepage from "./Pages/Homepage";

/* Views */
import Navbar from "./Views/Navbar";
import Footer from "./Views/Footer";

import Forum from "./Pages/Forum/Homepage";
import ForumCreate from "./Pages/Forum/Create";

import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";

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

  const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    return isLoggedIn ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  };

  return (
    <AuthProvider user={user} setUser={setUser}>
      <PostProvider>
      <div className="relative min-h-full w-full overflow-x-hidden bg-bg_primary text-font_secondary ">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/forum" element={<Forum />} />

            <Route
              path="/forum/create"
              element={
                <PrivateRoute>
                  <ForumCreate />
                </PrivateRoute>
              }
            />
            
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
