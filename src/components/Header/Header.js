import React from 'react';
import { Link } from 'react-router-dom'; // Importujte Link
import Logo from '../../assets/logo.png';
import { NavComponent } from '../Navbar/NavComponent';
import styles from './Header.module.css';

const Header = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.logoContainer}>
                <Link to="/">
                    <img className={styles.confLogo} src={Logo} alt="Logo" />
                </Link>
            </div>
            <NavComponent />
        </nav>
    );
};

export default Header;
