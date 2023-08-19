import React, {useState} from 'react';
import {MinusCircleTwoTone, PlusOutlined} from '@ant-design/icons';
import {Button, Form} from 'antd';

const FourthForm = ({onFinish}) => {


    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (index, event) => {
        const newImages = [...selectedImages];
        newImages[index] = event.target.files[0];
        setSelectedImages(newImages);
        console.log("u funkciji handleImageChange " + newImages);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };
    const handleSubmit = (values) => {
        console.log("u funkciji submit sam " + selectedImages);

        onFinish({...values, images: selectedImages});
    };

    return (
        <Form
            onFinish={handleSubmit}
            style={{
                maxWidth: 600,
            }}
            autoComplete="off"
        >
            <br/>
            <Form.List name="image"
                       rules={[
                           {
                               required: true,
                               message: 'Please insert an image',
                           },
                       ]}
            >
                {(fields, {add, remove}) => (
                    <>
                        <Form.Item>
                            <Button onClick={() => add()} block icon={<PlusOutlined/>}>
                                Add image
                            </Button>
                        </Form.Item>
                        {fields.map(({key, name, ...restField}, index) => (

                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'image']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please insert an image',
                                        },
                                    ]}
                                    style={{margin: '0'}}>
                                    <input
                                        type="file"
                                        id={`file_${index}`}
                                        name={`file_${index}`}
                                        accept=".jpg, .jpeg, .png"
                                        onChange={(event) => handleImageChange(index, event)}
                                    />
                                </Form.Item>

                                <MinusCircleTwoTone
                                    style={{marginLeft: '8px'}}
                                    onClick={() => {
                                        remove(name);
                                        handleRemoveImage(index);
                                    }}
                                />
                            </div>

                        ))}

                    </>
                )}
            </Form.List>
            <Form.Item wrapperCol={{offset: 18, span: 15}}>
                <Button
                    style={{width: "fit-content", height: 'fit-content', background: " #2b2b49"}}
                    type="primary"
                    htmlType="submit"
                >
                    Continue
                </Button>
            </Form.Item>
        </Form>
    );
}
export default FourthForm;