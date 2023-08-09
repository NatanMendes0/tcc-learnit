import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

const Login = () => {
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
    } finally {
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Endereço de e-mail</label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "E-mail obrigatório",
                validate: (value) => {
                  return (
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                    "E-mail inválido"
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
                // value: auth.user.email,
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
          <label htmlFor="password">Senha</label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Senha obrigatória",
                maxLength: {
                  value: 50,
                  message: "Máximo de 50 caracteres",
                },
              })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <button type="submit"> Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
