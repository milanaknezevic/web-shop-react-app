import React, {useState} from "react";
import classes from './Login.module.css'
import {useDispatch} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {getUser, login} from '../../redux/features/userSlice'
import {Form, Input} from "antd";


const Login = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const [succesMessage, setsuccesMessage] = useState("");

    const onSubmit = async (values, actions) => {

        console.log("values " + JSON.stringify(values));
        try {
            const response = await dispatch(login(values));
            console.log("response " + JSON.stringify(response));
            if (response.payload.token === "" && response.payload.code !== "") {

                setShowSuccesMessage(true);
                setsuccesMessage("Activation code sent. Check your email.");
                setTimeout(() => {
                    setShowSuccesMessage(false);
                    setsuccesMessage("");

                    nav("/activate", {state: {username: values.korisnickoIme}});
                }, 3000);
            } else if (response.payload.code === "" && response.payload.token !== "") {
                dispatch(getUser({id: response.payload.id}));
                nav('/');

            } else {
                setShowErrorMessage(true);
                setErrorMessage("Login failed. Please try again.");
                setTimeout(() => {
                    setShowErrorMessage(false);
                    setErrorMessage("");

                }, 3000);
            }
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage("Login failed. Please try again.");
            setTimeout(() => {
                setShowErrorMessage(false);
                setErrorMessage("");

            }, 3000);
        }

    };


    return (
        <div className={classes.App}>
            <div className={classes.authFormContainer}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 9,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onSubmit}
                    autoComplete="off"
                >
                    <p className={classes.formTitle1}>Sign in</p>
                    {showSuccesMessage && (
                        <p className={classes.succes}>{succesMessage}</p>
                    )}
                    {showErrorMessage && (
                        <p className={classes.error}>{errorMessage}</p>
                    )}

                    <Form.Item
                        label="Username"
                        name="korisnickoIme"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="lozinka"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button type="submit">Login</button>
                    </div>
                    <p className={classes.signupLink1}>
                        No account?
                        <NavLink to="/login" className={classes.signupLink}> Register here.</NavLink>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Login;