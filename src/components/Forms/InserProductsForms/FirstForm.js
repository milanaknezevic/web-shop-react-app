import React, {useEffect, useState} from "react";
import {Button, Form, Input, InputNumber, Radio} from "antd";
import TextArea from "antd/es/input/TextArea";

const FirstForm = ({onFinish, initialValues}) => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    useEffect(() => {
        console.log("FirstForm initialValues " + JSON.stringify(initialValues));
    }, []);
    return (
        <Form
            initialValues={initialValues}
            labelCol={{span: 6}}
            wrapperCol={{span: 14}}
            style={{maxWidth: 600}}
            layout="horizontal"
            onFinish={onFinish}
            onClick={event => event.stopPropagation()}
        >
            <br/>
            <Form.Item wrapperCol={{offset: 2, span: 15}} label="Name" name="naslov" rules={[
                {required: true, message: 'Please enter a name.'},
            ]}>
                <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 2, span: 15}} label="Price" name="cijena" rules={[
                {required: true, message: 'Please enter a price.'},
            ]}>
                <InputNumber min={0.1}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 2, span: 15}} label="Condition" name="stanje" rules={[
                {required: true, message: 'Please choose condition.'},
            ]}>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>New</Radio>
                    <Radio value={2}>Used</Radio>

                </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 2, span: 15}} label="City" name="grad" rules={[
                {required: true, message: 'Please enter a city.'},
            ]}>
                <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 2, span: 15}} label="Contact" name="kontakt" rules={[
                {required: true, message: 'Please enter a contact number.'},
                {
                    pattern: /^(\+\d{1,3})?[\s.-]?\(?\d{3}\)?[\s./]?\d{3}[\s.-]?\d{3}$/,
                    message: 'Please enter a valid phone number.'
                }
            ]}>
                <Input placeholder="+0 065/123-456"/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 2, span: 15}} label="Description" name="opis" rules={[
                {required: true, message: 'Please enter a description.'},
                {max: 255, message: 'Description must not exceed 255 characters.'},
            ]}>
                <TextArea rows={2}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 18, span: 15}}>
                <Button style={{width: "fit-content", height: 'fit-content', background: " #2b2b49"}} type="primary"
                        htmlType="submit">
                    Continue
                </Button>
            </Form.Item>

        </Form>
    )
}
export default FirstForm;