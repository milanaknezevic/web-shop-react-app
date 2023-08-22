import React, {useEffect} from 'react';
import {Card} from 'antd';
import classes from './Card.module.css';
import {FaTrash} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct} from "../../redux/features/productSlice";
import {Link} from "react-router-dom";

const {Meta} = Card;

const CardComponent = ({product, handleSaveObrisi}) => {
    const {user} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const productPath = `/${product.id}`;

    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        console.log("wtfffff");
        if (product) {
            console.log("id proizvoda za brisanje " + product.id);
            const response = await dispatch(deleteProduct({id: product.id}));
            console.log("repsonse " + JSON.stringify(response));
            handleSaveObrisi();
        }
    }
    return (
        <div>
            {product && product.slikas.length > 0 && (
                <Link to={productPath}>
                    <Card
                        hoverable
                        className={classes.card}
                        cover={
                            <div className={classes.imageContainer}>
                                <img
                                    alt="example"
                                    src={require("../../assets/products/" + product.slikas[0].slikaProizvoda)}
                                    className={classes.image}
                                />
                            </div>
                        }
                    >
                        <div>
                            <Meta title={product.naslov}/>
                            <div className={classes.priceContainer}>
                                {(user && product && product.prodavac.id === user.id) && (
                                    <button className={classes.deleteDugme} onClick={handleDeleteProduct}>
                                        <FaTrash size={'15px'}/>
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <span className={classes.price}>{product.cijena} KM</span>
                        </div>

                    </Card>
                </Link>


            )}
        </div>
    );
};

export default CardComponent;