import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useParams } from 'react-router-dom';
import api from '../../api/index';
import { toast } from 'react-toastify';
import { UserCircleIcon } from '@heroicons/react/20/solid';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');

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

    useEffect(() => {
        async function fetchPost() {
            const postData = await getPost();
            setPost(postData);
            console.log("Post data: ", postData);
        }
        fetchPost();
    }, []);

    return (
        //Todo - melhorar estilização e adicionar seção de comentários
        <>
            <div className='mt-auto relative isolate py-12 sm:py-38 lg:pb-20'>
                <div className="mx-auto max-w-4xl bg-tertiary rounded-lg shadow-lg">
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
                                            <p className="text-gray-600 font-semibold text-lg">{post.description}</p>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-3 w-6 h-6 text-gray-400">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
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
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                </div>
            </div >
        </>
    );
}

export default Post;