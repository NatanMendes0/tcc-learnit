import { useForm } from "react-hook-form";
import { usePost } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      usePost.register(data, () => {
        navigate("../", { replace: true });
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1>Criar um tópico</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-1">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Título"
            {...register("title", {
              required: "Campo obrigatório",
              minLength: {
                value: 3,
                message: "Digite um título com ao menos 3 caracteres",
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
            id="description"
            name="description"
            type="text"
            placeholder="Descrição"
            {...register("description", {
              required: "Campo obrigatório",
            })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="mt-1">
          <input
            id="file"
            name="file"
            type="file"
            placeholder="Imagem"
            {...register("file", {
              required: "Campo obrigatório",
            })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <button type="submit">Registrar-se</button>
      </form>
    </div>
  );
};

export default Create;
