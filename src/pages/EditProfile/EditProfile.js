import {Modal} from 'antd';
import React, {useEffect, useState} from "react";
import {editSchema} from "../../schemas";
import {ErrorMessage, Field, Form, Formik} from "formik";
import classes from "../Login/Login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {insertImage} from "../../api/auth.service";
import {updateUser} from "../../redux/features/userSlice";


const EditProfile = ({show, onClose}) => {
    const navigate = useNavigate();
    const {authenticated, user} = useSelector((state) => state.users);
    const [selectedFile, setSelectedFile] = useState("");
    const [temp, setTemp] = useState(null);
    const dispatch = useDispatch();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const [succesMessage, setsuccesMessage] = useState("");

    const onSubmit = async (values, actions) => {

        try {
            console.log("values" + JSON.stringify(values));
            console.log("user " + JSON.stringify(values));
            if (user.ime !== values.ime || user.prezime !== values.prezime || user.email !== values.email ||
                user.grad !== values.grad || temp !== null) {
                console.log("Usla ");
                let responseImage = null;
                if (temp !== null) {
                    const imageData = new FormData();
                    imageData.append("file", selectedFile);
                    responseImage = await insertImage(imageData);
                }
                await new Promise(resolve => setTimeout(resolve, 1500));
                const userDataToUpdate = {
                    ime:values.ime,
                    prezime:values.prezime,
                    grad: values.grad,
                    avatar: temp !==null ? responseImage.data : user.avatar,
                    email:values.email
                };
                await dispatch(updateUser({id:user.id,userDataToUpdate:userDataToUpdate}));
                setTimeout(() => {
                    onClose();
                }, 1000);
            }
        } catch (error) {
            console.log("error");
        }


    }
    const changeHandler = (event) => {

        setSelectedFile(event.target.files[0]);
        console.log("setuj temp");
        setTemp(1);
        console.log("setuj temp" + temp);

    };

    useEffect(() => {


        if (authenticated === false) navigate('/');
    }, [authenticated, navigate]);
    return (<>
        <Modal
            width='30%'
            maskClosable={false}
            title={<div style={{textAlign: 'center', fontSize: '20px', color: '#2b2b49'}}>Edit profile</div>}
            footer={[]}
            open={show}
            onCancel={onClose}
            bodyStyle={{
                maxHeight: '500px', overflow: 'auto', width: '100%',
            }}
        >
            <div>


                <Formik
                    initialValues={{
                        ime: authenticated ? user.ime : '',
                        prezime: authenticated ? user.prezime : '',
                        email: authenticated ? user.email : '',
                        grad: authenticated ? user.grad : '',
                        avatar: authenticated ? user.avatar : '',
                    }}
                    validationSchema={editSchema}
                    onSubmit={onSubmit}
                >
                    {({errors, isSubmitting, touched, handleBlur}) => (

                        <Form className={classes.loginForm}>

                            <label htmlFor="name">First name:</label>
                            <Field
                                type="text"
                                id="ime"
                                name="ime"
                                placeholder='First name'
                                className={errors.ime && touched.ime ? classes.inputError : ""}
                                onBlur={handleBlur}
                            />
                            {touched.ime && errors.ime && (
                                <ErrorMessage name="ime" component="div" className={classes.error}/>)}

                            <label htmlFor="name">Last name:</label>
                            <Field
                                type="text"
                                id="prezime"
                                name="prezime"
                                placeholder='Last name'
                                className={errors.prezime && touched.prezime ? classes.inputError : ""}
                                onBlur={handleBlur}
                            />
                            {touched.prezime && errors.prezime && (
                                <ErrorMessage name="prezime" component="div" className={classes.error}/>)}

                            <label htmlFor="name">Email:</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder='Email'
                                className={errors.email && touched.email ? classes.inputError : ""}
                                onBlur={handleBlur}
                            />
                            {touched.email && errors.email && (
                                <ErrorMessage name="email" component="div" className={classes.error}/>)}

                            <label htmlFor="name">City:</label>
                            <Field
                                type="text"
                                id="grad"
                                name="grad"
                                placeholder='City'

                                className={errors.grad && touched.grad ? classes.inputError : ""}
                                onBlur={handleBlur}
                            />
                            {touched.grad && errors.grad && (
                                <ErrorMessage name="grad" component="div" className={classes.error}/>)}
                            <label htmlFor="avatar">Avatar</label>
                            <Field name="avatar">
                                {({field, form}) => (<div>
                                    <input
                                        style={{marginTop: '-2%'}}
                                        type="file"
                                        id="file"
                                        name="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={changeHandler}
                                    />
                                </div>)}
                            </Field>
                            {showSuccesMessage && (<div className={classes.succes}>
                                {succesMessage}
                            </div>)}
                            {showErrorMessage && (<div className={classes.error}>
                                {errorMessage}
                            </div>)}

                            <div style={{textAlign: "center"}}>
                                <button
                                    style={{width: "fit-content"}}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                            </div>

                        </Form>)}
                </Formik>
            </div>

        </Modal>
    </>);
};
export default EditProfile;