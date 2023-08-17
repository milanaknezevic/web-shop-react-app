import React, {useEffect, useState} from 'react';
import classes from './MyProfile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {FaBoxOpen, FaEdit, FaKey, FaShoppingCart} from "react-icons/fa";
import {Layout, Pagination} from "antd";
import Select from "../../components/Select/Select";
import {getAllProductsForBuyer, getAllProductsForSeller} from '../../redux/features/productSlice';
import {useNavigate} from "react-router-dom";
import Products from "../Product/Products";
import {Content} from "antd/es/layout/layout";
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux/features/userSlice";
import EditProfile from "../EditProfile/EditProfile";
import ChangePassword from "../ChangePassword/ChangePassword";

const MyProfile = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [changePasswordModal, setChangePasswordModall] = useState(false);
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userImage = require('../../assets/fdaab290-208f-4412-a512-0291bccecead_IMG_0652.JPG');
    const [isLoading, setIsLoading] = useState(true); // Dodato stanje za praćenje učitavanja


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
        console.log("user " + user + "user.ime " + user.ime + " user slika " + user.avatar);
        console.log("user " + JSON.stringify(user));

        if (authenticated === false)
            navigate('/');
    }, [authenticated, navigate]);

    useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));
            const pageNumber = current - 1;
            const pageSize = 10;
            dispatch(getAllProductsForSeller({pageNumber, pageSize, finished}));

        }
    }, []);


    const onChange = (page) => {
        setCurrent(page);
    };
    const onChangeValue = (value) => {
        setFinished(value);
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
            setIsLoading(true);
            const pageNumber = current - 1;
            const pageSize = 10;
            const response = await dispatch2(getAllProductsForBuyer({pageNumber, pageSize}));
            if (getAllProductsForBuyer.fulfilled.match(response)) {
                setProducts(response.payload.content);

            } else {
                setIsLoading(true);
            }

        } catch (error) {
            setIsLoading(true);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchData1 = async () => {
        try {
            setIsLoading(true);
            const pageNumber = current - 1;
            const pageSize = 10;
            const response = await dispatch1(getAllProductsForSeller({pageNumber, pageSize, finished}));
            setProducts(response.payload.content);
            if (getAllProductsForSeller.fulfilled.match(response)) {
                setProducts(response.payload.content);
            } else {
                setIsLoading(true);
            }

        } catch (error) {
            setIsLoading(true);
            console.error("Greška:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData2();
    }, [dispatch2]);
    useEffect(() => {
        fetchData1();
    }, [current, finished, dispatch1,refreshKey]);

    useEffect(() => {
        setAuth(authenticated);
    }, [authenticated, auth, user]);
    useEffect(() => {
        const resizeHandler = () => {
            const container = document.querySelector(`.${classes.container}`);
            const windowHeight = window.innerHeight;
            const headerElement = document.querySelector('.Header_nav__73kXe');
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
    const handleEditProfileOpen = () => {
        setEditProfileModal(true);
    };
    const handleSaveObrisi = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };
    const handleEditProfileClose = () => {
        setEditProfileModal(false);
    };
    const handleChangePasswordOpen = () => {
        setChangePasswordModall(true);
    };
    const handleChangePasswordClose = () => {
        setChangePasswordModall(false);
    };

    return (<div className={classes.container}>
        <div className={classes.left}>
            {user ? (
                <div className={classes.zaLijevo}>
                    <div className={classes.userImageContainer}>
                        <img className={classes.userImage} src={userImage} alt="User"/>
                    </div>
                    <p className={classes.ime}>{user.ime} {user.prezime}</p>
                    <div className={classes.buttonContainer}>
                        <button className={classes.editDugme} onClick={handleEditProfileOpen}>
                            <FaEdit style={{marginRight: '5px'}}/>
                            Edit Profile
                        </button>
                        <button className={classes.editDugme} onClick={handleChangePasswordOpen}>

                            <FaKey style={{marginRight: '5px'}}/> Change password
                        </button>
                    </div>
                </div>


            ) : null}

        </div>
        <Layout>
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
            {editProfileModal && <EditProfile show={editProfileModal} onClose={handleEditProfileClose}/>}
            {changePasswordModal && <ChangePassword show={changePasswordModal} onClose={handleChangePasswordClose}/>}

            <Layout>
                <Content>
                    {isLoading ? (
                        <p style={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>Loading...</p>
                    ) : (
                        products.length === 0 ? (
                            <p style={{
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}>No data.</p>
                        ) : (
                            <Products products={products} onSave={handleSaveObrisi}/>
                        )
                    )}
                </Content>
                <Pagination style={{textAlign: "right", padding: '0.4rem'}} current={current}
                            onChange={onChange}
                            total={50}/>

            </Layout>
        </Layout>
    </div>);
};

export default MyProfile;
