import { useForm } from "react-hook-form";
import { usePost } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";

export default function Create() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postContext = usePost();

  const onSubmit = async (data) => {
    try {
      await postContext.register(data);
      navigate("../forum", { replace: false });
      toast.success("Tópico criado com sucesso!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="mt-auto justify-center lg:mx-80 py-10 sm:px-6 lg:px-8">
        <h1 className="subtitle text-3xl my-5">Adicione um comentário!</h1>
        <form className="shadow-lg relative" onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-primary focus-within:ring-1">
            <label htmlFor="title" className="sr-only">
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Título"
              className="block w-full border-0 pt-4 text-xl placeholder:text-gray-400 focus:ring-0"
              {...register("title", {
                required: "Campo obrigatório",
                minLength: {
                  value: 3,
                  message: "Digite um título com ao menos 3 caracteres",
                },
                maxLength: {
                  value: 700,
                  message: "Máximo de 30 caracteres",
                },
              })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
            <div className="border-b-2 border-gray-200 rounded-md mx-2" />
            <label htmlFor="description" className="sr-only">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              type="text"
              placeholder="Descrição"
              className="block w-full resize-none border-0 pb-80 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
              {...register("description", {
                required: "Campo obrigatório",
              })}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}

            <div aria-hidden="true">
              <div className="h-px" />
              <div className="py-2">
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-px bottom-0">
            <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
              <div className="flex">
                <label
                  htmlFor="file"
                  className="p-1 relative flex cursor-pointer rounded-md font-italic text-lg text-gray-400 hover:text-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                    />
                  </svg>
                  <span className="pl-2">
                    {fileName
                      ? `Arquivo selecionado: ${fileName}`
                      : "Adicionar imagem"}
                  </span>
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  placeholder="Imagem"
                  className="sr-only"
                  {...register("file", {
                    required: false,
                  })}
                  onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                />
                {errors.file && (
                  <span className="text-sm text-red-500">
                    {errors.file.message}
                  </span>
                )}
              </div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-primary px-6 py-2 text-md font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-sky-700"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
