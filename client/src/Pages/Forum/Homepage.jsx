import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import api from "../../api";

import { UserCircleIcon } from "@heroicons/react/20/solid";

export default function Homepage() {
  const [posts, setPosts] = useState([]);

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
      setPosts(postsData);
      console.log(postsData);
    }

    fetchPosts();
  }, []);

  return (
    <>
      <div className="relative isolate py-20 sm:py-38 lg:pb-40">
      <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>
        {/* Hero section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              Fórum
            </h1>
            <h1 className="text-2xl border-b-2 border-font_secondary pb-2 mt-7 font-bold tracking-tight text-font_secondary sm:text-4xl">
              Tenha suas dúvidas respondidas!
            </h1>
            <p className="mt-6 text-lg font-semibold leading-8 text-font_secondary">
              Está com algum problema e não encontrou a solução nos materiais da
              plataforma? Acrescente-o no fórum e logo você terá sua resposta
              pela nossa equipe ou pelos membros da nossa comunidade!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/forum/create"
                className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary"
              >
                Comente no Fórum
              </Link>
              <a
                href="#forum"
                className="text-sm font-semibold leading-6 text-font_secondary hover:text-secondary"
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
            <p className="mt-3 text-lg font-semibold leading-8 text-font_secondary">
              Visualize todas as postagens do fórum. Ajude ou seja ajudado!
            </p>
            <div className="mt-10 items-center justify-center gap-x-6">
              <Link
                to="/forum/create"
                className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary "
              >
                Insira sua dúvida!
              </Link>
            </div>
          </div>

          {/* Posts section */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <Link to={post._id}>
                <div className="relative w-full">
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
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
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative mt-6 flex items-center gap-x-2">
                    <UserCircleIcon className="h-12 text-primary" />
                    <div className="text-sm leading-5">
                      <p className="font-semibold text-secondary">
                        <span className="absolute inset-0" />
                        {post.user.name}
                      </p>
                      <p className="text-secondary">@{post.user.nickname}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
