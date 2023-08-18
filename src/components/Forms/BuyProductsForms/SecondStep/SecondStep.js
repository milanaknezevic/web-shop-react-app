import React, {useState} from 'react';
import {Radio} from 'antd';
import classes from './SecondStep.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {buyProductByCash,buyProductByCard} from "../../../../schemas";


const SecondStep = ({onFinish}) => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className={classes.container}>
            <h4 style={{textAlign: 'center'}}>Select payment method.</h4>
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Cash on delivery</Radio>
                <Radio value={2}>By credit/debit card</Radio>
            </Radio.Group>
            <div style={{ margin: '2%'}}>
                { value===1 && (
                    <Formik
                        initialValues={{
                            adresa: ""
                        }}
                        validationSchema={buyProductByCash}
                        onSubmit={onFinish}
                    >
                        {({errors, isSubmitting, touched, handleBlur}) => (

                            <Form>

                                <label htmlFor="name">Address:</label>
                                <Field
                                    type="text"
                                    id="adresa"
                                    name="adresa"
                                    placeholder='Address'
                                    className={errors.adresa && touched.adresa ? classes.inputError : ""}
                                    onBlur={handleBlur}
                                />
                                {touched.adresa && errors.adresa && (
                                    <ErrorMessage name="adresa" component="div" className={classes.error}/>)}


                                <div style={{textAlign: "center"}}>
                                    <button
                                        style={{width: "fit-content",height:'fit-content'}}
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Continue
                                    </button>
                                </div>

                            </Form>)}
                    </Formik>
                ) }
                { value===2 && (
                    <Formik
                        initialValues={{
                            kartica:""
                        }}
                        validationSchema={buyProductByCard}
                        onSubmit={onFinish}
                    >
                        {({errors, isSubmitting, touched, handleBlur}) => (

                            <Form>

                                <label htmlFor="name">Card numbers:</label>
                                <Field
                                    type="text"
                                    id="kartica"
                                    name="kartica"
                                    placeholder='Card numbers'
                                    className={errors.kartica && touched.kartica ? classes.inputError : ""}
                                    onBlur={handleBlur}
                                />
                                {touched.kartica && errors.kartica && (
                                    <ErrorMessage name="kartica" component="div" className={classes.error}/>)}


                                <div style={{textAlign: "center"}}>
                                    <button
                                        style={{width: "fit-content",height:'fit-content'}}
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Continue
                                    </button>
                                </div>

                            </Form>)}
                    </Formik>
                ) }
            </div>


        </div>
    )
}

export default SecondStep;