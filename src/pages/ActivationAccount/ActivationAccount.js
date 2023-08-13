import classes from './ActivationAccount.module.css';
import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from 'antd';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {activateAccount} from "../../api/auth.service";


export default function ActivationAccount() {

    const [isDisabled, setIsDisabled] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const [succesMessage, setsuccesMessage] = useState("");
    const [contentHeight, setContentHeight] = useState('calc(100vh - 65px)');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {authenticated} = useSelector((state) => state.users);

    useEffect(() => {
        console.log("auth " + authenticated);
        if (authenticated)
            navigate('/');
    }, [authenticated, navigate, dispatch]);


    const onSubmit = async (registerData) => {
        const activationData = {
            code: registerData.code,
            korisnickoIme: username

        };
        console.log(activationData);
        setIsDisabled(true);
        try {
            const response = await activateAccount(activationData);
            console.log("response " + response.status);
            if (response.status === 200 || response.status === 201) {
                setShowSuccesMessage(true);
                setsuccesMessage("bravoooo");
                setTimeout(() => {
                    setShowSuccesMessage(false);
                    setsuccesMessage("");
                    setIsDisabled(false);
                }, 1500);
            } else {
                setShowErrorMessage(true);
                setErrorMessage("Account successfully activated!");
                setTimeout(() => {
                    setShowErrorMessage(false);
                    setErrorMessage("");
                    setIsDisabled(false);
                }, 1500);
            }
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage("Account activation failed. Please try again.");
            console.error("showErrorMessage:", showErrorMessage);
            setTimeout(() => {
                //navigate("/activate", {state: {username: registerData.korisnickoIme}});
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
    const location = useLocation();
    const username = location.state && location.state.username;

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

                        <p className={classes.formTitle1}>Activate account</p>
                        {showSuccesMessage && (
                            <p className={classes.succes}>{succesMessage}</p>
                        )}
                        {showErrorMessage && (
                            <p className={classes.succes}>{errorMessage}</p>
                        )}
                        <Form.Item
                            label="Activation code"
                            name="code"


                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your code!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 10,
                                span: 16,
                            }}
                        >
                            <Button style={{backgroundColor: '#2b2b49'}} type="primary" htmlType="submit"
                                    disabled={isDisabled}>
                                {!isDisabled ? 'Submit' : 'Loading...'}
                            </Button>


                        </Form.Item>
                        <p className={classes.signupLink1}>
                            Activation code not received?
                            <NavLink to="/register" className={classes.signupLink}> Try again.</NavLink>
                        </p>
                    </Form>

                </div>
            </div>
        </div>

    )
}
