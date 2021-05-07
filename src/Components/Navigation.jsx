import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export const Navigation = () => {
    return (
        <div className='Navigation'>
            <h4>Account</h4>
            <ul>
                <li><Link to={'/dashboard'}>Dashboard</Link></li>
                <li><Link to={'/logout'}>Logout</Link></li>
                <li><Link to={'/profile'}>Profile</Link></li>
            </ul>
            <h4>Tracking</h4>
            <ul>
                <li><Link to={'/tracking/add'}>Add</Link></li>
                <li><Link to={'/tracking/add-organisation-weight'}>Organisation Weight</Link></li>
            </ul>
            <h4>Templates</h4>
            <ul>
                <li><Link to={'/epics/create'}>Browse</Link></li>
                <li><a rel="noopener noreferrer" href="https://visorg001.prismic.io/documents" target="_blank">Edit</a></li>
            </ul>
        </div>
    );
}