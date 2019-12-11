import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='topnav'>
            {/* Logo */}
            <Link id="logo-link" to="/">
                <img className="topnav-logo" src={ "/logo192.png" } alt="React logo" />
            </Link>
        </div>
    )
}

export default Header;
