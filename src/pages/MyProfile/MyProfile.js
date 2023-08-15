import React, {useEffect} from 'react';
import classes from './MyProfile.module.css';

const MyProfile = () => {
    useEffect(() => {
        const resizeHandler = () => {
            const container = document.querySelector(`.${classes.container}`);
            const windowHeight = window.innerHeight;
            const headerElement = document.querySelector('.Header_nav__73kXe');
            console.log(headerElement);

            console.log("windowHeight " + windowHeight);
            if (headerElement) {
                const headerHeight = headerElement.offsetHeight;
                container.style.minHeight = `${windowHeight - headerHeight}px`;
            }
        };

        resizeHandler(); // Postavi visinu kontejnera na početku

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (<div className={classes.container}>
            <div className={classes.left}>
                <p>Left</p>
                <p>Left</p>
                <p>Left</p>
                <p>Left</p>
                <p>Left</p>
                <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p>
                <p>Left</p> <p>Left</p>  <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p> <p>Left</p>
                <p>Left</p> <p>Left</p>
            </div>
            <div className={classes.right}>
                <p>Right</p>
            </div>
        </div>);
};

export default MyProfile;
