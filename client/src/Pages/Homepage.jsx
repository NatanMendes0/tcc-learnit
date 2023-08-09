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
    </div>
  );
};

export default Homepage;
