import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export const Navigation = () => {
    return (
        <div className='Navigation'>
            <h4>Epics</h4>
            <ul>
                <li><Link to={'/epics/create'}>Create Epics</Link></li>
                <li><a rel="noopener noreferrer" href="https://visorg001.prismic.io/documents" target="_blank">Edit Templates</a></li>
                <li><Link to={'/page/terms'}>Terms</Link></li>
            </ul>
        </div>
    );
}