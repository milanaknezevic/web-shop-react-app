import React, {useEffect, useState} from 'react';
import classes from './MyProfile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {FaBoxOpen, FaEdit, FaKey, FaShoppingCart} from "react-icons/fa";
import {Layout, Pagination} from "antd";
import Select from "../../components/Select/Select";
import {getAllProductsForBuyer, getAllProductsForSeller, removeProduct} from '../../redux/features/productSlice';
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
    const {user} = useSelector((state) => state.users);
    const [underlineColorProducts, setUnderlineColorProducts] = useState('blue');
    const [underlineColorPurchase, setUnderlineColorPurchase] = useState('gray');
    const [showSelect, setShowSelect] = useState(true);
    const {products, oneProduct} = useSelector((state) => state.products);
    const [dugmeProducts, setDugmeProducts] = useState(true);
    const [dugmePurchase, setDugmePurchase] = useState(false);
    const [finished, setFinished] = useState(0);
    const [current, setCurrent] = useState(1);
    const dispatch1 = useDispatch();
    const dispatch2 = useDispatch();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(current - 1);
    const [fetch1, setFetch1] = useState(false);
    const [fetch2, setFetch2] = useState(false);
    const options = [
        {
            value: '0',
            label: 'Active',
        },
        {
            value: '1',
            label: 'Finished',
        },
    ];


    useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));
            dispatch(getAllProductsForSeller({pageNumber, pageSize, finished}));

        }
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


    const fetchData2 = () => {
        try {
            setIsLoading(true);
            console.log("uzmi my purchase ");
            dispatch2(getAllProductsForBuyer({pageNumber, pageSize}));

        } catch (error) {
            setIsLoading(true);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if(oneProduct !== null)
        {
            dispatch(removeProduct());
        }
        if (fetch1 && !fetch2) {
            fetchData2();
            setFetch1(false);
            setFetch2(true);

        }

    }, [dispatch2]);
    useEffect(() => {
        if(oneProduct !== null)
        {
            dispatch(removeProduct());
        }
        if (!fetch1 && !fetch2) {

            fetchData1();
            setFetch1(true);
            setFetch2(false);
        } else if (!fetch1 && fetch2) {

            fetchData2();
            setFetch1(false);
            setFetch2(true);
        }else if (fetch1 && !fetch2) {

            fetchData1();
            setFetch1(true);
            setFetch2(false);
        }
    }, [current, finished, dispatch1, refreshKey]);
    const fetchData1 = () => {
        try {
            setIsLoading(true);
            console.log("uzmi my products finished " + finished);
            dispatch1(getAllProductsForSeller({pageNumber, pageSize, finished}));

        } catch (error) {
            setIsLoading(true);
            console.error("Greška:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onShowSizeChange = (current, pageSize) => {
        setPageSize(pageSize);
    };
    const onChangePag = (newPage) => {
        setCurrent(newPage);
        setPageNumber(newPage - 1);
    };


    const handleEditProfileOpen = () => {
        setEditProfileModal(true);
    };
    const handleSaveObrisi = () => {
        console.log("u obrisi proizvod sam ");
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
                        <img className={classes.userImage}
                             src={user.avatar !== null ? require("../../assets/users/" + user.avatar) : require("../../assets/defaultUserImage.png")}
                             alt="User"/>
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
                    <FaBoxOpen style={{marginRight: '5px', fontSize: '20'}}/>
                    My Products
                </button>

                <button style={{textDecorationColor: underlineColorPurchase, fontSize: '20'}}
                        className={classes.kupovineDugme} onClick={myPurchaseHandle}>
                    <FaShoppingCart style={{marginRight: '5px', fontSize: '20'}}/>
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
                            <Products products={products} handleSaveObrisi={handleSaveObrisi}/>
                        )
                    )}
                </Content>
                <Pagination style={{textAlign: "right", padding: '0.4rem'}}
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                            onChange={onChangePag}
                            current={current}
                            total={products.totalElements}
                />

            </Layout>
        </Layout>
    </div>);
};

export default MyProfile;
