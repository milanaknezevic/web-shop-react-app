import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import styles from "./NavComponent.module.css";
import {useDispatch, useSelector} from "react-redux";
import logout from '../../redux/features/userSlice';
import userImage from '../../assets/logo.png';

export const NavComponent = () => {
    const {authenticated, user} = useSelector((state) => state.users);
    const [auth, setAuth] = useState(false);
    const dispatch = useDispatch(); // Koristimo useDispatch za pozivanje akcija
    const navigate = useNavigate();

    useEffect(() => {
        setAuth(authenticated);
    }, [authenticated]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className={styles.navComponent}>
            {auth ? (
                <>
                    <p className={styles.poruka}>Hello, {user.ime}</p>
                    <div className={styles.userImageContainer}>
                        <img className={styles.userImage} src={userImage} alt="User"/>
                    </div>
                    <NavLink
                        className={styles.navLink} activeClassName={styles.activeNavLink} to="/"
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        Logout
                    </NavLink>
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
