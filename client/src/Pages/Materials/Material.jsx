import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";

import { UserCircleIcon } from '@heroicons/react/20/solid';

import api from '../../api/index';

function Material() {
    const { id } = useParams();
    const [material, setMaterial] = useState({ content: [] });
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


    const getMaterial = async () => {
        try {
            const response = await api.get(`/materials/get-material/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching Materials", error);
            toast.error(error.response.data.message);
            return [];
        }
    };

    useEffect(() => {
        async function fetchMaterial() {
            const MaterialData = await getMaterial();
            setMaterial(MaterialData);
        }
        fetchMaterial();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await api.post(`/materials/rating/${id}`, {
                comment: data.comment,
            });
            toast.success(response.data.message);
            window.location.reload();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div>
                <div className='my-10'>
                    {material && material.content.map((materialItem) => (
                        <div key={materialItem._id}>
                            <img className='w-20' src={`http://localhost:5000/Public/Images/${materialItem.stepContent.file}`} alt="Imagem do conteúdo" onClick={() => openModal(materialItem.stepContent.file)} />
                            <h2>{materialItem.stepContent.title}</h2>
                            <p>{materialItem.stepContent.text}</p>
                            <p>{materialItem.stepContent.note}</p>

                            {/* doing */}
                            <Link to={`/materials/add-step/${material._id}`}>
                                <p className='bg-blue-500 text-white'>Adicionar passo</p>
                            </Link>

                            {/* todo */}
                            <Link to={`/materials/edit-material/${materialItem._id}`}>
                                <p className='bg-gray-500 text-white'>Editar passo</p>
                            </Link>

                            {/* todo */}
                            <Link to="#">
                                <p className='bg-red-500 text-white'>Apagar passo</p>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* add comment */}
                <div className='p-5 rounded-lg bg-gray-400'>
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
                                    value: 50,
                                    message: "Máximo de 50 caracteres",
                                },
                            })}
                            className="block w-full rounded-md border-0 py-2 shadow-xl text-font_secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-md sm:leading-6"
                        />
                        {errors.coment && (
                            <span className="text-sm text-red-500">
                                {errors.coment.message}
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

                {/* comment section */}
                <div className='p-5 mt-5 mx-auto max-w-6xl'>
                    <h1 className="subtitle text-2xl">Comentários</h1>
                    {material.ratings && material.ratings.length > 0 ? (
                        <div className='bg-gray-100 mt-5 rounded-md shadow-xl'>
                            <ul>
                                {material.ratings.map((rating, index) => (
                                    <li key={index}>
                                        <div className="p-4">
                                            <div className="flex items-center gap-x-2">
                                                <div className="relative flex items-center gap-x-2">
                                                    <UserCircleIcon className="h-12 text-primary" />
                                                    <div className="text-sm leading-5">
                                                        <div className="flex items-center gap-x-2">
                                                            <p className="text-lg font-extrabold text-secondary">
                                                                {rating.postedby.name}
                                                            </p>
                                                            <p className="font-bold text-base text-secondary">
                                                                @{rating.postedby.nickname}
                                                            </p>
                                                        </div>
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
                        <div className="block w-full rounded-md border-0 p-5 shadow-xl text-font_secondary">
                            <p className='text-black'>Nenhum comentário adicionado ainda!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Material;