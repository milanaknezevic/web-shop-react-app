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
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const [succesMessage, setsuccesMessage] = useState("");

    const onSubmit = async (values, actions) => {


        const response = await dispatch(login(values));

        if (response.payload.token === "" && response.payload.code !== "" ) {

            setShowSuccesMessage(true);
            setsuccesMessage("Activation code sent. Check your email.");
            setTimeout(() => {
                setShowSuccesMessage(false);
                setsuccesMessage("");

                nav("/activate", {state: {username: values.username}});
            }, 3000);
        } else  if (response.payload.code === "" && response.payload.token !== "" ) {

           // setShowSuccesMessage(true);
            //setsuccesMessage("Login successful! Redirecting...");

            dispatch(getUser({id: response.payload.id}));
            //treba provjera status ai ovde al nmg sad to
            nav('/');
           /* setTimeout(() => {
                setShowSuccesMessage(false);
                setsuccesMessage("");
                nav('/');
            }, 3000);*/
        }else {
            setShowErrorMessage(true);
            setErrorMessage("Login failed. Please try again.");
            setTimeout(() => {
                setShowErrorMessage(false);
                setErrorMessage("");

            }, 3000);
        }

    };

    /*useEffect(() => {
        let timer;

        if (showSuccessMessage) {
            timer = setTimeout(() => {
                setShowSuccessMessage(false);
                nav('/');
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [showSuccessMessage, nav]);*/

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
                            {showSuccesMessage && (
                                <div className={classes.succes}>
                                    {succesMessage}
                                </div>
                            )}
                            {showErrorMessage && (
                                <div className={classes.error}>
                                    {errorMessage}
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