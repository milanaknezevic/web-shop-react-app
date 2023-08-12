import React from "react";
import classes from './Login.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {formaSchema} from "../../schemas";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login, getUser} from '../../redux/features/userSlice'


const Login = () => {
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
                            <h2>Login</h2>
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
                                <button type="submit">Login</button>


                            </div>
                           <div >
                               <button className={classes.linkBtn} disabled={isSubmitting} type="submit">
                                   No account? Register here.
                               </button>
                           </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;