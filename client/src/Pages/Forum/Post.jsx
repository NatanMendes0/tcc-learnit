import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/index';
import { toast } from 'react-toastify';

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
        <>
            <div className='relative isolate py-12 sm:py-38 lg:pb-20'>
                <div className="mx-auto max-w-4xl bg-tertiary rounded-lg shadow-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className='title'>{post.title}</h1>
                        <h1 className='subtitle'>{post.description}</h1>
                        <h1>
                            {post.user ? (
                                <>
                                    <h1>{post.user.name}</h1>
                                    <h1>@{post.user.nickname}</h1>
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
                                <img
                                    src={`http://localhost:5000/Public/Images/${post.file}`}
                                    alt="imagem do post"
                                    className="w-[75%] rounded-2xl bg-gray-100 aspect-[16/9] sm:aspect-[2/1] lg:aspect-[16/9] object-hover"
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
                                        className="max-h-screen rounded-lg max-w-screen-3xl mx-auto"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;