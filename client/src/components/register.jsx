import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/register", { name, email, password })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h2>Cadastro</h2>
        {/* mudar os campos depois, NÃO ESQUECER */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
        <br />
        <div>
          <p className="mb-2">Já possui conta?</p>
          <Link
            to="/login"
            className="mb-6 p-2 bg-sky-600 rounded-lg text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
