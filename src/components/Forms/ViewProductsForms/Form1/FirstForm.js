import React from 'react';
import {Button, Form} from "antd";
import TextArea from "antd/es/input/TextArea";


const FirstForm = ({ idKomentara,isDisabled,handleClickReply, formRefReply,handleFormReply,showErrorMessage,errorMessage}) => {


    return (
        <div>

            <Form
                ref={formRefReply}
                style={{width: '100%'}}
                layout="horizontal"
                onFinish={(values) => handleFormReply(values, idKomentara)}
                onClick={event => event.stopPropagation()}>
                {showErrorMessage && (
                    <p style={{
                        color: "darkred",
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>{errorMessage}</p>

                )}

                <Form.Item name="replyComm" rules={[{
                    required: true,
                    message: 'Please enter a reply.'
                }, {
                    max: 255,
                    message: 'Message must not exceed 255 characters.'
                },]}>
                    <TextArea
                        rows={2}
                        style={{
                            width: "100%",
                            maxWidth: "400px",
                            resize: 'vertical',
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{
                        backgroundColor: '#2b2b49',
                        width: 'fit-content'
                    }} htmlType="submit"
                            disabled={isDisabled}
                            onClick={handleClickReply}>
                        Reply
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}

export default FirstForm;