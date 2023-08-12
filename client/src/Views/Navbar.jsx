import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <div className="navbar">
      {!isLoggedIn ? (
        <>
          <Link to="/">Página Inicial</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <p>Olá, <strong>{user.name}</strong></p>
          <p>{user.nickname}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
