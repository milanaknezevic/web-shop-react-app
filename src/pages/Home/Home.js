import React, {useEffect, useState} from 'react';
import {Layout, Pagination} from 'antd';
import SearchComponent from "../../components/Search/SearchComponent";
import Products from "../Product/Products";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import {useDispatch} from "react-redux";
import {getAllProducts} from "../../redux/features/productSlice";

const {Footer, Sider, Content} = Layout;

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#2b2b49',
};

const Home = () => {

    const [contentHeight, setContentHeight] = useState(0); // Inicijalno postavljeno na 0
    const [sideHeight, setSideHeight] = useState(0); // Inicijalno postavljeno na 0
    const [current, setCurrent] = useState(1);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Dodato stanje za praćenje učitavanja
    const [naslov, setNaslov] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const headerElement = document.querySelector('.Header_nav__73kXe');
        console.log(headerElement);
        const windowHeight = window.innerHeight;
        console.log("windowHeight " + windowHeight);
        if (headerElement) {
            const headerHeight = headerElement.offsetHeight;
            const calculatedContentHeight = windowHeight - headerHeight;
            console.log("elementHeight " + headerHeight);
            setContentHeight(calculatedContentHeight);
            console.log("content height " + contentHeight);
            const searchElement = document.querySelector('.Search_center__EZYl7');
            if (searchElement) {
                const searchHeight = searchElement.offsetHeight;
                const calculatedSearchHeight = windowHeight - searchHeight - headerHeight;
                console.log("searchHeight " + searchHeight);
                setSideHeight(calculatedSearchHeight);
                console.log("calculatedSearchHeight " + calculatedSearchHeight);
                console.log("sideHeight" + sideHeight);
            } else {
                console.log("Element 'search' nije pronađen.");
            }
        } else {
            console.log("Element 'myElement' nije pronađen.");
        }
    }, [contentHeight, sideHeight,current]);
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
                    console.log("Akcija nije uspešno završena:", response.error);
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
        console.log("naslov " + value);
        setNaslov(value);
    };

    return (
        <div style={{minHeight: contentHeight,backgroundColor:'red'}}>
            <SearchComponent onSearch={onSearch}/>
            <Layout style={{ minHeight: sideHeight}}>
                <Sider breakpoint='lg' collapsedWidth='0' style={{
                    textAlign: 'center',
                    backgroundColor: ' #e6e6e6',
                    width: '500px !important',


                }}>
                    <SidebarComponent/>
                </Sider>
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
                    <Pagination style={{textAlign: "right", padding: '0.4rem'}} current={current} onChange={onChange}
                                total={50}/>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    )
};

export default Home;
