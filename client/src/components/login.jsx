import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/login", { email, password })
      .then((res) => {
        if(res.data === "Login efetuado com sucesso!"){
          console.log(res.data);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        {/* mudar os campos depois, NÃO ESQUECER */}
        <form onSubmit={handleSubmit}>
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
            <button className="mb-6 p-2 bg-sky-600 rounded-lg text-white" type="submit">Entrar</button>
          </div>
        </form>
        <br />
        <div>
          <p className="mb-2">Não possui conta?</p>
          <Link
            to="/register"
            className="mb-6 p-2 bg-sky-600 rounded-lg text-white"
          >
            Cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
