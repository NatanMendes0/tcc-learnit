import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/index';
import { toast } from 'react-toastify';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});

    const getPost = async () => {
        try {
            const response = await api.get(`/forum/get-post/${id}`);
            console.log("Post data: "+ response.data);
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
/*
    const getUser = async () => {
        try {
            const response = await api.get(`/user/${post.user._id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user", error);
            toast.error(error.response.data.message);
            return [];
        }
    };

    useEffect(() => {
        async function fetchUser() {
            const userData = await getUser();
            setUser(userData);
            console.log("User data: ", userData);
        }
        fetchUser();
    }, []);
*/
    return (
        <>
            <div>
                <h1>teste</h1>
                <h1>{post.title}</h1>
                <h1>{post.description}</h1>
                <h1>{post.user ? (
                    <>
                        <h1>{post.user.name}</h1>
                        <h1>{post.user.email}</h1>
                    </>
                ) : () => { return } }</h1>

            </div>
        </>
    );
}

export default Post;