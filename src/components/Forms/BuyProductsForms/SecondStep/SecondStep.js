import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Radio} from 'antd';
import classes from './SecondStep.module.css'
import {buyProductByCash, buyProductByCard} from "../../../../schemas";


const SecondStep = ({onFinish, initialValues}) => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    useEffect(() => {
        console.log('SecondStep initialValues'+JSON.stringify(initialValues));
        if (initialValues.hasOwnProperty("kartica")) {
            setValue(2);
            console.log('U initialValues je kartica');

        } else if (initialValues.hasOwnProperty("adresa")) {
            setValue(1);
            console.log('U initialValues je adresa');

        } else {

        }

    }, []);

    return (
        <div className={classes.container}>
            <h4 style={{textAlign: 'center'}}>Select payment method.</h4>
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Cash on delivery</Radio>
                <Radio value={2}>By credit/debit card</Radio>
            </Radio.Group>
            <div style={{margin: '2%'}}>
                {value === 1 && (
                    <Form
                        initialValues={initialValues}
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        style={{maxWidth: 500}}
                        layout="horizontal"
                        onFinish={onFinish}
                        onClick={event => event.stopPropagation()}
                    >

                        <Form.Item wrapperCol={{offset: 2, span: 15}} label="Address" name="adresa" rules={[
                            {required: true, message: 'Please enter a name.'},
                        ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 18, span: 15}}>
                            <Button style={{width: "fit-content", height: 'fit-content', background: " #2b2b49"}}
                                    type="primary"
                                    htmlType="submit">
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>
                )}


                {value === 2 && (
                    <Form
                        initialValues={initialValues}
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        style={{maxWidth: 500}}
                        layout="horizontal"
                        onFinish={onFinish}
                        onClick={event => event.stopPropagation()}
                    >

                        <Form.Item wrapperCol={{offset: 2, span: 15}} label="Card number" name="kartica" rules={[
                            {required: true, message: 'Please enter a card number.'},
                        ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 18, span: 15}}>
                            <Button style={{width: "fit-content", height: 'fit-content', background: " #2b2b49"}}
                                    type="primary"
                                    htmlType="submit">
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </div>


        </div>
    )
}

export default SecondStep;