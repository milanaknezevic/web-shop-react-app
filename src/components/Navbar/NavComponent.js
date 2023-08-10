import React from "react";
import {NavLink} from "react-router-dom";
import {CgHeart, CgShoppingCart} from "react-icons/cg";
import styles from "./NavComponent.module.css"; // Uvezite stilove

export const NavComponent = () => {
    return (
        <div className={styles.navComponent}>
            <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/">Sign in</NavLink>
            <div className={styles.verticalLine}></div> {/* Vertikalna linija */}

            <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/">Register</NavLink>

        </div>
    );
};
