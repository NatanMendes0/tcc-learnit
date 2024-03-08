import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import api from "../../api";

import { UserCircleIcon } from "@heroicons/react/20/solid";

import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Homepage() {
    const navigate = useNavigate();
    const [Materials, setMaterials] = useState([]);
    const { user } = useAuth();

    const getMaterials = async () => {
        try {
            const response = await api.get("/materials/get-materials");
            return response.data;
        } catch (error) {
            console.error("Error fetching materials:", error);
            return [];
        }
    };

    useEffect(() => {
        async function fetchMaterials() {
            const materialsData = await getMaterials();
            setMaterials(materialsData.reverse());
        }
        fetchMaterials();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/materials/delete-material/${id}`);
            toast.success("Material deletado com sucesso!");
            const materialsData = await getMaterials();
            setMaterials(materialsData.reverse());
        } catch (error) {
            console.error("Error deleting Material:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className="relative isolate mt-14 py-20 sm:py-38 lg:pb-40">

                {/* Hero section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
                            Materiais
                        </h1>
                        <h1 className="text-2xl border-b-2 border-font_secondary pb-2 mt-7 font-bold tracking-tight text-secondary sm:text-4xl">
                            Veja todos os materiais da plataforma!
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-secondary">
                            Houve algum problema e sua máquina parou de funcionar? Quer aprender a montar um computador do zero?
                            Acesse esses e outros materiais disponíveis na nossa plataforma e veja se solucionamos sua necessidade!<br />
                            Caso o seu problema não estiver disponível, insira-o no fórum para que nossa equipe e comunidade possam lhe ajudar.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#materials"
                                className="rounded-md transition duration-700 ease-in-out bg-secondary px-4 py-2.5 text-md font-semibold text-white shadow-lg hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Veja os materiais
                            </a>
                            <Link
                                to="/forum"
                                className="text-md border-transparent transition duration-1000 ease-in-out font-semibold leading-6 text-primary hover:text-tertiary text-sm hover:border-b-2 hover:border-gray-300"
                            >
                                Acesse o fórum <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Materials section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8" id="materials">

                    {/* Materials section - header*/}
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-3xl border-b-2 pb-2 border-font_secondary font-bold tracking-tight text-primary sm:text-5xl">
                            Veja os materiais disponíveis
                        </h1>
                        <p className="mt-3 text-lg font-semibold leading-8 text-secondary">
                            Visualize os nossos materiais disponíveis. <br />
                            Novos materiais são adicionados pelos nossos educadores regularmente!
                        </p>
                        {user && (user.role === "Administrador" || user.role === "Educador") && (
                            <button
                                onClick={() => navigate("/materials/create")}
                                className="rounded-md transition duration-700 ease-in-out bg-secondary px-4 py-2.5 text-md font-semibold text-white shadow-lg hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10">
                                Adicionar novo material
                            </button>
                        )}
                    </div>

                    {/* Materials section - materials */}
                    <div className="mx-auto mt-16 grid max-w-2xlgrid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {Materials.map((material) => (
                            <div key={material._id}>
                                {/* if the material has a file */}
                                {material.content[0].stepContent.file ? (
                                    <>
                                        <Link to={`/materials/get-material/${material._id}`}>
                                            <div className="shadow-md rounded-b-xl relative w-full aspect-[16/9]">
                                                {material.content[0].stepContent.file && (
                                                    <img
                                                        // src={`http://academico2.gravatai.ifsul.edu.br:5000/Public/Images/${material.content[0].stepContent.file}`}
                                                        src={`http://localhost:5000/Public/Images/${material.content[0].stepContent.file}`}
                                                        alt="imagem do material"
                                                        className="w-full h-full object-cover rounded-t-xl"
                                                    />
                                                )}
                                                <div className="absolute rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                                <div className="p-4 bg-card rounded-b-xl shadow-xl">
                                                    <div className="mt-2 flex items-center gap-x-4 text-md">
                                                        <time dateTime={material.updatedAt} className="text-gray-900">
                                                            {format(new Date(material.updatedAt), "MMMM, dd yyyy", {
                                                                locale: ptBR,
                                                            })}
                                                        </time>
                                                    </div>
                                                    <div className="group relative">
                                                        <h3 className="mt-3 text-lg font-semibold leading-5 text-gray-900">
                                                            <span className="absolute inset-0" />
                                                            {material.content[0].stepContent.title}
                                                        </h3>
                                                        <p className="mt-5 text-sm leading-6 text-gray-900 text-justify line-clamp-3 overflow-ellipsis">
                                                            {material.content[0].stepContent.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="p-4">
                                            <div className="flex items-center gap-x-2 justify-between">
                                                <div className="relative flex justify-between items-center gap-x-2">
                                                    <UserCircleIcon className="h-14 text-primary" />
                                                    <div className="text-sm leading-5">
                                                        <p className="font-semibold text-secondary">
                                                            <span className="absolute inset-0" />
                                                            {material.user.name}
                                                        </p>
                                                        <p className="text-secondary">@{material.user.nickname}</p>
                                                        <p className="text-bg_primary font-extrabold">{material.user.role}</p>
                                                    </div>
                                                </div>
                                                <div className="ml-auto flex items-center gap-x-2">
                                                    {/* delete btn */}
                                                    {user && user.role && material.user && material.user._id && ((user.role === "Administrador" || user.role === "Educador") || (user._id === material.user._id)) && (
                                                        <button
                                                            onClick={() => handleDelete(material._id)}
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
                                            </div>
                                        </div>
                                    </>
                                ) : (

                                    // if the material has no file
                                    <>
                                        <Link to={`/materials/get-material/${material._id}`}>
                                            <div className="relative rounded-xl shadow-md full">
                                                <div className="p-4 rounded-xl bg-card">
                                                    <div className="mt-2 flex items-center gap-x-4 text-md">
                                                        <time dateTime={material.updatedAt} className="text-gray-900">
                                                            {format(new Date(material.updatedAt), "MMMM, dd yyyy", {
                                                                locale: ptBR,
                                                            })}
                                                        </time>
                                                    </div>
                                                    <div className="group relative">
                                                        <h3 className="mt-3 text-lg font-semibold leading-5 text-gray-900 group-hover:text-gray-600">
                                                            <span className="absolute inset-0" />
                                                            {material.content[0].stepContent.title}
                                                        </h3>
                                                        <p className="mt-5 text-sm leading-6 text-gray-900 text-justify line-clamp-3 overflow-ellipsis">
                                                            {material.content[0].stepContent.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="p-4">
                                            <div className="flex -mb-2 items-center gap-x-2">
                                                <div className="relative flex items-center gap-x-2">
                                                    <UserCircleIcon className="h-12 text-primary" />
                                                    <div className="text-sm leading-5">
                                                        <p className="font-semibold text-secondary">
                                                            <span className="absolute inset-0" />
                                                            {material.user.name}
                                                        </p>
                                                        <p className="text-secondary">@{material.user.nickname}</p>
                                                        <p className="text-primary font-bold">{material.user.role}</p>
                                                    </div>
                                                </div>
                                                <div className="ml-auto flex items-center gap-x-2">
                                                    {/* delete btn */}
                                                    {user && user.role && material.user && material.user._id && ((user.role === "Administrador" || user.role === "Educador") || (user._id === material.user._id)) && (
                                                        <button
                                                            onClick={() => handleDelete(material._id)}
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
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
