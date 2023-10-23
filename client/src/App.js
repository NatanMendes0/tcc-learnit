import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { MaterialProvider } from "./context/MaterialContext";
import { QueryClient, QueryClientProvider } from "react-query";

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

import Post from "./Pages/Forum/Post";
import PostEdit from "./Pages/Forum/Edit";

import Materials from "./Pages/Materials/Homepage";
import MaterialsCreate from "./Pages/Materials/Create";

import Material from "./Pages/Materials/Material";

import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Account from "./Pages/Auth/Account";

import Educator from "./Pages/Educator/Homepage";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    api
      .get("/user/relogin")
      .then((res) => {
        res?.data && setUser(res.data);
      })
      .catch((_) => { });
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
        <MaterialProvider>
          <QueryClientProvider client={queryClient}>
            <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-bg_primary text-font_secondary ">
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Homepage />} />

                  <Route path="/register" element={<Register />} />

                  <Route path="/login" element={<Login />} />

                  <Route path="/account/:id" element={<Account />} />

                  <Route path="/educator" element={<Educator />} />

                  <Route path="/forum" element={<Forum />} />

                  <Route path="/forum/get-post/:id" element={<Post />} />

                  <Route
                    path="/forum/create"
                    element={
                      <PrivateRoute>
                        <ForumCreate />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/forum/edit-post/:id"
                    element={
                      <PrivateRoute>
                        <PostEdit />
                      </PrivateRoute>
                    }
                  />

                  <Route path="/materials" element={<Materials />} />

                  <Route path="/materials/get-material/:id" element={<Material />} />

                  <Route
                    path="/materials/create"
                    element={
                      <PrivateRoute>
                        <MaterialsCreate />
                      </PrivateRoute>
                    }
                  />

                </Routes>
                <Footer />
              </BrowserRouter>
            </div>
          </QueryClientProvider>
        </MaterialProvider>
      </PostProvider>
    </AuthProvider >
  );
}

export default App;
