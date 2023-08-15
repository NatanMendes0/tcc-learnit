import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    auth.isLoggedIn && navigate("/", { replace: true });
  }, [auth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await auth.login(data, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold leading-7 tracking-tight text-gray-900">
            Entre na sua conta!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Endereço de e-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...register("email", {
                      required: "E-mail obrigatório",
                      validate: (value) => {
                        return (
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            value
                          ) || "E-mail inválido"
                        );
                      },
                      minLength: {
                        value: 6,
                        message: "Mínimo de 6 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Máximo de 50 caracteres",
                      },
                      value: auth.user.email,
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    {...register("password", {
                      required: "Senha obrigatória",
                      maxLength: {
                        value: 50,
                        message: "Máximo de 50 caracteres",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-sm leading-6">
                  <Link to="/forgot-password"
                    className="font-semibold text-lg text-sky-600 hover:text-sky-700 action:text-sky-800"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não possui cadastro ainda?{" "}
            <Link to="/register"
              className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
            >
              Faça seu cadastro aqui!
            </Link>
          </p>
          <p className="mt-5 text-center text-sm text-gray-500">
            <Link to="/educator"
              className="font-semibold text-lg leading-6 text-sky-600 hover:text-sky-500"
            >
              Quero ser um educador!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
