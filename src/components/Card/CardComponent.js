import React, { useEffect } from 'react';
import { Card } from 'antd';
import classes from './Card.module.css';

const { Meta } = Card;

const CardComponent = ({ product }) => {

    return (
        <div>
            {product.slikas.length > 0 && ( // Proveravamo da li postoji barem jedna slika
                <Card
                    hoverable
                    className={classes.card}
                    cover={
                        <div className={classes.imageContainer}>
                            <img
                                alt="example"
                                src={product.slikas[0].slikaProizvoda}
                                className={classes.image}
                            />
                        </div>
                    }
                >
                    <div >
                        <Meta title={product.naslov} />
                        <div className={classes.priceContainer}>
                            <span className={classes.price}>{product.cijena} KM</span>
                        </div>
                    </div>
                </Card>


            )}
        </div>
    );
};

export default CardComponent;
