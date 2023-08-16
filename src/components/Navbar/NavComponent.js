import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import styles from "./NavComponent.module.css";
import {useSelector} from "react-redux";
import userImage from '../../assets/logo.png';
import Meni from "../Meni/Meni";

export const NavComponent = () => {
    const {authenticated, user} = useSelector((state) => state.users);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(authenticated);
        console.log("autheticated " + authenticated);
        console.log("auth " + auth);
        console.log("user " + user);
    }, [authenticated, auth, user]);


    return (
        <div className={styles.navComponent}>
            {auth ? (
                <>
                    {user ? (
                        <>
                            <p className={styles.poruka}>Hello, {user.ime}</p>
                            <div className={styles.userImageContainer}>
                                <img className={styles.userImage} src={userImage} alt="User"/>
                            </div>
                        </>
                    ) : null}
                    <Meni></Meni>
                </>
            ) : (
                <>
                    <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to="/">Home</NavLink>
                    <div className={styles.verticalLine}></div>
                    <NavLink className={styles.navLink} activeClassName={styles.activeNavLink}
                             to="/login">Login</NavLink>
                    <div className={styles.verticalLine}></div>
                    <NavLink className={styles.navLink} activeClassName={styles.activeNavLink} to='/register'>Sign
                        in</NavLink>
                </>
            )}
        </div>
    );
};
