import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";

function Navbar() {
  const user = useContext(userContext);
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
    <div className="flex justify-between bg-gray-100 py-5 px-10">
      <div>
        <h2 className="text-xl font-bold">Fórum</h2>
      </div>
      <div>
        <Link
          className="px-5 bg-sky-600 rounded-lg mx-1 py-2 text-white"
          to="/"
        >
          Home
        </Link>
        {user.name ? (
          <Link
            className="px-5 bg-sky-600 rounded-lg mx-1 py-2 text-white"
            to="/create"
          >
            Create
          </Link>
        ) : (
          <></>
        )}
        <Link
          className="px-5 bg-sky-600 rounded-lg mx-1 py-2 text-white"
          to="/"
        >
          Contact
        </Link>
      </div>
      <div>
        {user.name ? (
          <div>
            <p className="inline-block px-5">{user.name}</p>
            <input
              type="button"
              onClick={handleLogout}
              value="Logout"
              className="bg-red-600 rounded-lg mx-1 py-2 px-5 text-white"
            />
          </div>
        ) : (
          <div>
            <Link
              className="px-5 bg-sky-600 rounded-lg mx-1 py-2 text-white"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="px-5 bg-sky-600 rounded-lg mx-1 py-2 text-white"
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
