import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import api from "./api";

/* Pages */
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";

import Homepage from "./Pages/Homepage";

export const userContext = createContext();

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
    const { isLoggedIn } = useAuth()
    const location = useLocation()

    return isLoggedIn ? (
      children
    ) : (
      <Navigate to='/login' replace state={{ from: location }} />
    )
  }

  return (
    <AuthProvider user={user} setUser={setUser}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
