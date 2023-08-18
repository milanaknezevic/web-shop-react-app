import React from 'react';
import {Button, Form} from "antd";
import TextArea from "antd/es/input/TextArea";


const SecondForm = ({formRef,handleFormSubmit,isDisabled,handleClick,
                    succesMessage,showSuccesMessage,showErrorMessage,errorMessage
}) => {


    return (
        <div style={{width:'100%'}}>
            <Form
                ref={formRef}
                style={{width: '100%'}}
                layout="horizontal"
                onFinish={handleFormSubmit}
                onClick={event => event.stopPropagation()}
            >
                {showSuccesMessage && (
                    <p style={{
                        color: "darkgreen",
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>{succesMessage}</p>
                )}
                {showErrorMessage && (
                    <p style={{
                        color: "darkred",
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>{errorMessage}</p>

                )}
                <Form.Item
                    name="message"
                    rules={[
                        {required: true, message: 'Please enter a message.'},
                        {max: 1024, message: 'Message must not exceed 1024 characters.'},
                    ]}
                >
                    <TextArea
                        rows={7}
                        style={{
                            width: "100%",
                            maxWidth: "400px",

                            resize: 'vertical',
                            marginLeft: '8%'
                        }}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 14}}>
                    <Button type="primary" style={{backgroundColor: '#2b2b49'}} htmlType="submit"
                            disabled={isDisabled} onClick={handleClick}>
                        Send
                    </Button>
                </Form.Item>


            </Form>

        </div>
    )
}

export default SecondForm;