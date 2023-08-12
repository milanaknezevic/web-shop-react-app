import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./NavComponent.module.css";

export const NavComponent = () => {
    return (
        <div className={styles.navComponent}>
            <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/">Home</NavLink>
            <div className={styles.verticalLine}></div> {/* Vertikalna linija */}

            <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/login">Login</NavLink>
            <div className={styles.verticalLine}></div> {/* Vertikalna linija */}


            <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to='/register' >Sign in</NavLink>
        </div>
    );
};
