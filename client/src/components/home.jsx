
const home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      <nav className="bg-sky-500 justify-between shadow-xl flex py-5 px-2">
        <h1 className="text-lg text-white">Fakebook</h1>
        <button className="rounded-lg px-5 py-2 bg-white text-black" onClick={handleLogout}>
          Sair
        </button>
      </nav>
    </div>
  );
};

export default home;
