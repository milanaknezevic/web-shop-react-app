import React from "react";
import classes from './Register.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {formaSchema} from "../../schemas";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login, getUser} from '../../redux/features/userSlice'


const Register = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const onSubmit = async (values, actions) => {
        console.log(values);

        const response = await dispatch(login(values));
        /*if (response.error) {
            setStatusCode(response.error.message);
            return;
        }*/
        console.log(response);
        /* dispatch(getUser({id: response.id}));
         nav('/');
          await new Promise((resolve) => setTimeout(resolve, 1000));
          actions.resetForm();*/
    };

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
                            <h2>Sign in</h2>

                            <div style={{display: 'flex'}}>
                                <div style={{display: 'flex',
                                    flexDirection: 'column' ,padding: '10px'}}>
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
                                </div>


                                    <div style={{display: 'flex',
                                        flexDirection: 'column' ,padding: '10px'}}>
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
                                </div>
                            </div>


                            <div style={{display: 'flex'}}>
                                <div style={{display: 'flex',
                                    flexDirection: 'column' ,padding: '10px'}}>
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
                                </div>


                                <div style={{display: 'flex',
                                    flexDirection: 'column' ,padding: '10px'}}>
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
                                </div>
                            </div>

                            <div style={{display: 'flex'}}>
                                <div style={{display: 'flex',
                                    flexDirection: 'column' ,padding: '10px'}}>
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
                                </div>


                                <div style={{display: 'flex',
                                    flexDirection: 'column' ,padding: '10px'}}>
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
                                </div>
                            </div>


                            <div style={{display: 'flex'}}>
                                <div style={{display: 'flex',
                                    flexDirection: 'column' ,padding: '10px'}}>
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
                                </div>


                                <div style={{display: 'flex',
                                    flexDirection: 'column' ,padding: '10px'}}>
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
                                </div>
                            </div>


                            <div>
                                <button className={classes.signIn} type="submit">Sign in</button>

                            </div>

                          <div>
                              <button className={classes.linkBtn} disabled={isSubmitting} type="submit">
                                  Already have an account? Login here.
                              </button>
                          </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;