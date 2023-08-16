import {Button, Form, Input, Modal} from 'antd';
import {useDispatch} from "react-redux";
import {createMessage} from "../../redux/features/messageSlice";
import React, {useState} from "react";

const {TextArea} = Input;
const CustomerSupport = ({show, onClose}) => {
    const dispatch = useDispatch();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const [succesMessage, setsuccesMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
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

    return (
        <>
            <Modal maskClosable={false}
                   title={<div style={{textAlign: 'center', fontSize: '20px', color: '#2b2b49'}}>Customer Support</div>}
                   footer={[]} open={show} onCancel={onClose} bodyStyle={{maxHeight: '300px', overflowY: 'auto'}}>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    onFinish={handleFormSubmit}
                    style={{maxWidth: 600}}
                    onClick={event => event.stopPropagation()}
                >

                    {showSuccesMessage && (
                        <p style={{color:"green",fontSize: '0.75rem', textAlign: 'center', fontWeight: 'bold'}}>{succesMessage}</p>
                    )}
                    {showErrorMessage && (
                        <p style={{color:"red",fontSize: '0.75rem', textAlign: 'center', fontWeight: 'bold'}}>{errorMessage}</p>

                    )}
                    <Form.Item label="Message" name="message" rules={[
                        {required: true, message: 'Please enter a message.'},
                        {max: 255, message: 'Message must not exceed 255 characters.'},
                    ]}>
                        <TextArea rows={4} style={{maxHeight: '8em', resize: 'vertical'}}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 14}}>
                        <Button type="primary" style={{backgroundColor: '#2b2b49'}} htmlType="submit"
                                disabled={isDisabled} onClick={handleClick}>
                            Send message
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};
export default CustomerSupport;