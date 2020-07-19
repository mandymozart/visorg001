import React, { useState } from 'react';
import { Navigation } from './Navigation';
import './Header.css';

const Header = () => {
    const [visible, setVisible] = useState(true);
    return (
        <header className="Header">
            <div className="Header__logo">
                <img src="/logo.svg" alt="Vienna Struggle" />
            </div>
            {visible && (
                <Navigation />
            )}
            <a href="#THESTRUGGLEISREAL" className='Header__toggle' onClick={(()=>setVisible(!visible))}>
                <span role='img' aria-labelledby='epics'>
                    {visible ? '👊' : '👋'}
                </span>
            </a>
        </header>
    );
}

export default Header;