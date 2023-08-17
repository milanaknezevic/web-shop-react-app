import React, {useState} from 'react';
import {Card} from 'antd';
import classes from './Card.module.css';
import {FaTrash} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getProductByID} from "../../redux/features/productSlice";
import {Link, useNavigate} from "react-router-dom";

const {Meta} = Card;

const CardComponent = ({product, onSave}) => {
    const {user} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const handleDeleteProduct = async () => {
        if (product) {
            console.log("id proizvoda za brisanje " + product.id);
            const response = await dispatch(deleteProduct({id: product.id}));
            console.log("repsonse " + JSON.stringify(response));
            onSave();
        }
    }

    const productPath = `/${product.id}`;

    const handleCardClick = () => {
        setSelectedProduct(product);
        console.log("kliknula sam " + JSON.stringify(product));
        //dispatch(getProductByID({id:product.id}));
        //navigate("/view");

    };


    return (
        <div>

            {product.slikas.length > 0 && (
                <Link className={classes.cardLink} to={productPath} >
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
                        <div>
                            <Meta title={product.naslov}/>
                            <div className={classes.priceContainer}>
                                {(user && product.prodavac.id === user.id && product.kupac.id !== user.id) && (
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