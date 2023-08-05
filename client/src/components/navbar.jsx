import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";

function Navbar() {
  const user = useContext(userContext); //informações do usuário
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/api/logout")
      .then((res) => {
        if (res.data === "Success") navigate(0);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-between bg-bg_primary py-3 px-72 shadow-lg">
      <div className="flex items-center">
        <img className="w-14" src="logo.png" alt="logo learnit" />
        <div className="ml-2">
          <Link
            className="text-xl font-semibold px-3 rounded-lg text-font_secondary"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-xl font-semibold px-3 rounded-lg ml-2 text-font_secondary"
            to="/"
          >
            Materiais
          </Link>
        </div>
      </div>
      <div>
        {user.name ? (
          <div>
            <p className="inline-block px-5 font-semibold text-font_secondary">{user.name}</p>
            <input
              type="button"
              onClick={handleLogout}
              value="Logout"
              className="mx-1 px-3 py-2 -mr-6 bg-primary text-white rounded-lg"
            />
          </div>
        ) : (
          <div>
            <Link
              className="text-xl font-semibold px-3 rounded-lg ml-2 text-font_secondary"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-xl font-semibold px-3 rounded-lg ml-2 mr- text-font_secondary"
              to="/register"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
