import React, {useEffect, useState} from 'react';
import classes from './MyProfile.module.css';
import userImage from "../../assets/fdaab290-208f-4412-a512-0291bccecead_IMG_0652.JPG";
import {useDispatch, useSelector} from "react-redux";
import {FaBoxOpen, FaEdit, FaShoppingCart} from "react-icons/fa";
import {Pagination} from "antd";
import Select from "../../components/Select/Select";
import {getAllProductsForSeller,getAllProductsForBuyer} from '../../redux/features/productSlice';
import {useNavigate} from "react-router-dom";
import Products from "../Product/Products";
import {Content} from "antd/es/layout/layout";

const MyProfile = () => {
    const {authenticated, user} = useSelector((state) => state.users);
    const [auth, setAuth] = useState(false);
    const [underlineColorProducts, setUnderlineColorProducts] = useState('blue');
    const [underlineColorPurchase, setUnderlineColorPurchase] = useState('gray');
    const [showSelect, setShowSelect] = useState(true);
    const [products, setProducts] = useState([]);
    const [dugmeProducts, setDugmeProducts] = useState(true);
    const [dugmePurchase, setDugmePurchase] = useState(false);
    const [finished, setFinished] = useState(3);
    const [current, setCurrent] = useState(1);
    const dispatch1 = useDispatch();
    const dispatch2 = useDispatch();
    const navigate = useNavigate();

    const options = [
        {
            value: '0',
            label: 'Active',
        },
        {
            value: '1',
            label: 'Finished',
        },
        {
            value: '3',
            label: 'All',
        },
    ];

    useEffect(() => {
       // console.log("autentifikacija " + authenticated);
        if (authenticated === false)
            navigate('/');
    }, [authenticated, navigate]);


    const onChange = (page) => {
        setCurrent(page);
    };
    const onChangeValue = (value) => {
        setFinished(value);
       // console.log(" ovo je on change " + `selected ${value}`);
    };
    const myPurchaseHandle = () => {
        setUnderlineColorProducts('gray');
        setUnderlineColorPurchase('blue');
        setShowSelect(false);
        setDugmeProducts(false);
        setDugmePurchase(true);
        fetchData2();
    };
    const myProductsHandle = () => {
        setUnderlineColorProducts('blue');
        setUnderlineColorPurchase('gray');
        setShowSelect(true);
        setDugmeProducts(true);
        setDugmePurchase(false);
        fetchData1();
    };


    const fetchData2 = async () => {
        try {
            console.log("dugmeProducts:", dugmeProducts);
            console.log("dugmePurchase:", dugmePurchase);
            const pageNumber = current - 1;
            const pageSize = 10;

            console.log("pageNumber " + pageNumber + " pageSIze " + pageSize + " finished " + finished);
            console.log("Usla u if:");
            const response = await dispatch2(getAllProductsForBuyer({pageNumber, pageSize}));
            // console.log(JSON.stringify(response))

            if (getAllProductsForBuyer.fulfilled.match(response)) {
                setProducts(response.payload.content);
            } else {

                console.log("Akcija nije uspešno završena:", response.error);
            }

        } catch (error) {

            console.error("Greška:", error);
        } finally {

        }
    };
    const fetchData1 = async () => {
        try {
            console.log("dugmeProducts:", dugmeProducts);
            console.log("dugmePurchase:", dugmePurchase);
            const pageNumber = current - 1;
            const pageSize = 10;
            console.log("pageNumber " + pageNumber + " pageSIze " + pageSize + " finished " + finished);
             console.log("Usla u if:");
                const response = await dispatch1(getAllProductsForSeller({pageNumber, pageSize, finished}));
                // console.log(JSON.stringify(response))

                if (getAllProductsForSeller.fulfilled.match(response)) {
                    setProducts(response.payload.content);
                } else {

                    console.log("Akcija nije uspešno završena:", response.error);
                }

        } catch (error) {

            console.error("Greška:", error);
        } finally {

        }
    };
    useEffect(() => {
        fetchData2();
    }, [dispatch2]);
    useEffect(() => {
        fetchData1();
    }, [current, finished, dispatch1]);

    useEffect(() => {
        setAuth(authenticated);
       /* console.log("authenticated " + authenticated);
        console.log("auth " + auth);
        console.log("user " + user);*/
    }, [authenticated, auth, user]);
    useEffect(() => {
        const resizeHandler = () => {
            const container = document.querySelector(`.${classes.container}`);
            const windowHeight = window.innerHeight;
            const headerElement = document.querySelector('.Header_nav__73kXe');
           /* console.log(headerElement);

            console.log("windowHeight " + windowHeight);*/
            if (headerElement) {
                const headerHeight = headerElement.offsetHeight;
                container.style.minHeight = `${windowHeight - headerHeight}px`;
            }
        };
        resizeHandler(); // Postavi visinu kontejnera na početku
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (<div className={classes.container}>
        <div className={classes.left}>


            {user ? (
                <div className={classes.zaLijevo}>
                    <div className={classes.userImageContainer}>
                        <img className={classes.userImage} src={userImage} alt="User"/>
                    </div>
                    <p className={classes.ime}>{user.ime} {user.prezime}</p>
                    <button className={classes.editDugme}>
                        <FaEdit style={{marginRight: '5px'}}/>
                        Edit Profile
                    </button>
                </div>


            ) : null}

        </div>
        <div className={classes.right}>
            <div className={classes.zaKupovine}>
                <button style={{textDecorationColor: underlineColorProducts, fontSize: '20'}}
                        className={classes.kupovineDugme} onClick={myProductsHandle}>
                    <FaBoxOpen style={{marginRight: '5px', fontSize: '20'}}/> {/* Ikonica proizvoda */}
                    My Products
                </button>

                <button style={{textDecorationColor: underlineColorPurchase, fontSize: '20'}}
                        className={classes.kupovineDugme} onClick={myPurchaseHandle}>
                    <FaShoppingCart style={{marginRight: '5px', fontSize: '20'}}/> {/* Ikonica korpe */}
                    My Purchase
                </button>
            </div>
            {showSelect ? <Select onChangeValue={onChangeValue} options={options} finished={finished}/> : null}
            <Content>
                {
                    products.length === 0 ? (
                        <p style={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>No data.</p>
                    ) : (
                        <Products products={products}/>
                    )
                }
            </Content>
            <Pagination className={classes.paginacija} current={current} onChange={onChange}
                        total={50}/>
        </div>
    </div>);
};

export default MyProfile;
