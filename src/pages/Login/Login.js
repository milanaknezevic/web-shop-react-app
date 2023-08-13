import React, {useState, useEffect} from "react";
import classes from './Login.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {formaSchema} from "../../schemas";
import {useDispatch} from "react-redux";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {login, getUser} from '../../redux/features/userSlice'


const Login = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const onSubmit = async (values, actions) => {
        console.log(values);

        const response = await dispatch(login(values));
        if (response.error) {
            // nije ulogovan
            return;
        }//ulogovan
        setShowSuccessMessage(true);
        dispatch(getUser({id: response.payload.id}));
        setTimeout(() => {
            setShowSuccessMessage(false);
            nav('/');
        }, 3000);
    };

    useEffect(() => {
        let timer;

        if (showSuccessMessage) {
            timer = setTimeout(() => {
                setShowSuccessMessage(false);
                nav('/');
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [showSuccessMessage, nav]);

    return (
        <div className={classes.App}>
            <div className={classes.authFormContainer}>
                <Formik
                    initialValues={{username: "", password: ""}}
                    validationSchema={formaSchema}
                    onSubmit={onSubmit}
                >
                    {({errors, isSubmitting, touched, handleBlur}) => (
                        <Form className={classes.loginForm}>
                            <h2>Login</h2>
                            {showSuccessMessage && (
                                <div className={classes.succes}>
                                    Login successful! Redirecting...
                                </div>
                            )}
                            <label htmlFor="name">Username:</label>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                placeholder='Username'
                                className={
                                    errors.username && touched.username ? classes.inputError : ""
                                }
                                onBlur={handleBlur}
                            />
                            {touched.username && errors.username && (
                                <ErrorMessage name="username" component="div" className={classes.error}/>
                            )}

                            <label htmlFor="password">Password:</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder='********'
                                className={errors.password ? classes.inputError : ""}
                            />
                            <ErrorMessage name="password" component="div" className={classes.error}/>


                            <div>
                                <button  type="submit">Login</button>
                            </div>

                            <p className={classes.signupLink1}>
                                No account?
                                <NavLink to="/login" className={classes.signupLink}> Register here.</NavLink>
                            </p>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;