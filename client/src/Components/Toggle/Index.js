import React, { useContext } from 'react';
import { ThemeContext } from '../../Hooks/ThemeContext';

function Toggle() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
    );
}

export default Toggle;