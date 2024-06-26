import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import api from "../../api";

import { UserCircleIcon } from "@heroicons/react/20/solid";

import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Homepage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const getPosts = async () => {
    try {
      const response = await api.get("/forum/get-posts");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      const postsData = await getPosts();
      setPosts(postsData.reverse());
    }
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/forum/delete-post/${id}`);
      toast.success("Post deletado com sucesso!");
      const postsData = await getPosts();
      setPosts(postsData.reverse());
      navigate("../forum", { replace: false });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(error.response.data.message);
      navigate("../forum", { replace: false })
    }
  };

  return (
    <>
      <div className="relative isolate py-16 sm:py-38 lg:pb-40">

        {/* Hero section */}
        <div className="mx-auto max-w-7xl px-6 mt-10 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              Fórum
            </h1>
            <h1 className="text-2xl border-b-2 border-secondary pb-2 mt-7 font-bold tracking-tight text-secondary sm:text-4xl">
              Tenha suas dúvidas respondidas!
            </h1>
            <p className="mt-6 text-lg font-semibold leading-8 text-secondary">
              Está com algum problema e não encontrou a solução nos materiais da
              plataforma? Acrescente-o no fórum e logo você terá sua resposta
              pela nossa equipe ou pelos membros da nossa comunidade!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/forum/create"
                className="rounded-md transition duration-700 ease-in-out bg-secondary px-4 py-2.5 text-md font-semibold text-white shadow-lg hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Comente no Fórum
              </Link>
              <a
                href="#forum"
                className="text-md font-semibold leading-6 text-primary hover:text-tertiary text-sm border-transparent hover:border-b-2 hover:border-gray-300 transition duration-700 ease-in-out"
              >
                Acesse o Fórum <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Forum section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8" id="forum">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-3xl border-b-2 pb-2 border-font_secondary font-bold tracking-tight text-primary sm:text-5xl">
              Veja todas as dúvidas
            </h1>
            <p className="mt-3 text-lg font-semibold leading-8 text-secondary">
              Visualize todas as postagens do fórum. Ajude ou seja ajudado!
            </p>
            <div className="mt-10 items-center justify-center gap-x-6">
              <Link
                to="/forum/create"
                className="rounded-md transition duration-700 ease-in-out bg-secondary px-4 py-2.5 text-md font-semibold text-white shadow-lg hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Insira sua dúvida!
              </Link>
            </div>
          </div>

          {/* Posts section */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post._id}>

                {/* if the post has a file */}
                {post.file ? (
                  <>
                    {/* post info */}
                    <Link to={`/forum/get-post/${post._id}`}>
                      <div className="shadow-md relative rounded-t-xl w-full aspect-[16/9]">
                        {post.file && (
                          <img
                            // src={`http://academico2.gravatai.ifsul.edu.br:5000/Public/Images/${post.file}`}
                            src={`http://localhost:5000/Public/Images/${post.file}`}
                            alt="imagem do post"
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        )}
                        <div className="p-4 rounded-b-xl bg-card">
                          <div className="mt-2 flex items-center gap-x-4 text-md">
                            <time dateTime={post.updatedAt} className="text-gray-500">
                              {format(new Date(post.updatedAt), "MMMM, dd yyyy", {
                                locale: ptBR,
                              })}
                            </time>
                          </div>
                          <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-5 text-gray-900 group-hover:text-gray-600">
                              <span className="absolute inset-0" />
                              {post.title}
                            </h3>
                            <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3 overflow-ellipsis">
                              {post.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* user info */}
                    <div className="p-4">
                      <div className="flex items-center gap-x-2 justify-between">
                        <div className="relative flex justify-between items-center gap-x-2">
                          <UserCircleIcon className="h-14 text-primary" />
                          <div className="text-sm leading-5">
                            <p className="font-semibold text-secondary">
                              <span className="absolute inset-0" />
                              {post.user.name}
                            </p>
                            <p className="text-secondary">@{post.user.nickname}</p>
                            <p className="text-bg_primary font-extrabold">{post.user.role}</p>
                          </div>
                        </div>
                        <div className="ml-auto flex items-center gap-x-2">
                          {/* delete btn */}
                          {user && user.role && post.user && post.user._id && ((user.role === "Administrador" || user.role === "Educador") || (user._id === post.user._id)) && (
                            <button
                              onClick={() => handleDelete(post._id)}
                              className="text-white cursor-pointer bg-red-700 p-2 hover:bg-red-900 transition duration-700 ease-in-out rounded-lg"
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
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          )}

                          {/* edit btn */}
                          {user && user.name === post.user.name && (
                            <Link to={`/forum/edit-post/${post._id}`}>
                              <button
                                className="text-white cursor-pointer bg-secondary p-2 hover:bg-tertiary transition duration-700 ease-in-out rounded-lg"
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
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (

                  // if the post has no file
                  <>

                    {/* post info */}
                    <Link to={`/forum/get-post/${post._id}`}>
                      <div className="relative bg-card rounded-xl shadow-md full">
                        <div className="absolute rounded-lg" />
                        <div className="p-4">
                          <div className="mt-2 flex items-center gap-x-4 text-md">
                            <time dateTime={post.updatedAt} className="text-gray-500">
                              {format(new Date(post.updatedAt), "MMMM, dd yyyy", {
                                locale: ptBR,
                              })}
                            </time>
                          </div>
                          <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-5 text-gray-900 group-hover:text-gray-600">
                              <span className="absolute inset-0" />
                              {post.title}
                            </h3>
                            <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3 overflow-ellipsis">
                              {post.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* user info */}
                    <div className="p-4">
                      <div className="flex items-center gap-x-2 justify-between">
                        <div className="relative flex justify-between items-center gap-x-2">
                          <UserCircleIcon className="h-14 text-primary" />
                          <div className="text-sm leading-5">
                            <p className="font-semibold text-secondary">
                              <span className="absolute inset-0" />
                              {post.user.name}
                            </p>
                            <p className="text-secondary">@{post.user.nickname}</p>
                            <p className="text-bg_primary font-extrabold">{post.user.role}</p>
                          </div>
                        </div>
                        <div className="ml-auto flex items-center gap-x-2">
                          {/* delete btn */}
                          {user && user.role && post.user && post.user._id && ((user.role === "Administrador" || user.role === "Educador") || (user._id === post.user._id)) && (
                            <button
                              onClick={() => handleDelete(post._id)}
                              className="text-white cursor-pointer bg-red-700 p-2 hover:bg-red-900 transition duration-700 ease-in-out rounded-lg"
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
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          )}
                          {/* edit btn */}
                          {user && user.name === post.user.name && (
                            <Link to={`/forum/edit-post/${post._id}`}>
                              <button
                                className="text-white cursor-pointer bg-secondary p-2 hover:bg-tertiary transition duration-700 ease-in-out rounded-lg"
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
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
