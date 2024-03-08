import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../Hooks/ThemeContext';
import { Switch } from '@headlessui/react'
import { MoonIcon } from '@heroicons/react/24/solid';
import { SunIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Toggle() {
    const { theme, setTheme } = useContext(ThemeContext);
    const [enabled, setEnabled] = useState(theme === 'dark' ? true : false)

    return (
        <>
            <div className='flex gap-x-1 items-center'>
                <Switch
                    checked={theme === 'dark'}
                    onChange={() => {
                        setTheme(theme === 'dark' ? 'light' : 'dark');
                        setEnabled(!enabled);
                    }}
                    className={classNames(
                        enabled ? 'bg-bg_primary' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                    )}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        className={classNames(
                            enabled ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                    >
                        <span
                            className={classNames(
                                enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                            )}
                            aria-hidden="true"
                        >
                            <SunIcon className="h-6 text-bg_primary" />
                        </span>
                        <span
                            className={classNames(
                                enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                            )}
                            aria-hidden="true"
                        >
                            <MoonIcon className="h-4 text-bg_primary" />
                        </span>
                    </span>
                </Switch>
            </div>
        </>
    )
}