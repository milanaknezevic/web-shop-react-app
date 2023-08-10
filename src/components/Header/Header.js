import React from "react";
import Logo from '../../assets/logo.png';
import {NavComponent} from "../Navbar/NavComponent";
import styles from './Header.module.css';

const Header = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.logoContainer}>
                <img className={styles.confLogo} src={Logo} alt="Logo"/>
            </div>

            <NavComponent/>
        </nav>
    );
};
export default Header;