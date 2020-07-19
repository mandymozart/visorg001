import React from 'react';
import { Navigation } from './Navigation';
import './Footer.css';

const Footer = () => {
    return (
        <div className='Footer'>
            <Navigation />
            <small>&copy; 2020 Vienna Struggle Media GmbH</small>
        </div>
    )
}

export default Footer;