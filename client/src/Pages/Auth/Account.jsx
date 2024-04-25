import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Account() {
    const { id } = useParams();
    const navigate = useNavigate();
    const authContext = useAuth();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const user = await authContext.get(id);
                setValue("name", user.getUser.name);
                setValue("nickname", user.getUser.nickname);
                setValue("email", user.getUser.email);
            } catch (error) {
                toast.error(error.message);
                navigate("../forum", { replace: false });
            }
        }

        fetchUserData();
    }, [id, navigate, authContext, setValue]);

    const onSubmit = async (data) => {
        try {
            await authContext.update(id, data);
            navigate("../", { replace: false });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await authContext.remove(id);
            navigate("../", { replace: false });
        } catch (error) {
            console.error("Erro ao deletar o usuário:", error);
            navigate("../", { replace: false })
        }
    };

    return (
        <div className="mt-auto px-6 py-2 sm:py-11 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-3xl border-b-2 pb-2 border-font_secondary font-bold tracking-tight text-primary sm:text-5xl">
                    Configuração de conta
                </h1>
                <h1 className="mt-3 text-lg font-semibold leading-8 text-secondary">
                    Informações de conta
                </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto text-secondary mt-5 max-w-3xl sm:mt-10">
                <div className="grid gap-y-6 ">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold leading-6">Nome</label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bg_primary sm:text-sm sm:leading-6"
                                {...register("name", {
                                    required: "Campo obrigatório",
                                    minLength: {
                                        value: 3,
                                        message: "Digite um título com ao menos 3 caracteres",
                                    },
                                    maxLength: {
                                        value: 700,
                                        message: "Máximo de 30 caracteres",
                                    },
                                })}
                            />
                        </div>
                    </div>
                    {errors.name && (
                        <span className="text-sm text-red-500">
                            {errors.name.message}
                        </span>
                    )}
                    <div>
                        <label htmlFor="nickname" className="block text-sm font-semibold leading-6">Nome de usuário</label>
                        <div className="flex">
                            <span className="bg-gray-200 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                @
                            </span>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="nickname" // Certifique-se de que o atributo name corresponda ao campo nickname no objeto retornado do servidor
                                    id="nickname"
                                    autoComplete="family-name"
                                    className="block w-full rounded-r-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bg_primary sm:text-sm sm:leading-6"
                                    {...register("nickname", {
                                        required: "Campo obrigatório",
                                        validate: (value) => {
                                            const regex = /^\S*$/; // no spaces
                                            return (
                                                regex.test(value) || "Campo não pode conter espaços"
                                            );
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Digite um título com ao menos 3 caracteres",
                                        },
                                        maxLength: {
                                            value: 700,
                                            message: "Máximo de 30 caracteres",
                                        },
                                    })}
                                />
                            </div>
                        </div>
                        {errors.nickname && (
                            <span className="text-sm text-red-500">
                                {errors.nickname.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold leading-6">Email</label>
                        <div className="mt-2.5">
                            <input
                                type="email"
                                name="email" // Certifique-se de que o atributo name corresponda ao campo email no objeto retornado do servidor
                                id="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bg_primary sm:text-sm sm:leading-6"
                                {...register("email", {
                                    required: "Campo obrigatório",
                                    minLength: {
                                        value: 3,
                                        message: "Digite um título com ao menos 3 caracteres",
                                    },
                                    maxLength: {
                                        value: 700,
                                        message: "Máximo de 30 caracteres",
                                    },
                                })}
                            />
                            {errors.name && (
                                <span className="text-sm text-red-500">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold leading-6">Nova senha</label>
                        <div className="mt-2.5">
                            <input type="password" name="password" id="password" autoComplete="new-password"
                                {...register("password", {
                                    minLength: {
                                        value: 8,
                                        message: "Digite uma senha com pelo menos 8 caracteres",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Máximo de 50 caracteres",
                                    },
                                })}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bg_primary sm:text-sm sm:leading-6" />
                            {errors.password && (
                                <span className="text-sm text-red-500">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* TODO - formulario separado para alteração de senha. Motivo: se o valor do input password estiver vazio, é possível do usuario perder a conta por não conseguir entrar sem senha */}
                <div className="mt-10 mx-auto text-center">
                    <button
                        type="submit"
                        className="text-primary px-10 py-2 cursor-pointer bg-bg_primary hover:bg-btn transition duration-700 ease-in-out rounded-lg"
                    >
                        Alterar senha
                    </button>
                </div>
            </form>
            <div className="mt-10 mx-auto text-center">
                <button
                    onClick={() => handleDelete(authContext.user._id)}
                    className="text-primary px-10 py-2 cursor-pointer bg-quaternary hover:bg-red-900 transition duration-700 ease-in-out rounded-lg"
                >
                    Deletar conta
                </button>
            </div>
        </div>
    )
}
