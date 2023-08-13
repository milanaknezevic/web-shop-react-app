import React, {useState} from "react";
import classes from './Register.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {registerSchema} from "../../schemas";
import {useDispatch} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import authService from "../../api/auth.service";

const Register = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const onSubmit = async (values, actions) => {
        try {
            console.log(values);
            const response = await authService.signUp(values);
            console.log("response " + response);

        } catch (error) {
            console.error("Error:", error);

        }
    };


    return (
        <div className={classes.App}>
            <div className={classes.authFormContainer}>
                <Formik
                    initialValues={{
                        ime: "",
                        prezime: "",
                        korisnickoIme: "",
                        lozinka: "",
                        confirmPassword: "",
                        grad: "",
                        avatar: "",
                        email: ""
                    }}
                    validationSchema={registerSchema}
                    onSubmit={onSubmit}
                >
                    {({errors, isSubmitting, touched, handleBlur}) => (
                        <Form className={classes.loginForm}>
                            <h2 className={classes.poravnaj}>Sign in</h2>
                            {showErrorMessage && (
                                <div className={classes.error}>
                                   Desila se greska...
                                </div>
                            )}
                            <div className={classes.fleks}>
                                <div className={classes.ispodFleks}>
                                    <label htmlFor="name">First name:</label>
                                    <Field
                                        type="text"
                                        id="ime"
                                        name="ime"
                                        placeholder='First name'
                                        className={
                                            errors.ime && touched.ime ? classes.inputError : ""
                                        }
                                        onBlur={handleBlur}
                                    />
                                    {touched.ime && errors.ime && (
                                        <ErrorMessage name="ime" component="div" className={classes.error}/>
                                    )}
                                </div>


                                <div className={classes.ispodFleks}>
                                    <label htmlFor="name">Last name:</label>
                                    <Field
                                        type="text"
                                        id="prezime"
                                        name="prezime"
                                        placeholder='Last name'
                                        className={
                                            errors.prezime && touched.prezime ? classes.inputError : ""
                                        }
                                        onBlur={handleBlur}
                                    />
                                    {touched.prezime && errors.prezime && (
                                        <ErrorMessage name="prezime" component="div" className={classes.error}/>
                                    )}
                                </div>
                            </div>


                            <div className={classes.fleks}>
                                <div className={classes.ispodFleks}>
                                    <label htmlFor="name">Username:</label>
                                    <Field
                                        type="text"
                                        id="korisnickoIme"
                                        name="korisnickoIme"
                                        placeholder='Username'
                                        className={
                                            errors.korisnickoIme && touched.korisnickoIme ? classes.inputError : ""
                                        }
                                        onBlur={handleBlur}
                                    />
                                    {touched.korisnickoIme && errors.korisnickoIme && (
                                        <ErrorMessage name="korisnickoIme" component="div" className={classes.error}/>
                                    )}
                                </div>


                                <div className={classes.ispodFleks}>
                                    <label htmlFor="email">Email:</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder='Email'
                                        className={
                                            errors.email && touched.email ? classes.inputError : ""
                                        }
                                        onBlur={handleBlur}
                                    />
                                    {touched.email && errors.email && (
                                        <ErrorMessage name="email" component="div" className={classes.error}/>
                                    )}
                                </div>
                            </div>

                            <div className={classes.fleks}>
                                <div className={classes.ispodFleks}>
                                    <label htmlFor="password">Password:</label>
                                    <Field
                                        type="password"
                                        id="lozinka"
                                        name="lozinka"
                                        placeholder='Password'
                                        className={
                                            errors.lozinka && touched.lozinka ? classes.inputError : ""
                                        }
                                        onBlur={handleBlur}
                                    />
                                    {touched.lozinka && errors.lozinka && (
                                        <ErrorMessage name="lozinka" component="div" className={classes.error}/>
                                    )}
                                </div>

                                <div className={classes.ispodFleks}>
                                    <label htmlFor="password">Confirm password:</label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder='Confirm password'
                                        className={
                                            errors.confirmPassword && touched.confirmPassword ? classes.inputError : ""
                                        }
                                        onBlur={handleBlur}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <ErrorMessage name="confirmPassword" component="div" className={classes.error}/>
                                    )}
                                </div>
                            </div>

                            <div className={classes.fleks}>
                                <div className={classes.ispodFleks}>
                                    <label htmlFor="name">City:</label>
                                    <Field
                                        type="text"
                                        id="grad"
                                        name="grad"
                                        placeholder='City'
                                        className={
                                            errors.grad && touched.grad ? classes.inputError : ""
                                        }
                                        onBlur={handleBlur}
                                    />
                                    {touched.grad && errors.grad && (
                                        <ErrorMessage name="grad" component="div" className={classes.error}/>
                                    )}
                                </div>


                                <div className={classes.ispodFleks}>
                                    <label htmlFor="name">Avatar:</label>

                                    <Field
                                        type="file"
                                        id="avatar"
                                        name="avatar"
                                        className={classes.customFileLabel}
                                        placeholder='avatar'
                                        accept="image/*"

                                        onBlur={handleBlur}
                                    />
                                    {touched.avatar && errors.avatar && (
                                        <ErrorMessage name="avatar" component="div" className={classes.error}/>
                                    )}
                                </div>
                            </div>


                            <div>
                                <button className={classes.signIn} type="submit">Sign in</button>

                            </div>


                            <p className={classes.poravnaj}>
                                Already have an account?
                                <NavLink to="/login"> Login here.</NavLink>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;