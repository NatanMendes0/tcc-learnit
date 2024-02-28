import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";

import { UserCircleIcon } from '@heroicons/react/20/solid';

import api from '../../api/index';
import { useAuth } from '../../context/AuthContext';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');

    const navigate = useNavigate();

    const openModal = (imageUrl) => {
        setModalImageUrl(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImageUrl('');
    };

    const getPost = async () => {
        try {
            const response = await api.get(`/forum/get-post/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching posts", error);
            toast.error(error.response.data.message);
            return [];
        }
    };

    console.log(post);

    useEffect(() => {
        async function fetchPost() {
            const postData = await getPost();
            setPost(postData);
        }
        fetchPost();
    }, [post]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await api.post(`/forum/rating/${id}`, {
                comment: data.comment,
            });
            if (response.status === 200) {
                toast.success("Comentário adicionado!");
                setPost(response.data);
            }
            setValue("comment", "");
        } catch (error) {
            toast.error("Você não está logado! Faça seu login!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/forum/delete-post/${id}`);
            toast.success("Post deletado com sucesso!");
            navigate("../forum", { replace: false });
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className='mt-auto isolate py-14'>
                <div className="mx-auto max-w-6xl bg-tertiary rounded-lg shadow-xl">
                    <div>
                        <div className='bg-primary p-5 flex justify-between rounded-t-lg'>
                            <h1 className='title text-4xl text-white text-left'>{post.title}</h1>
                            <div>
                                {user && post.user && (user._id === post.user._id) && (
                                    <Link to={`/forum/edit-post/${post._id}`}>
                                        <button
                                            className="text-white mr-2 cursor-pointer bg-secondary p-2 hover:bg-sky-800 rounded-lg"
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
                                {user && user.role && post.user && post.user._id && ((user.role === "Administrador" || user.role === "Educador") || (user._id === post.user._id)) && (
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="text-white cursor-pointer bg-red-700 mr-2 p-2 hover:bg-red-900 rounded-lg"
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
                            </div>
                        </div>
                        <div className='py-5'>
                            <h1>
                                {post && post.user ? (
                                    <>
                                        <div className="flex justify-between px-4 items-center">
                                            <div className="relative flex items-center gap-x-2">
                                                <UserCircleIcon className="h-14 text-primary" />
                                                <div className="flex gap-x-2">
                                                    <p className="font-semibold text-xl text-secondary">
                                                        {post.user.name}
                                                    </p>
                                                    <p className="text-secondary font-semibold text-lg">@{post.user.nickname}</p>
                                                </div>
                                                <p className="text-primary font-bold">{post.user.role}</p>
                                            </div>
                                            <div>
                                                <time dateTime={post.updatedAt} className="text-gray-700 text-lg">
                                                    {format(new Date(post.updatedAt), "MMMM, dd yyyy", {
                                                        locale: ptBR,
                                                    })}
                                                </time>
                                            </div>
                                        </div>
                                        <div className="px-5 py-5">
                                            <p className="text-gray-600 font-semibold text-xl">{post.description}</p>
                                        </div>
                                    </>
                                ) : () => { return }}
                            </h1>
                            {post.file ? (
                                <div
                                    className="relative cursor-pointer flex justify-center items-center"
                                    onClick={() =>
                                        // openModal(`http://academico2.gravatai.ifsul.edu.br:5000/Public/Images/${post.file}`)
                                        openModal(`http://localhost:5000/Public/Images/${post.file}`)
                                    }
                                >
                                    <div className='text-center text-gray-400 text-md'>
                                        Clique para <br /> aumentar a imagem
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-3 w-6 h-6 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>

                                    <img
                                        // src={`http://academico2.gravatai.ifsul.edu.br:5000/Public/Images/${post.file}`}
                                        src={`http://localhost:5000/Public/Images/${post.file}`}
                                        alt="imagem do post"
                                        className="w-[40%] rounded-2xl aspect-[16/9] sm:aspect-[2/1] lg:aspect-[16/9] object-contain"
                                    />
                                </div>
                            ) : (
                                ''
                            )}
                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center rounded-lg justify-center z-50">
                                    <div className="fixed inset-0 bg-black opacity-75" onClick={closeModal}></div>
                                    <div className="z-50 relative">
                                        <button
                                            className="absolute top-4 right-4 bg-primary p-2 rounded-lg text-white"
                                            onClick={closeModal}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <img
                                            src={modalImageUrl}
                                            alt="Imagem em tamanho completo"
                                            className="max-h-screen max-w-screen-xl rounded-lg max-w-screen-3xl mx-auto"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='p-5 rounded-b-lg bg-gray-400'>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex w-auto gap-x-2 items-center'>
                            <label htmlFor='comment' className='sr-only'></label>
                            <input
                                id="comment"
                                name="comment"
                                type="text"
                                autoComplete="comment"
                                placeholder='Adicione um comentário!'
                                {...register("comment", {
                                    required: "Preencha o campo de comentário para adicionar",
                                    minLength: {
                                        value: 2,
                                        message: "Mínimo de 2 caracteres",
                                    },
                                    maxLength: {
                                        value: 2000,
                                        message: "Máximo de 2000 caracteres",
                                    },
                                })}
                                className="block w-full rounded-md border-0 py-2 shadow-xl text-font_secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-md sm:leading-6"
                            />
                            {errors.comment && (
                                <span className="text-sm text-red-500">
                                    {errors.comment.message}
                                </span>
                            )}
                            <div>
                                <button
                                    type='submit'
                                    className='text-white flex w-full items-center shadow-xl justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-md font-medium  hover:bg-secondary'
                                >
                                    Comentar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* comment section */}
                <div className='p-5 mt-5 mx-auto max-w-6xl'>
                    <h1 className="subtitle text-2xl">Comentários</h1>
                    {post.ratings && post.ratings.length > 0 ? (
                        <div className='bg-gray-100 mt-5 rounded-md shadow-xl'>
                            <ul>
                                {post.ratings
                                    .map((rating, index) => (
                                        <li key={index}>
                                            <div className="p-4">
                                                <div className="flex items-center gap-x-2">
                                                    <div className="relative flex items-center gap-x-2 w-full">
                                                            <div className="flex items-center justify-center text-primary">
                                                                <UserCircleIcon className="h-14 w-14 min-h-14 min-w-14" />
                                                            </div>
                                                            <div className="flex gap-x-2">
                                                                <p className="font-semibold text-xl text-secondary">
                                                                    {rating.postedby.name}
                                                                </p>
                                                                <p className="text-secondary font-semibold text-lg">@{rating.postedby.nickname}</p>
                                                                <p className="text-primary font-bold text-lg">|</p>
                                                                <p className="text-primary font-bold text-lg">{rating.postedby.role}</p>
                                                            </div>
                                                    </div>
                                                </div>
                                                <p className="text-font_secondary text-lg ml-16 -mt-5">{rating.comment}</p>
                                            </div>
                                        </li>
                                    ))
                                    .reverse()
                                }
                            </ul>
                        </div>
                    ) : (
                        <div className="block w-full rounded-md border-0 p-5 shadow-xl text-font_secondary">
                            <p className='text-black'>Nenhum comentário adicionado ainda!</p>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}

export default Post;