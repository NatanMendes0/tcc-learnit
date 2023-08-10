import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <div>
      <h1 className="mb-3">Homepage</h1>
      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
            <br />
          </>
        ) : (
          <>
            <p>Olá, {user.name}</p>
            <p>{user.email}</p>
            <p>{user.nickname}</p>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
