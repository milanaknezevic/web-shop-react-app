import React, {useEffect, useState} from 'react';
import classes from './ViewProduct.module.css'
import {useLocation} from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import {Button, Divider, Form} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useSelector} from "react-redux";


const ViewProduct = () => {
    const location = useLocation();
    const product = location.state && location.state.product;
    const [proizvod, setProizvod] = useState(null);
    const [showInsertCommentar, setShowInsertCommentar] = useState(false);
    const {authenticated, user} = useSelector((state) => state.users);
    useEffect(() => {

        if (authenticated === true) {
            setShowInsertCommentar(true);
        } else {
            setShowInsertCommentar(false);
        }
        console.log("Korisnik je ulogovan " + showInsertCommentar);
    }, [authenticated]);

    useEffect(() => {
        if (product) {
            setProizvod(product)
        }
        console.log("Proizvod " + JSON.stringify(proizvod))

    }, [proizvod]);

    const sliderImages = [{
        url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
    }, {
        url: "https://img.taste.com.au/hWQLNVaJ/w720-h480-cfill-q80/taste/2021/08/clinkers-cake-173208-2.jpg",
    }, {
        url: "https://img.freepik.com/free-photo/celebration-birthday-cake-with-candle-generative-ai_188544-9596.jpg",
    },

    ];

    function handleCLick() {
        console.log("kliknula")
    }

    return (
        <div>
            {proizvod && (
                <div className={classes.container}>
                    <div className={classes.left}>
                        <div className={classes.productInfoContainer}>
                            <h3>
                                {proizvod.naslov}
                            </h3>

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
                                <p className={classes.priceStil}>Price: {proizvod.cijena}KM</p>

                            </div>
                        </div>

                    </div>
                    <div className={classes.right}>
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
                                        rows={4}
                                        style={{
                                            width: "100%",
                                            maxWidth: "300px",
                                            height: '150px',
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
                        <div className={classes.dividerX}>
                            <p>
                                <strong style={{color: 'black'}}>Location:</strong> {proizvod.lokacija}
                            </p>
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Number:</strong> {proizvod.kontakt}
                            </p>
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Product
                                    condition:</strong> {proizvod.stanje ? 'Used' : 'New'}
                            </p>
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Publish date:</strong> {proizvod.datumKreiranja}
                            </p>
                            <Divider style={{color: 'black', borderColor: '#efe9e7'}}
                                     orientation="left">Description</Divider>
                            <p>
                                {proizvod.opis}
                            </p>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewProduct;
