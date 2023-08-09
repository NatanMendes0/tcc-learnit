import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div>
      <h1>Homepage</h1>
      {isLoggedIn && (
        <>
          <p>{user._id}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
      <Link to="/login" className="ml-3 bg-red-300">Login</Link>
      <Link to="/register" className="ml-3 bg-red-300">Cadastro</Link>
      
    </div>
  );
};

// eu abro se eu quiser!
// eita lapada seca
export default Homepage;
