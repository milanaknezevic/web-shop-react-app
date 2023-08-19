import React from "react";
import classes from './FirstStep.module.css'

const FirstStep = ({onFinish, product}) => {

    return (
        <div className={classes.container}>

            <div className={classes.left}>

                <div className={classes.imageContainer}>
                    <img
                        alt="example"
                        src={require("../../../../assets/products/" + product.slikas[0].slikaProizvoda)}
                        className={classes.image}
                    />
                </div>

            </div>
            <div className={classes.right}>

                <p><strong>Name: </strong>{product.naslov}</p>
                <p><strong>Price: </strong>{product.cijena}KM</p>
                <p><strong>Product condition: </strong> {product.stanje ? 'Used' : 'New'}</p>
                <button className={classes.dugmeKupi} onClick={onFinish}>Continue</button>
            </div>

        </div>
    )
}

export default FirstStep;