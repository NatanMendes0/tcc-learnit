import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

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
      auth.register(data, () => {
        navigate("../login", { replace: true });
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Crie sua conta!
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="ex: Maria Antonia"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    {...register("name", {
                      required: "Campo obrigatório",
                      // accept only letters and spaces
                      validate: (value) => {
                        const regex = /^[^0-9]+$/;
                        return (
                          regex.test(value) || "Campo não pode conter números"
                        );
                      },
                      minLength: {
                        value: 3,
                        message: "Digite um nome com ao menos 3 caracteres",
                      },
                      maxLength: {
                        value: 30,
                        message: "Máximo de 30 caracteres",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  E-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="ex: pessoalegal@dominio.com"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    {...register("email", {
                      required: "Campo obrigatório",
                      validate: (value) => {
                        return (
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            value
                          ) || "E-mail inválido"
                        );
                      },
                      maxLength: {
                        value: 90,
                        message: "Máximo de 90 caracteres",
                      },
                    })}
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
                  htmlFor="nickname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Usuário
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    autoComplete="nickname"
                    placeholder="ex: pessoa_legal"
                    required
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    {...register("nickname", {
                      required: "Campo obrigatório",
                      validate: (value) => {
                        const regex = /^\S*$/; // no spaces
                        return (
                          regex.test(value) || "Campo não pode conter espaços"
                        );
                      },
                      minLength: {
                        value: 3,
                        message: "Digite um nickname com ao menos 3 caracteres",
                      },
                      maxLength: {
                        value: 30,
                        message: "Máximo de 30 caracteres",
                      },
                    })}
                  />
                  {errors.nickname && (
                    <span className="text-sm text-red-500">
                      {errors.nickname.message}
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
                    autoComplete="password"
                    placeholder="ex: ********"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    {...register("password", {
                      required: "Campo obrigatório",
                      minLength: {
                        value: 8,
                        message: "Digite uma senha com ao menos 8 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Máximo de 50 caracteres",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já possui cadastro?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-primary hover:text-secondary"
            >
              Faça seu login aqui!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
