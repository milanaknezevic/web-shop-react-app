import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal} from 'antd';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../../redux/features/userSlice";
import classes from "../Login/Login.module.css";

const ChangePassword = ({show, onClose}) => {
    const navigate = useNavigate();
    const {authenticated, user} = useSelector((state) => state.users);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const [succesMessage, setsuccesMessage] = useState("");
    const dispatch = useDispatch();

    const onSubmit = async (values, actions) => {

        console.log("values " + JSON.stringify(values));
        try {


            const changePasswordData = {
                lozinka: values.lozinka,
                newPassword: values.confirmPassword,

            };
            console.log("changePasswordData " + JSON.stringify(changePasswordData));
            const id = user.id;

            const response = await dispatch(changePassword({id, changePasswordData}));

            console.log("response " + JSON.stringify(response));
            if (changePassword.fulfilled.match(response)) {
                setShowSuccesMessage(true);
                setsuccesMessage("Pasword changed successful.");
                setTimeout(() => {
                    setShowSuccesMessage(false);
                    setsuccesMessage("");
                    setIsDisabled(false);
                    onClose();
                }, 1500);

            } else {
                setShowErrorMessage(true);
                setErrorMessage("Password didn't changed. Please try again.");
                setTimeout(() => {
                    setShowErrorMessage(false);
                    setErrorMessage("");
                    setIsDisabled(false);
                }, 1500);
            }
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage("Password didn't changed. Please try again.");
            console.error("showErrorMessage:", showErrorMessage);
            setTimeout(() => {

                setIsDisabled(false);
                setShowErrorMessage(false);
                setErrorMessage("");
            }, 1500);

        }


    }


    useEffect(() => {
        if (authenticated === false) navigate('/');
    }, [authenticated, navigate]);

    return (
        <Modal
            width='35%'
            maskClosable={false}
            title={<div style={{textAlign: 'center', fontSize: '20px', color: '#2b2b49'}}>Change password</div>}
            footer={[]}
            open={show}
            onCancel={onClose}
            bodyStyle={{
                marginTop: "50px",marginBottom: "20px",marginRight: "50px", maxHeight: '270px', overflow: 'auto', width: '100%',
            }}
        >
            <div>
                {showSuccesMessage && (<div className={classes.succes}>
                    {succesMessage}
                </div>)}
                {showErrorMessage && (<div className={classes.error}>
                    {errorMessage}
                </div>)}

                <Form name="basic"
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
                        name="confirmPassword"
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
                </Form>
            </div>

        </Modal>
    );
};

export default ChangePassword;
