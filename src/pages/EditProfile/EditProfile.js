import {Button, Form, Input, Modal} from 'antd';
import {useDispatch} from "react-redux";
import {createMessage} from "../../redux/features/messageSlice";
import React, {useState} from "react";
import {ErrorMessage, Field, Formik} from "formik";
import {editSchema} from "../../schemas";
import {NavLink} from "react-router-dom";
import classes from './EditProfile.module.css';

const {TextArea} = Input;
const EditProfile = ({show, onClose}) => {
    const dispatch = useDispatch();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const [succesMessage, setsuccesMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");

    const handleClick = (e) => {
        e.stopPropagation();
    };


    const handleFormSubmit = async (values) => {
        setIsDisabled(true)
        const messageRequest = {
            sadrzaj: values.message,
        };
        const response = await dispatch(createMessage({messageData: messageRequest}));
        console.log("repsonse " + response);
        console.log("repsonse " + JSON.stringify(response));
        if (createMessage.fulfilled.match(response)) {
            console.log("bravo: ",);
            setShowSuccesMessage(true);
            setsuccesMessage("Message sent successfully.");
            setTimeout(() => {
                setShowSuccesMessage(false);
                setsuccesMessage("");
                setIsDisabled(false);
                onClose();
            }, 1500);
        } else {
            console.log("Akcija nije uspešno završena:", response.error);
            setShowErrorMessage(true);
            setErrorMessage("Message delivery failed.");
            setTimeout(() => {
                setShowErrorMessage(false);
                setErrorMessage("");
                setIsDisabled(false);
                onClose();
            }, 1500);
        }


    };

    const changeHandler = (event) => {

        setSelectedFile(event.target.files[0]);

    };


    return (
        <>
            <Modal
                width='30%'
                maskClosable={false}
                title={<div style={{textAlign: 'center', fontSize: '20px', color: '#2b2b49'}}>Edit profile</div>}
                footer={[]}
                open={show}
                onCancel={onClose}
                bodyStyle={{
                    maxHeight: '410px',
                    overflow: 'auto',
                    width: '100%',
                }}
            >
                <div>
                    <Formik
                        initialValues={{
                            ime: "",
                            prezime: "",
                            korisnickoIme: "",
                            lozinka: "",
                            confirmPassword: "",
                            email: "",
                            grad: ""
                        }}
                        validationSchema={editSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({errors, isSubmitting, touched, handleBlur}) => (
                            <Form className={classes.loginForm}>
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


                                <label htmlFor="avatar">Avatar</label>
                                <Field name="avatar">
                                    {({field, form}) => (
                                        <div>
                                            <input
                                                style={{marginTop: '-2%'}}
                                                type="file"
                                                id="avatar"
                                                name="avatar"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    )}
                                </Field>

                                <div style={{textAlign: "center"}}>
                                    <button style={{width: "fit-content"}} type="submit">Submit</button>
                                </div>


                            </Form>

                        )}
                    </Formik>
                </div>

            </Modal>
        </>
    );
};
export default EditProfile;