import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/register", {
        name,
        email,
        password,
        nickname,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <div>
    //   <div>
    //     <h2>Cadastro</h2>
    //     {/* mudar os campos depois, NÃO ESQUECER */}
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label htmlFor="name">Nome:</label>
    //         <input
    //           type="text"
    //           name="name"
    //           id="name"
    //           onChange={(e) => setName(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="email">Email:</label>
    //         <input
    //           type="email"
    //           name="email"
    //           id="email"
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="password">Senha:</label>
    //         <input
    //           type="password"
    //           name="password"
    //           id="password"
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="nickname">Usuário:</label>
    //         <input
    //           type="text"
    //           name="nickname"
    //           id="nickname"
    //           onChange={(e) => setNickname(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <button type="submit">Cadastrar</button>
    //       </div>
    //     </form>
    //     <br />
    //     <div>
    //       <p className="mb-2">Já possui conta?</p>
    //       <Link
    //         to="/login"
    //         className="mb-6 p-2 bg-sky-600 rounded-lg text-white"
    //       >
    //         Login
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div class="register">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="title">Crie sua conta</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                required
                class="input"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                E-mail
              </label>
            </div>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                class="input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              for="nickname"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Usuário
            </label>
            <div class="mt-2">
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                class="input"
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-primary active:bg-tertiary focus:outline-none focus:border-primary focus:ring-primary transition duration-150 ease-in-out"
            >
              Cadastrar-se
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Já possui cadastro?{" "}
          <Link
            to={"/login"}
            class="font-semibold leading-6 text-secondary hover:text-primary transition duration-150 ease-in-out"
          >
            Faça seu login aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
