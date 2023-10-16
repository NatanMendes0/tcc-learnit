import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePost } from '../../context/PostContext';

import { toast } from 'react-toastify';

import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";

import { UserCircleIcon } from '@heroicons/react/20/solid';

import api from '../../api/index';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');

    const postContext = usePost();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/forum';

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
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching posts", error);
            toast.error(error.response.data.message);
            return [];
        }
    };

    useEffect(() => {
        async function fetchPost() {
            const postData = await getPost();
            setPost(postData);
        }
        fetchPost();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data) //comentário
        try {
            const response = await postContext.comment(id, data);
            toast.success(response.message);
            navigate(from);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        //TODO - melhorar estilização e adicionar seção de comentários
        <>
            <div className='mt-auto isolate py-12'>
                <div className="mx-auto max-w-6xl bg-tertiary rounded-lg shadow-lg">
                    <div>
                        <div className='bg-primary p-5 rounded-t-lg'>
                            <h1 className='title text-4xl text-white text-left'>{post.title}</h1>
                        </div>
                        <div className='py-5'>
                            <h1>
                                {post.user ? (
                                    <>
                                        <div className="flex justify-between px-4 items-center">
                                            <div className="relative flex items-center gap-x-2">
                                                <UserCircleIcon className="h-12 text-primary" />
                                                <div className="flex gap-x-2">
                                                    <p className="font-semibold text-xl text-secondary">
                                                        {post.user.name}
                                                    </p>
                                                    <p className="text-secondary font-semibold text-lg">@{post.user.nickname}</p>
                                                </div>
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
                        {/* aqui vai o form para inserção de comentário */}
                        <form onSubmit={handleSubmit(onSubmit)} className='flex w-auto gap-x-2 items-center'>
                            <label htmlFor='comment' className='sr-only'></label>
                            <input
                                id="coment"
                                name="coment"
                                type="text"
                                autoComplete="coment"
                                placeholder='Adicione um comentário!'
                                required
                                {...register("coment", {
                                    required: "Preencha o campo de comentário para adicionar",
                                    minLength: {
                                        value: 6,
                                        message: "Mínimo de 6 caracteres",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Máximo de 50 caracteres",
                                    },
                                    value: post.ratings,
                                })}
                                className="block w-full rounded-md border-0 py-2 shadow-md text-font_secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-md sm:leading-6"
                            />
                            {errors.coment && (
                                <span className="text-sm text-red-500">
                                    {errors.coment.message}
                                </span>
                            )}
                            <div>
                                <button
                                    type='submit'
                                    className='text-white flex w-full items-center shadow-md justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-md font-medium  hover:bg-secondary'
                                >
                                    Comentar
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
                <div className='p-5 mt-5 mx-auto max-w-6xl'>
                    <h1 className="subtitle text-2xl">Comentários</h1>
                    {post.ratings && post.ratings !== 0 ? (
                        <div className='bg-gray-100 mt-5 rounded-md shadow-md'>
                            <ul>
                                {post.ratings.map((rating, index) => (
                                    <li key={index}>
                                        <div className="p-4">
                                            <div className="flex items-center gap-x-2">
                                                <div className="relative flex items-center gap-x-2">
                                                    <UserCircleIcon className="h-12 text-primary" />
                                                    <div className="text-sm leading-5">
                                                        <p className="font-semibold text-secondary">
                                                            {rating.postedby.username}
                                                        </p>
                                                        <p className="text-font_secondary text-lg">{rating.comment}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="block w-full rounded-md border-0 p-5 shadow-md text-font_secondary">
                            <p className='text-black'>Nenhum comentário adicionado ainda!</p>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}

export default Post;