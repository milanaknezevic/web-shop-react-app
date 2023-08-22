import React from 'react';
import classes from './Product.module.css'
import CardComponent from "../../components/Card/CardComponent";

const Product = ({products,handleSaveObrisi}) => {


    return (
        <div style={{minHeight: "500px"}}>
            <div className={classes.cardContainer}>
                {products && products.content && products.content
                    .map(product => (
                        <div className={classes.productCard} key={product.id}>
                            <CardComponent product={product} handleSaveObrisi={handleSaveObrisi}/>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default Product;