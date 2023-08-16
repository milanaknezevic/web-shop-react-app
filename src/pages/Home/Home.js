import React, {useEffect, useState} from 'react';
import {Layout, Pagination} from 'antd';
import SearchComponent from "../../components/Search/SearchComponent";
import Products from "../Product/Products";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import {useDispatch} from "react-redux";
import {getAllProducts} from "../../redux/features/productSlice";
import classes from './Home.module.css';
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux/features/userSlice";

const {Footer, Sider, Content} = Layout;

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#2b2b49',
};

const Home = () => {
    const [current, setCurrent] = useState(1);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Dodato stanje za praćenje učitavanja
    const [naslov, setNaslov] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));
            //treba dodati i proizvode itd

        }
    }, []);


    useEffect(() => {
        const resizeHandler = () => {
            const nesto = document.querySelector(`.${classes.nesto}`);
            const container = document.querySelector(`.${classes.container}`);

            const windowHeight = window.innerHeight;
           const headerElement = document.querySelector('.Header_nav__73kXe');
            if (headerElement) {
                const headerHeight = headerElement.offsetHeight;
               const searchElement = document.querySelector('.Search_center__EZYl7');
                if (searchElement) {
                    const searchHeight = searchElement.offsetHeight;
                    nesto.style.minHeight = `${windowHeight - headerHeight}px`;
                    container.style.minHeight = `${windowHeight - headerHeight - searchHeight}px`;
                }
            }
        };
        resizeHandler(); // Postavi visinu kontejnera na početku
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);
    useEffect(() => {

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const pageNumber = current - 1;
                const pageSize = 10;
                const response = await dispatch(getAllProducts({pageNumber, pageSize, naslov}));
                if (getAllProducts.fulfilled.match(response)) {
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

        fetchData();

        return () => {
            // Cleanup funkcija (ako je potrebno)
        };
    }, [dispatch, current, naslov]);

    const onChange = (page) => {
        setCurrent(page);
    };
    const onSearch = (value) => {
        setNaslov(value);
    };

    return (
        <div className={classes.nesto}>
            <SearchComponent onSearch={onSearch}/>

            <div className={classes.container}>


                <div className={classes.left}>
                    <SidebarComponent></SidebarComponent>
                </div>
                <Layout>
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
                                    <Products products={products}/>
                                )
                            )}
                        </Content>
                        <Pagination style={{textAlign: "right", padding: '0.4rem'}} current={current}
                                    onChange={onChange}
                                    total={50}/>
                        <Footer style={footerStyle}>Footer</Footer>
                    </Layout>
                </Layout>
            </div>

        </div>
    )
};

export default Home;
