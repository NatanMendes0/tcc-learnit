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
                console.log(user);

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

    //todo - função que atualiza o usuário
    const onSubmit = async (data) => {
        try {
            await authContext.update(id, data);
            navigate("../", { replace: false });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="mt-auto px-6 py-2 sm:py-11 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-3xl border-b-2 pb-2 border-font_secondary font-bold tracking-tight text-primary sm:text-5xl">
                    Configuração de conta
                </h1>
                <p className="mt-3 text-lg font-semibold leading-8 text-font_secondary">
                    Informações de conta
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-5 max-w-3xl sm:mt-10">
                <div className="grid gap-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Nome</label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="name" // Certifique-se de que o atributo name corresponda ao campo name no objeto retornado do servidor
                                id="name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
                            {errors.name && (
                                <span className="text-sm text-red-500">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="nickname" className="block text-sm font-semibold leading-6 text-gray-900">Nome de usuário</label>
                        <div className="flex">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                @
                            </span>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="nickname" // Certifique-se de que o atributo name corresponda ao campo nickname no objeto retornado do servidor
                                    id="nickname"
                                    autoComplete="family-name"
                                    className="block w-full rounded-r-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    {...register("nickname", {
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
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                        <div className="mt-2.5">
                            <input
                                type="email"
                                name="email" // Certifique-se de que o atributo name corresponda ao campo email no objeto retornado do servidor
                                id="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
                    {/* <div>
                        <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">Nova senha</label>
                        <div className="mt-2.5">
                            <input type="password" name="password" id="password" autoComplete="new-password" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password-confirm" className="block text-sm font-semibold leading-6 text-gray-900">Confirmação de senha</label>
                        <div className="mt-2.5">
                            <input type="password" name="password-confirm" id="password-confirm" autoComplete="new-password" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                        </div>
                    </div> */}
                </div>
                <div className="mt-10 mx-auto text-center">
                    <button type="submit" className="btn px-7">Salvar</button>
                </div>
            </form>
        </div>
    )
}
