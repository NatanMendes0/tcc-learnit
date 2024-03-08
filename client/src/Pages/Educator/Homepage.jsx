import React from 'react';
import { Link } from 'react-router-dom';

function Educator() {
    return (
        <>
            <div className='mt-auto max-w-7xl mx-auto'>
                <h1 className="title mb-7 text-font_secondary">
                    Entre em contato com nossa equipe
                </h1>
                <div className='bg-tertiary transition duration-700 mx-auto rounded-xl shadow-lg shadow-bg_shadow max-w-2xl p-5'>
                    <p className='text-center text-gray-100 mb-3 font-bold'>
                        Mande um email para nossa equipe
                    </p>
                    <h1 className='text-center title py-2 text-gray-100 text-5xl'>
                        equipeLearnIT@gmail.com
                    </h1>
                    <p className='font-semibold text-lg text-gray-100 text-justify px-8 py-3'>
                        e nos informe sobre o seu interesse em compartilhar seus conhecimentos em manutenção de computadores. Estamos ansiosos para ouvir de você e discutir as possibilidades de colaboração. Venha fazer parte da nossa equipe de educadores e contribua para o ensino e aprendizado na área de tecnologia!
                    </p>
                </div>
            </div>
            <div className="flex mx-auto items-center0 justify-center text-lg gap-x-2 mt-6">
                <h1 className='text-secondary transition duration-70'>Gostaria de realizar seu login?</h1>
                <Link to="/login">
                    <p className='text-sky-600 hover:text-sky-500 transition duration-700'>
                        Entre na sua conta aqui!
                    </p>
                </Link>
            </div>
        </>
    );
}

export default Educator;