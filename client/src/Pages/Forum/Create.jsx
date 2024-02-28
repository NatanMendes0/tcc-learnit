import { usePost } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  const postContext = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Preencha o campo títúlo e descrição!");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("file", file);

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
<<<<<<< HEAD
      <div classtitle="mt-auto justify-center lg:mx-80 py-10 sm:px-6 lg:px-8">
        <form classtitle="shadow-lg relative" onSubmit={handleSubmit}>
          <div classtitle="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-primary focus-within:ring-1">
            <label htmlFor="title" classtitle="sr-only">
=======
      <div className="mt-auto justify-center lg:mx-80 py-10 sm:px-6 lg:px-8">
        <h1 className="subtitle text-3xl my-5">Adicione um comentário!</h1>
        <form className="shadow-lg relative" onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-primary focus-within:ring-1">
            <label htmlFor="title" className="sr-only">
>>>>>>> diferentUsers
              Título
            </label>
            <input
              id="title"
              title="title"
              type="text"
              placeholder="Título"
              classtitle="block w-full border-0 pt-4 text-xl placeholder:text-gray-400 focus:ring-0"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div classtitle="border-b-2 border-gray-200 rounded-md mx-2" />
            <label htmlFor="description" classtitle="sr-only">
              Descrição
            </label>
            <textarea
              id="description"
              title="description"
              type="text"
              placeholder="Descrição"
              classtitle="block w-full resize-none border-0 pb-80 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
              onChange={(e) => setDescription(e.target.value)}
            />

            <div aria-hidden="true">
              <div classtitle="h-px" />
              <div classtitle="py-2">
                <div classtitle="py-px">
                  <div classtitle="h-9" />
                </div>
              </div>
            </div>
          </div>

          <div classtitle="absolute inset-x-px bottom-0">
            <div classtitle="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
              <div classtitle="flex">
                <label htmlFor="file">Arquivo:</label>
                <input
                  type="file"
                  id="file"
                  title="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div classtitle="flex-shrink-0">
                <button
                  type="submit"
                  classtitle="inline-flex items-center rounded-md bg-primary px-6 py-2 text-md font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-sky-700"
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
