import {Button, Form, Select} from "antd";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getCategory} from "../../../redux/features/categorySlice";


const SecondForm = ({onFinish, initialValues}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories({}));
        console.log("SecondForm initialValues " + JSON.stringify(initialValues));
    }, []);
    const handleCategoryChange = (categoryId) => {
        console.log("id kategorije " + categoryId)
        if (categoryId !== null) {
            dispatch(getCategory({id: categoryId}));
        }
    };
    const {categories} = useSelector((state) => state.categories);
    return (
        <Form
            initialValues={initialValues}
            labelCol={{span: 6}}
            wrapperCol={{span: 14}}
            layout="horizontal"
            onFinish={onFinish}
            style={{maxWidth: 500}}
            onClick={event => event.stopPropagation()}
        >
            <br/>
            <Form.Item wrapperCol={{offset: 2, span: 15}}
                       label="Category"
                       name="category"
                       rules={[
                {required: true, message: 'Category is required.'},
            ]}>
                <Select onChange={handleCategoryChange}>
                    {categories.map(category => (
                        <Select.Option key={category.id} value={category.id}>
                            {category.naziv}
                        </Select.Option>
                    ))}
                </Select>
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

export default SecondForm;