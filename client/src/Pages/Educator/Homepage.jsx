import React from 'react';

function Educator() {
    return (
        <>
            <div className='mt-auto max-w-7xl mx-auto'>
                <h1 className="title mb-5 text-font_secondary">
                    Entre em contato com nossa equipe
                </h1>
                <div className='bg-tertiary mx-auto rounded-xl shadow-lg max-w-2xl p-5'>
                    <p className='text-center mb-3 font-bold'>
                        Mande um email para nossa equipe
                    </p>
                    <h1 className='text-center title py-2 text-primary text-5xl'>
                        equipeLearnIT@gmail.com
                    </h1>
                    <p className='font-semibold text-lg text-justify px-8 py-3'>
                        e nos informe sobre o seu interesse em compartilhar seus conhecimentos em manutenção de computadores. Estamos ansiosos para ouvir de você e discutir as possibilidades de colaboração. Venha fazer parte da nossa equipe de educadores e contribua para o ensino e aprendizado na área de tecnologia!
                    </p>
                    <div className='text-center mt-5'>
                        <button className='btn hover:bg-primary active:bg-sky-900'>
                            <a href="mailto:equipeLearnit@gmail.com">Enviar email</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex mx-auto items-center justify-center text-lg gap-x-2 mt-6">
                <h1>Gostaria de realizar seu login?</h1>
                <a className='text-primary hover:text-secondary active:text-sky-900' href="/login">Entre na sua conta aqui!</a>
            </div>
        </>
    );
}

export default Educator;