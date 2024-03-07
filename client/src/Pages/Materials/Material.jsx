import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useMaterial } from '../../context/MaterialContext';

import { toast } from 'react-toastify';

import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { UserCircleIcon } from '@heroicons/react/20/solid';

import api from '../../api/index';

function Material() {
    const { id } = useParams();
    const { user } = useAuth();
    const [material, setMaterial] = useState({ content: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const materialContext = useMaterial();
    const navigate = useNavigate();

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
    }, [material]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await api.post(`/materials/rating/${id}`, {
                comment: data.comment,
            });
            if (response.status === 200) {
                toast.success("Comentário adicionado!");
            }
            setValue("comment", "");
        } catch (error) {
            toast.error("Você não está logado! Faça seu login!");
        }
    };

    const handleDelete = async (materialId, stepId) => {
        try {
            await materialContext.deleteStep(materialId, stepId);
            const MaterialData = await getMaterial();
            setMaterial(MaterialData);
        } catch (error) {
            toast.success("Passo apagado com sucesso!")
        }
    };

    const handleDeleteMaterial = async (id) => {
        try {
            await api.delete(`/materials/delete-material/${id}`);
            toast.success("Material deletado com sucesso!");
            navigate('../materials', { replace: false });

        } catch (error) {
            console.error("Error deleting Material:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className='isolate py-2 mb-12'>
                {/* header */}
                {material && material.content[0] ? (
                    <div className='bg-secondary mt-10 shadow-xl py-14 text-center text-4xl gap-y-3 text-white flex flex-col items-center justify-center'>
                        <h2>{material.content[0].stepContent.title}</h2>
                        <div className="text-center relative flex items-center gap-x-2">
                            <UserCircleIcon className="h-12 text-white" />
                            <div className="flex gap-x-2">
                                <p className="font-semibold text-xl text-white">
                                    {material.user.name}
                                </p>
                                <p className="text-white font-semibold text-lg">@{material.user.nickname}</p>
                            </div>
                        </div>
                        <p className="text-white -mt-2 font-semibold border-b-2 border-primary text-lg">{material.user.role} da plataforma</p>

                        <div>
                            <time dateTime={material.updatedAt} className="text-gray-200 text-lg">
                                {format(new Date(material.updatedAt), "MMMM, dd yyyy", {
                                    locale: ptBR,
                                })}
                            </time>
                        </div>
                    </div>
                ) : null}

                {/* steps*/}
                {material && material.content.map((materialItem) => (
                    <div className="mx-auto max-w-6xl bg-quaternary rounded-lg shadow-2xl mt-12">
                        <div key={materialItem._id} className='transition duration-700 ease-in-out'>

                            {/* header of step */}
                            <div className='flex bg-secondary p-4 rounded-t-lg justify-between '>
                                <h1 className='title px-2 mt-3 text-4xl text-gray-100 text-left transition duration-700 ease-in-out'>{materialItem.stepContent.title}</h1>
                                {/* user btns */}
                                <div className="flex items-center gap-x-1">
                                    {user && user._id === material.user._id && (
                                        <>
                                            {/* edit btn - only for de main educator*/}
                                            <Link to={`/materials/edit-step/${material._id}/${materialItem._id}`}>
                                                <button className="text-white cursor-pointer bg-tertiary p-2 hover:bg-btn transition duration-700 ease-in-out rounded-lg">
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
                                        </>
                                    )}

                                    {/* delete btn */}
                                    {user && user.role && (user.role === "Administrador" || user.role === "Educador") && (
                                        <div className="flex items-center gap-x-1">
                                            {material.content.length > 1 ? (
                                                <button
                                                    onClick={() => handleDelete(material._id, materialItem._id)}
                                                    className="text-white cursor-pointer bg-red-700 p-2 hover:bg-red-900 transition duration-700 ease-in-out rounded-lg"
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
                                            ) : (
                                                <button
                                                    onClick={() => handleDeleteMaterial(material._id)}
                                                    className="text-white cursor-pointer bg-red-700 p-2 hover:bg-red-900 transition duration-700 ease-in-out rounded-lg"
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
                                    )}
                                </div>
                            </div>

                            {/* content of step */}
                            <div>
                                <p className='text-secondary text-justify px-7 py-3 text-2xl' style={{ whiteSpace: 'pre-line' }}>
                                    {materialItem.stepContent.text}
                                </p>
                                {materialItem.stepContent.note ? (
                                    <div className="max-w-2xl">
                                        <p className='subtitle text-base text-secondary px-7 py-3 text-left'>Nota: {materialItem.stepContent.note}</p>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>

                            {/* step file (if exists) */}
                            <div>
                                {materialItem.stepContent.file ? (
                                    <div className='flex mx-64 pb-5 mt-5 items-center'>
                                        <div className='flex items-center -px-5'>
                                            <div className='text-center text-gray-400 text-lg flex-grow'>
                                                <p className='m-0 w-52'>
                                                    Clique para aumentar a imagem
                                                </p>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-3 w-6 h-6 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </div>
                                        <div
                                            className="relative cursor-pointer"
                                            onClick={() =>
                                                // openModal(`http://academico2.gravatai.ifsul.edu.br:5000/Public/Images/${materialItem.stepContent.file}`)
                                                openModal(`http://localhost:5000/Public/Images/${materialItem.stepContent.file}`)
                                            }
                                        >
                                            <img
                                                // src={`http://academico2.gravatai.ifsul.edu.br:5000/Public/Images/${materialItem.stepContent.file}`}
                                                src={`http://localhost:5000/Public/Images/${materialItem.stepContent.file}`}
                                                alt="imagem do post"
                                                className="w-[100%] rounded-3xl sm:aspect-[2/1] lg:aspect-[16/9] object-cover h-full"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    null
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
                    </div>
                ))}

                {/* add new step */}
                {user && (user.role === "Administrador" || user.role === "Educador") && (
                    <div className="mx-auto mt-8 text-center">
                        <Link to={`/materials/add-step/${material._id}`}>
                            <div className='flex justify-center items-center'>
                                <button className='text-white transition duration-700 ease-in-out bg-secondary flex items-center gap-x-2 cursor-pointer p-2 hover:bg-tertiary hover:shadow-bg_shadow rounded-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <p>Adicionar novo passo</p>
                                </button>
                            </div>
                        </Link>
                    </div>
                )}

                {/* back to materials */}
                <div className="mx-auto mt-12 text-center">
                    <Link to={`/materials/`}>
                        <div className='flex justify-center items-center'>
                            <button className="text-md font-semibold leading-6 text-primary hover:text-tertiary hover:border-b-2 hover:border-gray-300 border-b-2 border-transparent transition duration-1000 ease-in-out">
                                Voltar aos materiais
                            </button>
                        </div>
                    </Link>
                </div>

                {/* add comment */}
                <div className='p-5 max-w-6xl shadow-2xl mx-auto mt-12 rounded-lg bg-gray-400'>
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
                                className='text-white transition duration-1000 ease-in-out p-4 flex w-full items-center shadow-xl justify-center rounded-md border border-transparent bg-secondary py-2 text-md font-medium  hover:bg-primary'
                            >
                                Comentar
                            </button>
                        </div>
                    </form>
                </div>

                {/* comment section */}
                <div className='p-5 mt-5 mx-auto max-w-6xl'>
                    <h1 className="text-primary text-2xl">Comentários</h1>
                    {material.ratings && material.ratings.length > 0 ? (
                        <div className='bg-gray-100 mt-5 rounded-md shadow-2xl shadow-bg_primary'>
                            <ul>
                                {/* todo - criar uma rota para apagar o comentário */}
                                {material.ratings
                                    .map((rating, index) => (
                                        <li key={index}>
                                            <div className="p-4">
                                                <div className="flex items-center gap-x-2">
                                                    <div className="relative flex items-center gap-x-2 w-full">
                                                        <div className="flex items-center justify-center text-bg_primary">
                                                            <UserCircleIcon className="h-14 w-14 min-h-14 min-w-14" />
                                                        </div>
                                                        <div className="flex gap-x-2">
                                                            <p className="font-semibold text-xl text-bg_primary">
                                                                {rating.postedby.name}
                                                            </p>
                                                            <p className="text-bg_primary font-semibold text-lg">@{rating.postedby.nickname}</p>
                                                            <p className="text-black font-bold text-lg">| {rating.postedby.role}</p>
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
                        <div className="block w-full rounded-md border-0 p-5 shadow-bg_shadow shadow-2xl text-font_secondary bg-gray-100 mt-5">
                            <p className='text-black'>Nenhum comentário adicionado ainda!</p>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}

export default Material;