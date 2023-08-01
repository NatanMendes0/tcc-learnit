import { Link } from "react-router-dom";


const home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  //pega os dados do usuário

  return (
    <div>
      <nav className="bg-sky-500 justify-between flex py-5 px-2">
        <Link className="rounded-lg px-5 py-2 bg-white text-black" to="/forum">
          Fórum
        </Link>
        <button className="rounded-lg px-5 py-2 bg-white text-black" onClick={handleLogout}>
          Sair
        </button>
      </nav>
    </div>
  );
};

export default home;
