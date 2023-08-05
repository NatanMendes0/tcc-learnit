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
        if (res.data === "Login efetuado com sucesso!") {
          console.log(res.data);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <div>
    //   <div>
    //     <h2>Login</h2>
    //     {/* mudar os campos depois, NÃO ESQUECER */}
    //     <form onSubmit={handleSubmit}>
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
    //         <button className="mb-6 p-2 bg-sky-600 rounded-lg text-white" type="submit">Entrar</button>
    //       </div>
    //     </form>
    //     <br />
    //     <div>
    //       <p className="mb-2">Não possui conta?</p>
    //       <Link
    //         to="/register"
    //         className="mb-6 p-2 bg-sky-600 rounded-lg text-white"
    //       >
    //         Cadastro
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div class="login">
      <div class="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 class="title mt-2">Entre na sua conta</h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              for="email"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              E-mail
            </label>
            <div class="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:border-primary focus:ring-primary transition duration-150 ease-in-out"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Senha
              </label>
              <div class="text-sm">
                <Link
                  to={"/login"}
                  class="font-semibold text-secondary hover:text-primary transition duration-150 ease-in-out"
                >
                  Esqueçeu a senha?
                </Link>
              </div>
            </div>
            <div class="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:border-primary focus:ring-primary transition duration-150 ease-in-out"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-primary active:bg-tertiary focus:outline-none focus:border-primary focus:ring-primary transition duration-150 ease-in-out"
            >
              Entrar
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-lg text-gray-500">
          Não possui conta?{" "}
          <Link
            to="/register"
            class="font-semibold leading-6 text-secondary hover:text-primary transition duration-150 ease-in-out"
          >
            Faça seu cadastro aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
