import classes from './Register.module.css';
import {insertImage, signUp} from "../../api/auth.service";
import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from 'antd';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {

    const [isDisabled, setIsDisabled] = useState(false);
    const [contentHeight, setContentHeight] = useState('calc(100vh - 65px)');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const [succesMessage, setsuccesMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {authenticated} = useSelector((state) => state.users);
    const [selectedFile, setSelectedFile] = useState();
    useEffect(() => {
        console.log("autentifikacija " + authenticated);
        if (authenticated)
            navigate('/');
    }, [authenticated, navigate, dispatch]);
    const changeHandler = (event) => {

        setSelectedFile(event.target.files[0]);

    };
    const onSubmit = async (registerData) => {
        setIsDisabled(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            let responseImage = null;
            if (formData.get("file") != null) {
                responseImage = await insertImage(formData);
            }

            const signupData = {
                ime: registerData.ime,
                prezime: registerData.prezime,
                korisnickoIme: registerData.korisnickoIme,
                lozinka: registerData.lozinka,
                grad: registerData.grad,
                avatar: responseImage.data !== "" ? responseImage.data : null,
                email: registerData.email,
            };
            console.log(signupData);
            const response = await signUp(signupData);
            console.log("response " + response.status);
            if (response.status === 200 || response.status === 201) {
                setShowSuccesMessage(true);
                setsuccesMessage("Registration successful");
                setTimeout(() => {
                    setShowSuccesMessage(false);
                    setsuccesMessage("");
                    navigate("/activate", {state: {username: registerData.korisnickoIme}});
                    setIsDisabled(false);
                }, 1500);
            } else {
                setShowErrorMessage(true);
                setErrorMessage("Registration failed. Please try again.");
                setTimeout(() => {
                    setShowErrorMessage(false);
                    setErrorMessage("");
                    setIsDisabled(false);
                }, 1500);
            }
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage("error");
            console.error("showErrorMessage:", showErrorMessage);
            setTimeout(() => {

                setIsDisabled(false);
                setShowErrorMessage(false);
                setErrorMessage("");
            }, 1500);
            console.error("Greska:", error);
            console.error("showErrorMessage:", showErrorMessage);
            console.error("AAAAAAAAAAAAAAAAAAAAAAAA:");
        }


    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <div style={{height: contentHeight}}>
                <div className={classes.linearGradient1}>
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
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <p className={classes.formTitle1}>Sign in</p>
                        {showSuccesMessage && (
                            <p className={classes.succes}>{succesMessage}</p>
                        )}
                        {showErrorMessage && (
                            <p className={classes.succes}>{errorMessage}</p>
                        )}

                        <Form.Item
                            label="Firstname"
                            name="ime"


                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your firstname!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Lastname"
                            name="prezime"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your lastname!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
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
                                {
                                    min: 8,
                                    message: 'Password must be at least 8 characters long.',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            label="Confirm password: "
                            name="cofirmpassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('lozinka') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match.'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email address!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="City"
                            name="grad"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your city!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Avatar"
                            name="avatar"
                            style={{backgroundColor:'yellow'}}
                        >
                            <input
                                style={{backgroundColor:'red',height:'fit-content'}}
                                type="file"
                                onChange={changeHandler}
                                id="file"
                                name="file"
                                accept=".jpg, .jpeg, .png"
                            />
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 10,
                                span: 16,
                            }}
                        >
                            <Button style={{backgroundColor: '#2b2b49'}} type="primary" htmlType="submit"
                                    disabled={isDisabled}>
                                {!isDisabled ? 'Sign up' : 'Loading...'}
                            </Button>


                        </Form.Item>
                        <p className={classes.signupLink1}>
                            Already have an account?
                            <NavLink to="/login" className={classes.signupLink}> Login here.</NavLink>
                        </p>
                    </Form>

                </div>
            </div>
        </div>

    )
}
