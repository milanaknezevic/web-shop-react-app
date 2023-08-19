import React from 'react';
import classes from './Product.module.css'
import CardComponent from "../../components/Card/CardComponent";

const Product = ({products,onSave}) => {


    return (
        <div style={{minHeight: "500px"}}>
            <div className={classes.cardContainer}>
                {products && products.content
                    .map(product => (
                        <div className={classes.productCard} key={product.id}>
                            <CardComponent product={product} onSave={onSave}/>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default Product;