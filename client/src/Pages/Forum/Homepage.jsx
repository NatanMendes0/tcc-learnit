import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

// const Homepage = () => {
//   const [posts, setPosts] = useState([]);

//   // buscar todos os posts do forum
//   const getPosts = async () => {
//     try {
//       const response = await api.get("/forum/get-posts");
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     async function fetchPosts() {
//       const postsData = await getPosts();
//       setPosts(postsData);
//     }

//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <Link to="/forum/create">Inserir dúvida</Link>
//       <br />
//       {posts.map((post) => (
//         <div key={post._id}>
//           <h1>{post.title}</h1>
//           <p>{post.description}</p>
//           <p>{post.author}</p>
//           <p>{post.date}</p>
//           <p>{post.comments}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Homepage;

import { UserCircleIcon } from "@heroicons/react/20/solid";

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    description:
      "Illo sint voluptas. Erldasjsdlkajdlaksjda dlaskjdlaksjda slkdj aldkjas dlkasj dlkasj dlak dlaskj dalror voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      nickname: "nick_teste",
      href: "#",
    },
  },
  {
    id: 1,
    title: "Boost your conversion rate",
    description:
      "Illo sint voluptas. Erldasjsdlkajdlaksjda dlaskjdlaksjda slkdj aldkjas dlkasj dlkasj dlak dlaskj dalror voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      nickname: "nick_teste",
      href: "#",
    },
  },
  {
    id: 1,
    title: "Boost your conversion rate",
    description:
      "Illo sint voluptas. Erldasjsdlkajdlaksjda dlaskjdlaksjda slkdj aldkjas dlkasj dlkasj dlak dlaskj dalror voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      nickname: "nick_teste",
      href: "#",
    },
  },
];

export default function Homepage() {
  return (
    <>
      <div className="py-20 sm:py-24 lg:pb-40">
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
              <article
                key={post.id}
                className="flex flex-col items-start justify-between"
              >
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
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-5 text-gray-900 group-hover:text-gray-600">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative mt-6 flex items-center gap-x-2">
                    <UserCircleIcon className="h-12 text-primary" />
                    <div className="text-sm leading-5">
                      <p className="font-semibold text-secondary">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                      <p className="text-secondary">@{post.author.nickname}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
