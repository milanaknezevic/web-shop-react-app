import React, { useEffect, useState } from "react";
import {Button, Form, Input, InputNumber} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../../redux/features/categorySlice";

const ThirdForm = ({ onFinish, categoryId, initialValues }) => {
    const dispatch = useDispatch();

    const {oneCategory} = useSelector((state) => state.categories);
    useEffect(() => {
        console.log("categoryId " + categoryId)
        if(categoryId !== null) {
           // dispatch(getCategory({id: categoryId}));
        }
    }, [categoryId]);

    return (
        <Form
            initialValues={initialValues}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onFinish}
            style={{ maxWidth: 600,marginTop:'10%' }}
            onClick={(event) => event.stopPropagation()}
        >
            {oneCategory !== null && oneCategory.atribut.map((a) => (
                <Form.Item
                    wrapperCol={{offset: 2, span: 15}}
                    label={`${a.naziv}`}
                    name={`${a.id}`}
                    rules={[{ required: true, message: "Please enter attribute value." }]}
                >
                    {(a.tip === 'INT' || a.tip === 'DOUBLE') && <InputNumber min={1} />}
                    {a.tip === 'STRING' && <Input/>}
                </Form.Item>
            ))}
            <Form.Item wrapperCol={{offset: 18, span: 15}}>
                <Button style={{width: "fit-content", height: 'fit-content', background: " #2b2b49"}} type="primary"
                        htmlType="submit">
                    Continue
                </Button>
            </Form.Item>

        </Form>
    );
};

export default ThirdForm;