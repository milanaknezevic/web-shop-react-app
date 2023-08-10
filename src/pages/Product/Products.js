import React, {useState} from 'react';
import {Pagination} from 'antd';
import CardComponent from "../../components/Card/CardComponent";
import classes from './Product.module.css'
const Product = () => {
    const [current, setCurrent] = useState(1);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
    return (
        <div style={{minHeight:"500px"}}>
            <div className={classes.cardContainer}>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>

            </div>
            <Pagination className={classes.paginacija} current={current} onChange={onChange} total={50}/>
        </div>
    );
};
export default Product;