import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMaterial } from "../../context/MaterialContext";
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

    const materialContext = useMaterial();

    const getMaterials = async () => {
        try {
            const response = await materialContext.list();
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
            await api.delete(`/forum/delete-material/${id}`);
            toast.success("Material deletado com sucesso!");
            const materialsData = await getMaterials();
            setMaterials(materialsData.reverse());
            navigate("../forum", { replace: false });
        } catch (error) {
            console.error("Error deleting Material:", error);
            toast.error(error.response.data.message);
            navigate("../forum", { replace: false })
        }
    };

    return (
        <>
            <div className="relative isolate py-20 sm:py-38 lg:pb-40">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect
                        width="100%"
                        height="100%"
                        strokeWidth={0}
                        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                    />
                </svg>
                {/* Hero section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
                            Materiais
                        </h1>
                        <h1 className="text-2xl border-b-2 border-font_secondary pb-2 mt-7 font-bold tracking-tight text-font_secondary sm:text-4xl">
                            Veja todos os materiais da plataforma!
                        </h1>
                        <p className="mt-6 text-lg font-semibold leading-8 text-font_secondary">
                            Houve algum problema e sua máquina parou de funcionar? Quer aprender a montar um computador do zero?
                            Acesse esses e outros materiais disponíveis na nossa plataforma e veja se solucionamos sua necessidade!<br />
                            Caso o seu problema não estiver disponível, insira-o no fórum para que nossa equipe e comunidade possam lhe ajudar.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#materials"
                                className="btn"
                            >
                                Veja os materiais
                            </a>
                            <Link
                                to="/forum"
                                className="text-sm font-semibold leading-6 text-font_secondary hover:text-secondary"
                            >
                                Acesse o Fórum <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Forum section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8" id="materials">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-3xl border-b-2 pb-2 border-font_secondary font-bold tracking-tight text-primary sm:text-5xl">
                            Veja os materiais disponíveis
                        </h1>
                        <p className="mt-3 text-lg font-semibold leading-8 text-font_secondary">
                            Visualize os nossos materiais disponíveis. <br />
                            Novos materiais são Materialados pelos nossos educadores regularmente!
                        </p>
                        {user && user.role === "admin" && (
                            <button
                                onClick={() => navigate("/materials/create")}
                                className="btn mt-10">                            
                                Adicionar novo material
                            </button>
                        )}
                    </div>

                    {/* Materials section */}
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {Materials.map((Material) => (
                            <div key={Material._id}>
                                <Link to={`/forum/get-Material/${Material._id}`}>
                                    {Material.file ? (
                                        <>
                                            <div className="shadow-md relative w-full aspect-[16/9]">
                                                {Material.file && (
                                                    <img
                                                        src={`http://localhost:5000/Public/Images/${Material.file}`}
                                                        alt="imagem do Material"
                                                        className="w-full h-full object-cover rounded-t-lg"
                                                    />
                                                )}
                                                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                                <div className="p-4">
                                                    <div className="mt-2 flex items-center gap-x-4 text-md">
                                                        <time dateTime={Material.updatedAt} className="text-gray-500">
                                                            {format(new Date(Material.updatedAt), "MMMM, dd yyyy", {
                                                                locale: ptBR,
                                                            })}
                                                        </time>
                                                    </div>
                                                    <div className="group relative">
                                                        <h3 className="mt-3 text-lg font-semibold leading-5 text-gray-900 group-hover:text-gray-600">
                                                            <span className="absolute inset-0" />
                                                            {Material.title}
                                                        </h3>
                                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                                            {Material.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center gap-x-2">
                                                    <div className="relative flex items-center gap-x-2">
                                                        <UserCircleIcon className="h-12 text-primary" />
                                                        <div className="text-sm leading-5">
                                                            <p className="font-semibold text-secondary">
                                                                <span className="absolute inset-0" />
                                                                {Material.user.name}
                                                            </p>
                                                            <p className="text-secondary">@{Material.user.nickname}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ml-auto">
                                                        {/* delete btn */}
                                                        {user && (user.name === Material.user.name || user.role === "admin") && (
                                                            <button
                                                                onClick={() => handleDelete(Material._id)}
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
                                                        {/* edit btn */}
                                                        {user && user.name === Material.user.name && (
                                                            <Link to={`/forum/edit-Material/${Material._id}`}>
                                                                <button
                                                                    className="text-white cursor-pointer bg-primary p-2 hover:bg-secondary rounded-lg"
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
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* alterar o tamanho do card para ficar menor sem a imagem */}
                                            <div className="relative w-full">
                                                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                                <div className="p-4">
                                                    <div className="mt-2 flex items-center gap-x-4 text-md">
                                                        <time dateTime={Material.updatedAt} className="text-gray-500">
                                                            {format(new Date(Material.updatedAt), "MMMM, dd yyyy", {
                                                                locale: ptBR,
                                                            })}
                                                        </time>
                                                    </div>
                                                    <div className="group relative">
                                                        <h3 className="mt-3 text-lg font-semibold leading-5 text-gray-900 group-hover:text-gray-600">
                                                            <span className="absolute inset-0" />
                                                            {Material.title}
                                                        </h3>
                                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                                            {Material.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex -mb-2 items-center gap-x-2">
                                                    <div className="relative flex items-center gap-x-2">
                                                        <UserCircleIcon className="h-12 text-primary" />
                                                        <div className="text-sm leading-5">
                                                            <p className="font-semibold text-secondary">
                                                                <span className="absolute inset-0" />
                                                                {Material.user.name}
                                                            </p>
                                                            <p className="text-secondary">@{Material.user.nickname}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ml-auto">
                                                        {/* delete btn */}
                                                        {user && (user.name === Material.user.name || user.role === "admin") && (
                                                            <button
                                                                onClick={() => handleDelete(Material._id)}
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
                                                        {/* edit btn */}
                                                        {user && user.name === Material.user.name && (
                                                            <Link to={`/forum/edit-Material/${Material._id}`}>
                                                                <button
                                                                    className="text-white cursor-pointer bg-primary p-2 hover:bg-secondary rounded-lg"
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
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}