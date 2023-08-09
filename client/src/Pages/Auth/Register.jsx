import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nome"
            {...register("name", {
              required: "Campo obrigatório",
              // accept only letters and spaces
              validate: (value) => {
                const regex = /^[^0-9]+$/;
                return regex.test(value) || "Campo não pode conter números";
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
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="mt-1">
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="Nickname"
            {...register("nickname", {
              required: "Campo obrigatório",
              validate: (value) => {
                const regex = /^[^0-9]+$/;
                return regex.test(value) || "Campo não pode conter números";
              },
              minLength: {
                value: 3,
                message: "Digite um sobrenome com ao menos 3 caracteres",
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
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            {...register("email", {
              required: "Campo obrigatório",
              validate: (value) => {
                return (
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                  "E-mail inválido"
                );
              },
              maxLength: {
                value: 90,
                message: "Máximo de 90 caracteres",
              },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
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
              {errors.password.message}
            </span>
          )}
        </div>
        <button type="submit">Registrar-se</button>
      </form>
    </div>
  );
};

export default Register;
