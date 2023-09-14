import { usePost } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";

export default function Create() {
  const navigate = useNavigate();

  const postContext = usePost();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { title, value } = e.target;
    setFormData({
      ...formData,
      [title]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, file } = formData;

    if (!title || !description ) {
      toast.error("Preencha o campo títúlo e descrição!");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("file", file);

    try {
      await postContext.register(data);
      toast.success("Tópico criado com sucesso!");
      navigate("../forum", { replace: true });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div classtitle="mt-auto justify-center lg:mx-80 py-10 sm:px-6 lg:px-8">
        <form classtitle="shadow-lg relative" onSubmit={handleSubmit}>
          <div classtitle="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-primary focus-within:ring-1">
            <label htmlFor="title" classtitle="sr-only">
              Título
            </label>
            <input
              id="title"
              title="title"
              type="text"
              placeholder="Título"
              classtitle="block w-full border-0 pt-4 text-xl placeholder:text-gray-400 focus:ring-0"
              value={formData.title}
              onChange={handleChange}
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
              value={formData.description}
              onChange={handleChange}
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
                  onChange={handleFileChange}
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
