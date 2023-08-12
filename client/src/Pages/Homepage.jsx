import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
  const { isLoggedIn, user } = useAuth();
  
  return (
    <div>
      <h1 className="mb-3">Homepage</h1>
      {isLoggedIn ? (
        <>
          <p>Olá, <strong>{user.name}</strong></p>
        </>
      ) : (
        <>
          <p>Olá, <strong>visitante</strong></p>
        </>
      )}
      <br />
      <Link className="text-xg" to="/forum">Ir para o Fórum</Link>
    </div>
  );
};

export default Homepage;
