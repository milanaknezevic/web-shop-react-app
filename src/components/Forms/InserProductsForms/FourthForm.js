import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

const FourthForm = ({ onFinish }) => {
    const [images, setImages] = useState([null]);

    const handleAddImage = () => {
        setImages([...images, null]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const updatedImages = [...images];
            updatedImages[index] = file;
            setImages(updatedImages);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const imageFiles = images.filter(image => image instanceof File);
        // Now you have an array of File objects (imageFiles)
        // You can use this array for further processing or sending to a server
        onFinish(imageFiles);
    };

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={handleSubmit}
            style={{ maxWidth: 500 }}
            onClick={(event) => event.stopPropagation()}
        >
            {images.map((image, index) => (
                <Form.Item key={index}>
                    <input
                        style={{ marginTop: '-2%' }}
                        type="file"
                        onChange={(e) => handleImageChange(e, index)}
                        id={`file-${index}`}
                        name={`file-${index}`}
                        accept=".jpg, .jpeg, .png"
                        multiple
                        required={true}
                    />
                    {index > 0 && (
                        <MinusCircleOutlined onClick={() => handleRemoveImage(index)} />
                    )}
                </Form.Item>
            ))}
            <Form.Item wrapperCol={{ offset: 18, span: 15 }}>
                <Button
                    style={{ width: "fit-content", height: 'fit-content', background: " #2b2b49" }}
                    type="primary"
                    htmlType="submit"
                >
                    Continue
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FourthForm;
