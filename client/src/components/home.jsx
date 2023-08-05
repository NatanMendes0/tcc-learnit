import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function Home() {
  const [posts, setPosts] = useState([]);
  const user = useContext(userContext); //informações do usuário

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getPosts")
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex-1 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
        <h2 className="title">
          Fórum
        </h2>
        <h2 className="text-4xl mt-7 font-bold tracking-tight text-font_primary text-center">
          Tenha suas dúvidas respondidas
        </h2>
        <div className="bg-font_secondary mt-2 h-0.5 rounded-xl" />
        <h2 className="subtitle">
          Está com algum problema e não encontrou a solução nos materiais da
          plataforma? Acrescente-o no fórum e logo você terá sua resposta pela
          nossa equipe ou pelos membros da nossa comunidade!
        </h2>
        <div className="text-center mt-11 mx-96">
          {user.name ? (
            <Link
              className="btn"
              to="/create"
            >
              Insira sua dúvida!
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {posts.map((post) => (
            <div>
              <Link to={`/post/${post._id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-bg_primary lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={`http://localhost:8080/Images/${post.file}`}
                    alt="post"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-font_secondary">
                    {formatDate(post.date)}
                    </h3>
                    <h3 className="text-xl font-semibold text-gray-700">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-lg text-font_secondary">
                      {post.description}
                    </p>
                    <div className="flex -ml-1 items-center">
                      <UserCircleIcon className="h-16 w-16 inline-block text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold text-primary">{post.name}</h3>
                        <h3 className="text-md font-semibold text-primary">
                          @{post.nickname}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
