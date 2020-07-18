import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
    return (
        <>
        <h4>Menu</h4>
        <ul>
            <li><Link to={'/epics/create'}>Create Epics</Link></li>
        </ul>
        </>
    );
}