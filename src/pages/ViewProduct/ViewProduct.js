import React, {useEffect, useState} from 'react';
import classes from './ViewProduct.module.css'
import {useLocation, useParams} from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import {Button, Divider, Form} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {List, Avatar, Typography} from 'antd';
import {getProductByID} from "../../redux/features/productSlice";

const {Text} = Typography;


const ViewProduct = () => {

    const { id } = useParams();
    const dispatch=useDispatch();
    //const {oneProduct} = useSelector((state)=>state.products);
    const [showInsertCommentar, setShowInsertCommentar] = useState(false);
    const {authenticated, user} = useSelector((state) => state.users);
    let product=null;
    let sliderImages = null;

    useEffect(() => {

        if (authenticated === true) {
            setShowInsertCommentar(true);
        } else {
            setShowInsertCommentar(false);
        }
        console.log("Korisnik je ulogovan " + showInsertCommentar);
    }, [authenticated]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("id koji sam uzela iz params " + id);
            try {
                const response = await dispatch(getProductByID({ id: id }));
                product=response.payload;
                console.log("proizvod"+ JSON.stringify(product));

                if (product !== null) {

                    sliderImages = product.slikas.map((slika) => ({
                        url: slika.slikaProizvoda
                    }));
                    console.log("sliderImages"+ JSON.stringify(sliderImages));

                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [product]);





    function handleCLick() {
        console.log("kliknula")
    }

    return (
        <div>
            {product && (

                <div className={classes.container}>
                    <div className={classes.left}>
                        <div className={classes.productInfoContainer}>
                            <h1>
                                {product.naslov}
                            </h1>

                        </div>
                        <div className={classes.kontejner}>
                            <div className={classes.imageSliderContainer}>
                                <SimpleImageSlider

                                    width="30%"
                                    height={300}
                                    images={sliderImages}
                                    showNavs={true}
                                    showBullets
                                />
                                <p className={classes.priceStil}>Price: {product.cijena}KM</p>


                            </div>
                        </div>
                        <div className={classes.productInfoContainer}>
                            <button style={{width:"fit-content"}}>Buy</button>

                        </div>
                        <div>
                            <h2>All comments</h2>
                            <div style={{background: 'white'}}>


                                <List>
                                    {product.komentars.map((komentar, index) => (
                                        <div>
                                            <List.Item key={index}>
                                                <List.Item.Meta
                                                    avatar={<Avatar
                                                        src={require("../../assets/" +komentar.korisnik_komentar.avatar)}
                                                        alt="John Doe"/>}
                                                    title={<Text
                                                        strong>{komentar.korisnik_komentar.korisnickoIme}</Text>}
                                                    description={komentar.pitanje}
                                                />
                                            </List.Item>
                                            <p><strong style={{color: 'green'}}>Answer:</strong> {komentar.odgovor}</p>
                                            <hr style={{borderColor: '#9caf88'}}/>
                                        </div>
                                    ))}

                                </List>
                            </div>
                        </div>

                    </div>
                    <div className={classes.right}>
                        {showInsertCommentar && (
                            <div className={classes.insertKomentar}>
                                <label>Add a new comment</label>
                                <Form
                                    style={{width: '100%'}}
                                    layout="horizontal"
                                    onClick={event => event.stopPropagation()}
                                >

                                    <Form.Item
                                        name="message"
                                        rules={[
                                            {required: true, message: 'Please enter a message.'},
                                            {max: 1024, message: 'Message must not exceed 1024 characters.'},
                                        ]}
                                    >
                                        <TextArea
                                            rows={7}
                                            style={{
                                                width: "100%",
                                                maxWidth: "400px",

                                                resize: 'vertical',
                                                marginLeft: '8%'
                                            }}
                                        />
                                    </Form.Item>

                                    <Form.Item wrapperCol={{offset: 8, span: 14}}>
                                        <Button type="primary" style={{backgroundColor: '#2b2b49'}} htmlType="submit"
                                                onClick={handleCLick}>
                                            Send
                                        </Button>
                                    </Form.Item>


                                </Form>

                            </div>
                        )}
                        <div className={classes.dividerX}>
                            <p>
                                <strong style={{color: 'black'}}>Location:</strong> {product.lokacija}
                            </p>
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Number:</strong> {product.kontakt}
                            </p>
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Product
                                    condition:</strong> {product.stanje ? 'Used' : 'New'}
                            </p>
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Publish date:</strong> {product.datumKreiranja}
                            </p>
                            <Divider style={{color: 'black', borderColor: '#efe9e7'}}
                                     orientation="left">Description</Divider>
                            <p>
                                {product.opis}
                            </p>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewProduct;
