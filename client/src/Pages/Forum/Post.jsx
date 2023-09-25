import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/index';
import { toast } from 'react-toastify';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});

    const getPost = async () => {
        try {
            const response = await api.get(`/forum/get-post/${id}`);
            return response.data;

            // setPost(response.data);
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
                        <h1>{post.user ? (
                            <>
                                <h1>{post.user.name}</h1>
                                <h1>@{post.user.nickname}</h1>
                            </>
                        ) : () => { return }}</h1>
                        {post.file ? (
                    <div className="relative w-full">
                      <img
                        src={`http://localhost:5000/Public/Images/${post.file}`}
                        alt="imagem do post"
                        className="w-[100%] rounded-2xl bg-gray-100 aspect-[16/9] sm:aspect-[2/1] lg:aspect-[16/9] object-hover"
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  ) : (
                    ''
                  )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;