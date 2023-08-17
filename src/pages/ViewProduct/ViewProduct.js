import React, {useEffect, useRef, useState} from 'react';
import classes from './ViewProduct.module.css'
import {useParams} from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import {Button, Divider, Form} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {List, Avatar, Typography} from 'antd';
import {getProductByID} from "../../redux/features/productSlice";
import {sendQuestion,sendAnswer} from "../../redux/features/productSlice";

const {Text} = Typography;


const ViewProduct = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const {id} = useParams();
    const dispatch = useDispatch();
    const {oneProduct} = useSelector((state) => state.products);
    const [showInsertCommentar, setShowInsertCommentar] = useState(false);
    const {authenticated, user} = useSelector((state) => state.users);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const [succesMessage, setsuccesMessage] = useState("");
    const formRef = useRef(null);
    const formRefReply = useRef(null);


    useEffect(() => {

        if (authenticated === true) {
            setShowInsertCommentar(true);

        } else {
            setShowInsertCommentar(false);
        }
        console.log("Korisnik je ulogovan " + showInsertCommentar);
    }, [authenticated]);

    useEffect(() => {
        dispatch(getProductByID({id: id}));
    }, [refreshKey]);
    /* useEffect(() => {
         dispatch(getProductByID({id: id}));
     }, [refreshKey]);
 */
    // const sliderImages = oneProduct.slikas.map((slika) => ({
    //     url: slika.slikaProizvoda
    // }));

    const handleClick = (e) => {
        e.stopPropagation();
    };
    const handleClickReply = (e) => {
        e.stopPropagation();
    };
    const handleFormReply=async (values)=>{
        console.log("values " + JSON.stringify(values));

        try {
            console.log("values " + JSON.stringify(values));

            const answerData = {
                odgovor: values.replyComm,
            };
            console.log("questionData " + JSON.stringify(answerData) + " id " + oneProduct.id);
            const response = await dispatch(sendAnswer({id: oneProduct.id, answerData: answerData}));
            console.log("response " + JSON.stringify(response));
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage("Reply on comment failed.");
            setTimeout(() => {
                setShowErrorMessage(false);
                setErrorMessage("");
                setIsDisabled(false);

            }, 1500);
            console.log("error" + error);
        } finally {
            setRefreshKey((prevKey) => prevKey + 1);
        }
    }
    const handleFormSubmit = async (values) => {
        try {
            console.log("values " + JSON.stringify(values));
            //setIsDisabled(true)
            const questionData = {
                pitanje: values.message,
            };
            console.log("questionData " + JSON.stringify(questionData) + " id " + oneProduct.id);
            const response = await dispatch(sendQuestion({id: oneProduct.id, questionData: questionData}));
            console.log("response " + JSON.stringify(response));
            if (sendQuestion.fulfilled.match(response)) {

                setShowSuccesMessage(true);
                setsuccesMessage("Comment sent successfully.");
                setTimeout(() => {
                    setShowSuccesMessage(false);
                    setsuccesMessage("");
                    setIsDisabled(false);
                    formRef.current.resetFields();

                }, 1500);
            } else {

                setShowErrorMessage(true);
                setErrorMessage("Comment delivery failed.");
                setTimeout(() => {
                    setShowErrorMessage(false);
                    setErrorMessage("");
                    setIsDisabled(false);

                }, 1500);
            }
        } catch (error) {
            console.log("error" + error);
        } finally {
            setRefreshKey((prevKey) => prevKey + 1);
        }


    };

    return (
        <div>
            {oneProduct && (

                <div className={classes.container}>
                    <div className={classes.left}>
                        <div className={classes.productInfoContainer}>
                            <h1>
                                {oneProduct.naslov}
                            </h1>

                        </div>
                        <div className={classes.kontejner}>
                            <div className={classes.imageSliderContainer}>
                                <SimpleImageSlider
                                    width="30%"
                                    height={300}
                                    images={oneProduct.slikas.map((slika) => ({
                                        url: slika.slikaProizvoda
                                    }))}
                                    showNavs={true}
                                    showBullets
                                />
                                <p className={classes.priceStil}>Price: {oneProduct.cijena}KM</p>


                            </div>
                        </div>
                        <div className={classes.productInfoContainer}>
                            <button style={{width: "fit-content"}}>Buy</button>

                        </div>
                        <div>
                            <h2>All comments</h2>
                            <div >

                                <List>
                                    {oneProduct.komentars.length === 0 ? (
                                        <p>No comments currently.</p>
                                    ) : (
                                        oneProduct.komentars.map((komentar, index) => (
                                            <div style={{background: 'white'}}>
                                                <List.Item key={index}>
                                                    <List.Item.Meta
                                                        avatar={<Avatar
                                                            src={require("../../assets/" + komentar.korisnik_komentar.avatar)}
                                                            alt="Image"/>}
                                                        title={<Text
                                                            strong>{komentar.korisnik_komentar.korisnickoIme}</Text>}
                                                        description={komentar.pitanje}
                                                    />
                                                </List.Item>
                                                {komentar.odgovor !== null &&
                                                    (
                                                        <p><strong
                                                            style={{color: 'green'}}>Answer:</strong> {komentar.odgovor}</p>
                                                    )}
                                                {showInsertCommentar && user.id === komentar.korisnik_komentar.id && komentar.odgovor === null &&
                                                    (<div className={classes.sendReply}>
                                                            <Form
                                                                ref={formRefReply}
                                                                style={{width: '100%'}}
                                                                layout="horizontal"
                                                                onFinish={handleFormReply}
                                                                onClick={event => event.stopPropagation()}>
                                                                {showErrorMessage && (
                                                                    <p style={{
                                                                        color: "darkred",
                                                                        fontSize: '0.75rem',
                                                                        textAlign: 'center',
                                                                        fontWeight: 'bold'
                                                                    }}>{errorMessage}</p>

                                                                )}

                                                                <Form.Item name="replyComm" rules={[{
                                                                    required: true,
                                                                    message: 'Please enter a reply.'
                                                                }, {
                                                                    max: 255,
                                                                    message: 'Message must not exceed 255 characters.'
                                                                },]}>
                                                                    <TextArea
                                                                        rows={2}
                                                                        style={{
                                                                            width: "100%",
                                                                            maxWidth: "400px",
                                                                            resize: 'vertical',
                                                                        }}
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item>
                                                                    <Button type="primary" style={{
                                                                        backgroundColor: '#2b2b49',
                                                                        width: 'fit-content'
                                                                    }} htmlType="submit"
                                                                            disabled={isDisabled}
                                                                            onClick={handleClickReply}>
                                                                        Reply
                                                                    </Button>
                                                                </Form.Item>

                                                            </Form>
                                                        </div>
                                                    )
                                                }

                                                <hr style={{borderColor: '#9caf88'}}/>
                                            </div>
                                        ))
                                    )}

                                </List>
                            </div>
                        </div>

                    </div>
                    <div className={classes.right}>
                        {showInsertCommentar && oneProduct.prodavac.id !== user.id && (
                            <div className={classes.insertKomentar}>
                                <label style={{color: 'black'}}>Add a new comment</label>
                                <Form
                                    ref={formRef}
                                    style={{width: '100%'}}
                                    layout="horizontal"
                                    onFinish={handleFormSubmit}
                                    onClick={event => event.stopPropagation()}
                                >
                                    {showSuccesMessage && (
                                        <p style={{
                                            color: "darkgreen",
                                            fontSize: '0.75rem',
                                            textAlign: 'center',
                                            fontWeight: 'bold'
                                        }}>{succesMessage}</p>
                                    )}
                                    {showErrorMessage && (
                                        <p style={{
                                            color: "darkred",
                                            fontSize: '0.75rem',
                                            textAlign: 'center',
                                            fontWeight: 'bold'
                                        }}>{errorMessage}</p>

                                    )}
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
                                                disabled={isDisabled} onClick={handleClick}>
                                            Send
                                        </Button>
                                    </Form.Item>


                                </Form>

                            </div>
                        )}
                        <div className={classes.dividerX}>
                            <p>
                                <strong style={{color: 'black'}}>Location:</strong> {oneProduct.lokacija}
                            </p>
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Number:</strong> {oneProduct.kontakt}
                            </p>
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Product
                                    condition:</strong> {oneProduct.stanje ? 'Used' : 'New'}
                            </p>
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Publish date:</strong>{" "}
                                {new Date(oneProduct.datumKreiranja).toLocaleString()}
                            </p>
                            <Divider style={{color: 'black', borderColor: '#efe9e7'}}
                                     orientation="left">Description</Divider>
                            <p>
                                {oneProduct.opis}
                            </p>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewProduct;
