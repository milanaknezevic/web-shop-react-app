import React from "react";
import classes from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={classes.container}>
            <h1 className={classes.zaH1}>404</h1>
            <p className={classes.zaP}>Page Not Found</p>
            <a className={classes.zaA} href="/">
                Go back to the home page
            </a>
        </div>
    );
};

export default NotFound;