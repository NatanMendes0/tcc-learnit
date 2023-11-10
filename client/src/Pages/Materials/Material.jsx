import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useMaterial } from '../../context/MaterialContext';

import { toast } from 'react-toastify';

import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";

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
            toast.success(response.data.message);
            setValue("comment", "");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleDelete = async (materialId, stepId) => {
        try {
            await materialContext.deleteStep(materialId, stepId);
            const MaterialData = await getMaterial();
            setMaterial(MaterialData);
        } catch (error) {
            console.error("Error deleting Material:", error);
            toast.error("Erro ao deletar passo!");
        }
    };

    const handleDeleteMaterial = async (id) => {
        try {
            await api.delete(`/materials/delete-material/${id}`);
            toast.success("Material deletado com sucesso!");
            // window.location.href = "/materials";
            navigate('../materials', { replace: false });

        } catch (error) {
            console.error("Error deleting Material:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className='mt-auto isolate py-2 mb-12'>
                {/* header */}
                {material && material.content[0] ? (
                    <div className='bg-secondary py-14 text-center text-4xl gap-y-3 text-white flex flex-col items-center justify-center'>
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

                {/* steps */}
                {material && material.content.map((materialItem) => (
                    <div className="mx-auto p-4 max-w-6xl bg-tertiary rounded-lg shadow-2xl mt-12">
                        <div key={materialItem._id}>
                            <div className='flex justify-between'>
                                <h1 className='title px-2 mt-3 text-4xl text-font_primary text-left'>{materialItem.stepContent.title}</h1>
                                {user && user.role === "Administrador" && (
                                    <div className="flex items-center gap-x-1">
                                        {/* edit btn */}
                                        <Link to={`/materials/edit-step/${material._id}/${materialItem._id}`}>
                                            <button className="text-white cursor-pointer bg-primary p-2 hover:bg-secondary rounded-lg">
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

                                        {/* delete btn */}
                                        {material && material.content.length > 1 ? (
                                            <button
                                                onClick={() => handleDelete(material._id, materialItem._id)}
                                                className="text-white cursor-pointer bg-red-800 p-2 hover:bg-red-700 rounded-lg ml-2"
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
                                                className="text-white cursor-pointer bg-red-800 p-2 hover:bg-red-700 rounded-lg ml-2"
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
                            <p className='text-xl text-justify px-2 mt-3' style={{ whiteSpace: 'pre-line' }}>
                                {materialItem.stepContent.text}
                            </p>
                            {materialItem.stepContent.note ? (
                                <div className="max-w-2xl">
                                    <p className='subtitle text-base mt-3 px-2 text-left'>Nota: {materialItem.stepContent.note}</p>
                                </div>
                            ) : (
                                ''
                            )}
                            {materialItem.stepContent.file ? (
                                <div
                                    className="relative cursor-pointer mt-10 flex justify-center items-center"
                                    onClick={() =>
                                        openModal(`http://localhost:5000/Public/Images/${materialItem.stepContent.file}`)
                                    }
                                >
                                    <div className='text-center text-gray-400 text-md'>
                                        Clique para <br /> aumentar a imagem
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-3 w-6 h-6 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>

                                    <img
                                        src={`http://localhost:5000/Public/Images/${materialItem.stepContent.file}`}
                                        alt="imagem do post"
                                        className="w-[40%] rounded-3xl sm:aspect-[2/1] lg:aspect-[16/9] object-cover h-full"
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
                ))}


                {/* add new step (Administrador only) */}
                {user && user.role === "Administrador" && (
                    <div className="mx-auto mt-8 text-center">
                        <Link to={`/materials/add-step/${material._id}`}>
                            <div className='flex justify-center items-center'>
                                <button className='text-white flex items-center gap-x-2 cursor-pointer bg-primary p-2 hover:bg-secondary rounded-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Adicionar novo
                                </button>
                            </div>
                        </Link>
                    </div>
                )}

                <div className="mx-auto mt-8 text-center">
                    <Link to={`/materials/`}>
                        <div className='flex justify-center items-center'>
                            <button className='text-white flex items-center gap-x-2 cursor-pointer bg-primary py-2 px-5  hover:bg-secondary rounded-lg'>
                                Voltar aos materiais
                            </button>
                        </div>
                    </Link>
                </div>

                {/* add comment */}
                <div className='p-5 max-w-6xl mx-auto mt-12 rounded-lg bg-gray-400'>
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
                                className='text-white p-4 flex w-full items-center shadow-xl justify-center rounded-md border border-transparent bg-primary py-2 text-md font-medium  hover:bg-secondary'
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
                                {material.ratings.map((rating) => (
                                    <li key={rating._id}>
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
                                                            <p className="text-primary font-bold text-lg">| {rating.postedby.role}</p>
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
            </div >
        </>
    );
}

export default Material;