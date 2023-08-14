import React, {useEffect, useState} from 'react';
import {Layout, Pagination} from 'antd';
import SearchComponent from "../../components/Search/SearchComponent";
import Products from "../Product/Products";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../redux/features/productSlice";

const {Footer, Sider, Content} = Layout;


const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#2b2b49',
};

const Home = () => {
    const [contentHeight] = useState('calc(100vh - 116.2px)'); // Initial value

    const [current, setCurrent] = useState(1);
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const pageNumber = current - 1;
                const pageSize = 10;

                console.log("pageNumber: " + pageNumber);
                console.log("pageSize: " + pageSize);

                const response = await dispatch(getAllProducts({pageNumber, pageSize}));

                if (getAllProducts.fulfilled.match(response)) {
                    console.log("Akcija je uspešno završena:", response.payload);
                    console.log("response.payload.content  " + response.payload.content);
                    setProducts(response.payload.content);
                    products.forEach(product => {
                        console.log("gledaj:", product);

                    });

                } else {
                    console.log("Akcija nije uspešno završena:", response.error);
                }
            } catch (error) {
                console.error("Greška:", error);
            }
        };

        fetchData(); // Pozivamo asinhronu funkciju unutar useEffect-a

        return () => {
            // Cleanup funkcija (ako je potrebno)
        };
    }, [dispatch, current]);

    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };

    return (
        <div style={{minHeight: contentHeight}}>
            <SearchComponent/>
            <Layout style={{height: "100%"}}>
                <Sider breakpoint='lg' collapsedWidth='0' style={{
                    textAlign: 'center',
                    backgroundColor: ' #e6e6e6', width: '500px !important'
                }}>
                    <SidebarComponent/>

                </Sider>
                <Layout>
                    <Content>
                        <Products products={products}/>
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
