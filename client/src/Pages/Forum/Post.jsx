import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ptBR from "date-fns/locale/pt-BR";

import api from "../../api";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";

const PostOverview = ({ post }) => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post(`forum/add-comment/${post._id}`, data);
      toast.success("Comentário adicionado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center lg:mx-40 text-white text-3xl rounded-t-lg py-3 -mb-2 bg-secondary">{post.title}</div>
      <div className="bg-white py-2 lg:mx-40 shadow rounded-b-lg">
        <div className="px-4 sm:px-6 justify-between flex items-center">
          <div className="flex items-center">
            <div>
              <UserCircleIcon className="h-12 text-primary" />
            </div>
            <div className="text-primary text-lg font-semibold">
              <p>{post.user.name}</p>
            </div>
            <div className="ml-2 text-secondary font-semibold">
              <p>@{post.user.nickname}</p>
            </div>
          </div>
          <div>
            <time dateTime={post.updatedAt} className="text-gray-500">
              {format(new Date(post.updatedAt), "MMMM, dd yyyy", {
                locale: ptBR,
              })}
            </time>
          </div>
        </div>
        <div className="px-7 mb-3 font-semibold">
          <p>{post.description}</p>
        </div>
        <div className="mx-7">
          <div className="pb-4 shadow-sm relative w-full">
            <img
              src={post.file || "https://via.placeholder.com/1920x1080"}
              alt="imagem do post"
              className="aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[2/1]"
            />
          </div>
        </div>
        <div className="bg-gray-200 w-full px-7 py-2 flex items-center">
          <form
            className=" w-full flex"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              id="comment"
              name="comment"
              type="text"
              placeholder="Adicione um comentário"
              className="w-full border p-2 rounded bg-gray-200 border-none placeholder-gray-400 focus:ring-0"
              {...register("comment", {
                required: false,
              })}
            />
            <button className="btn text-lg " type="submit">enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

function Post() {
  const { id } = useParams();

  const post = useQuery(`forum/${id}`, () =>
    api
      .get(`forum/get-post/` + id)
      .then((res) => res.data)
      .catch((error) => console.error(error))
  );

  useEffect(() => {
    post.refetch();
  }, []);

  return (
    <div className="mt-auto">
      <PostOverview post={post.data || {}} />
    </div>
  );
}

export default Post;
