import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Account() {
    const auth = useAuth();
    return (
        <div className=" bg-white px-6 py-2 sm:py-11 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-3xl border-b-2 pb-2 border-font_secondary font-bold tracking-tight text-primary sm:text-5xl">
                    Configuração de conta
                </h1>
                <p className="mt-3 text-lg font-semibold leading-8 text-font_secondary">
                    Informações de conta
                </p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-3xl sm:mt-20">
                <div className="grid gap-y-6">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">Nome</label>
                        <div className="mt-2.5">
                            <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Nome de usuário</label>
                        <div className="flex">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                @
                            </span>
                            <div className="flex-1">
                                <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-r-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                        <div className="mt-2.5">
                            <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
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
                    </div>
                </div>
                <div className="mt-10 mx-auto text-center">
                    <button type="submit" className="btn px-7">Salvar</button>
                </div>
            </form>
        </div>
    )
}
