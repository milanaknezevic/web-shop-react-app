import React, {useEffect, useRef, useState} from 'react';
import classes from './ViewProduct.module.css'
import {useParams} from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import {Avatar, Divider, List, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getProductByID, sendAnswer, sendQuestion} from "../../redux/features/productSlice";
import BuyProduct from "../BuyProduct/BuyProduct";
import FirstForm from "../../components/Forms/ViewProductsForms/Form1/FirstForm";
import SecondForm from "../../components/Forms/ViewProductsForms/Form2/SecondForm";
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux/features/userSlice";

const {Text} = Typography;


const ViewProduct = () => {
    const [contentHeight, setContentHeight] = useState('calc(100vh-60px)');

    const [buyModal, setBuyModall] = useState(false);
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
    const imageBaseUrl = "../../assets/products/";


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
    useEffect(()=>
    {
        const token = sessionStorage.getItem('access');
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));

        }
        const value=parseInt(id);
        dispatch(getProductByID({id: value}));
    },[]);


    const handleClick = (e) => {
        e.stopPropagation();
    };
    const handleClickReply = (e) => {
        e.stopPropagation();
    };
    const handleFormReply = async (values, idKomentara) => {
        console.log("handle form reply " + JSON.stringify(values));

        try {
            console.log("values " + JSON.stringify(values));

            const answerData = {
                odgovor: values.replyComm,
            };
            console.log("questionData " + JSON.stringify(answerData) + " id " + idKomentara);
            const response = await dispatch(sendAnswer({id: idKomentara, answerData: answerData}));
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
    const handleBuyOpen = () => {
        console.log("otvori modal " + buyModal);
        setBuyModall(true);
        console.log("modal otvoren" + buyModal);
    };
    const handleBuyClose = () => {
        setBuyModall(false);
        setRefreshKey((prevKey) => prevKey + 1);

        console.log("modal otvoren" + buyModal);
    };

    return (
        <div style={{height: contentHeight}}>
            {oneProduct && (

                <div className={classes.container}>
                    <div className={classes.left}>
                        <div className={classes.productInfoContainer}>
                            <h1>
                                {oneProduct.naslov}
                            </h1>
                            <br/>
                        </div>

                        {oneProduct && <div className={classes.kontejner}>
                            <div className={classes.imageSliderContainer}>
                                <SimpleImageSlider
                                    width="35%"
                                    height={350}
                                    images={oneProduct.slikas.map((slika) => ({
                                        url: require("../../assets/products/" + slika.slikaProizvoda)
                                    }))}
                                    showNavs={true}
                                    showBullets
                                    navStyle={{
                                        arrowRight: {
                                            color: 'white', },
                                        arrowLeft: {
                                            color: 'white',
                                        }
                                    }}
                                />
                                <p className={classes.priceStil}>Price: {oneProduct.cijena}KM</p>


                            </div>
                        </div>}
                        {showInsertCommentar && oneProduct.zavrsenaPonuda === 0 && (
                            <div className={classes.productInfoContainer}>
                                <button onClick={handleBuyOpen} style={{width: "fit-content",height:'fit-content'}}>
                                    Buy
                                </button>
                                <br/>
                                <br/>

                            </div>
                        )}
                        <div>
                            <h1>All comments</h1>

                            <div>

                                <List>
                                    {oneProduct.komentars.length === 0 ? (
                                        <p style={{fontSize:'18px'}}>No comments currently.</p>
                                    ) : (
                                        oneProduct.komentars.map((komentar, index) => (
                                            <div style={{background: 'white'}}>
                                                <List.Item key={index}>

                                                    <List.Item.Meta
                                                        avatar={<Avatar src={require("../../assets/users/" + komentar.korisnik_komentar.avatar)} alt="Image" />}
                                                        title={
                                                            <Text>
                                                                <span >{komentar.korisnik_komentar.korisnickoIme}    </span>

                                                                <span style={{ fontStyle: 'italic',color:'#3d3c3c' }}>{new Date(komentar.datum).toLocaleString()}</span>
                                                            </Text>
                                                        } description={komentar.pitanje}

                                                    />

                                                </List.Item>
                                                {komentar.odgovor !== null &&
                                                    (
                                                        <p><strong
                                                            style={{color: 'green'}}>Answer:</strong> {komentar.odgovor}
                                                        </p>
                                                    )
                                                }
                                               {showInsertCommentar && komentar.odgovor === null && user.id===oneProduct.prodavac.id &&
                                                    (<div className={classes.sendReply}>
                                                            <FirstForm formRefReply={formRefReply}
                                                                       showErrorMessage={showErrorMessage}
                                                                       errorMessage={errorMessage}
                                                                       isDisabled={isDisabled}
                                                                       handleClickReply={handleClickReply}
                                                                       idKomentara={komentar.id}
                                                                       handleFormReply={handleFormReply}
                                                            />
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
                                <SecondForm formRef={formRef}
                                            handleFormSubmit={handleFormSubmit}
                                            showSuccesMessage={showSuccesMessage}
                                            succesMessage={succesMessage}
                                            showErrorMessage={showErrorMessage}
                                            errorMessage={errorMessage}
                                            isDisabled={isDisabled}
                                            handleClick={handleClick}
                                />

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
                            <Divider style={{background: '#efe9e7'}}/>
                            <p>
                                <strong style={{color: 'black'}}>Category:</strong> {oneProduct.kategorija.naziv}
                            </p>
                            <Divider style={{color: 'black', borderColor: '#efe9e7'}}
                                     orientation="left">Attribute</Divider>
                            {oneProduct.proizvodAtributs.map((attribute, index) => (
                                <li key={index}>
                                    {attribute.atribut.naziv === "Square footage"
                                        ? `${attribute.atribut.naziv}: ${attribute.vrijednost} km²`
                                        : `${attribute.atribut.naziv}: ${
                                            attribute.atribut.naziv === "Milage"
                                                ? `${attribute.vrijednost} km`
                                                : attribute.vrijednost
                                        }`}
                                </li>
                            ))}






                        </div>
                    </div>
                </div>
            )}
            {buyModal && <BuyProduct show={buyModal} onClose={handleBuyClose} product={oneProduct}/>}
        </div>
    );
};
export default ViewProduct;
