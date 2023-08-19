import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, Layout, Pagination} from 'antd';
import SearchComponent from "../../components/Search/SearchComponent";
import Products from "../Product/Products";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../redux/features/productSlice";
import classes from './Home.module.css';
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux/features/userSlice";
import {getCategories, getCategory, removeCategory} from "../../redux/features/categorySlice";
import {SearchOutlined} from "@ant-design/icons";

const {Footer, Content} = Layout;


const Home = () => {
    const [choosedCategory, setChoosedCategpry] = useState(null);
    const [attributeValues, setAttributeValues] = useState({});
    const [location, setLocation] = useState("");
    const [priceTo, setPriceTo] = useState(0);
    const [priceFrom, setPriceFrom] = useState(0);
    const [current, setCurrent] = useState(1);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Dodato stanje za praćenje učitavanja
    const [naslov, setNaslov] = useState("");
    const dispatch = useDispatch();
    const {oneCategory} = useSelector((state) => state.categories);

    useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));
            //treba dodati i proizvode itd

        }
        dispatch(getCategories({}));
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
    const handleCategorySelect = (selectedKeys) => {
        console.log("selected keys " + selectedKeys)
        setChoosedCategpry(selectedKeys[0]);
        console.log("selected keys " + selectedKeys[0])
    };
    const handleSelectStatus = (value) => {
        //used 1, a new 0
        console.log("status " + value)
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handlePriceFromChange = (value) => {
        setPriceFrom(value);
    };

    const handlePriceToChange = (value) => {
        setPriceTo(value);
    };
    useEffect(() => {
        if (typeof choosedCategory === 'number') {
            console.log(" choosedCategory  je number " + choosedCategory);
            dispatch(getCategory({id: choosedCategory}));

        } else {
            console.log(" choosedCategory  nije number " + choosedCategory);
            dispatch(removeCategory());

        }

    }, [choosedCategory])
    const handleAttributeChange = (attributeId, value) => {
        setAttributeValues(prevValues => ({
            ...prevValues,
            [attributeId]: value,
        }));
    };


    return (
        <div className={classes.nesto}>
            <SearchComponent onSearch={onSearch}/>

            <div className={classes.container}>


                <div className={classes.left}>
                    <SidebarComponent onSelect={handleCategorySelect}
                                      setSelectedCategoryTemp={setChoosedCategpry}
                                      handleSelect={handleSelectStatus} location={location}
                                      handleLocationChange={handleLocationChange}
                                      priceTo={priceTo} priceFrom={priceFrom}
                                      handlePriceFromChange={handlePriceFromChange}
                                      handlePriceToChange={handlePriceToChange}
                    ></SidebarComponent>
                    {choosedCategory && (
                        <div style={{textAlign: 'left', marginLeft: '5px'}}>

                            <div style={{textAlign: 'left', marginBottom: '15px'}}>
                                <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Specific
                                    attributes</label>
                            </div>
                            {oneCategory != null && oneCategory.atribut.map((attribute) => (
                                <div style={{textAlign: 'left', marginBottom: '15px'}}>
                                   <label style={{color: 'black', fontSize: '16px'}}>{attribute.naziv}</label>
                                    <br/>
                                    {attribute.tip === 'STRING' &&
                                        <Input value={attributeValues[attribute.id]?.value || null} onChange={(e) => {
                                            const newValue = e.target.value;
                                            setAttributeValues(prevValues => ({
                                                ...prevValues,
                                                [attribute.id]: {
                                                    id: attribute.id,
                                                    name: attribute.name,
                                                    type: attribute.type,
                                                    value: newValue
                                                },
                                            }));
                                        }}/>}
                                    {(attribute.tip === 'INT' || attribute.tip === 'DOUBLE') &&
                                        <InputNumber value={attributeValues[attribute.id]?.value || 0} min={0}
                                                     onChange={(value) => setAttributeValues(prevValues => ({
                                                         ...prevValues,
                                                         [attribute.id]: {
                                                             id: attribute.id,
                                                             name: attribute.name,
                                                             type: attribute.type,
                                                             value: value
                                                         },
                                                     }))}/>}
                                </div>
                            ))}
                        </div>)
                    }
                    <div style={{textAlign: 'center', padding: '1rem'}}>
                        <Button className={classes.dugme} type="primary" icon={<SearchOutlined/>}
                                style={{whiteSpace: 'normal'}}>Search</Button>
                    </div>
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
                        <Footer className={classes.footerStyle}>
                            <p className={classes.rightAlignedParagraph}> Email: <a
                                href="mailto:kontakt@example.com">kontakt@example.com</a></p>
                        </Footer>
                    </Layout>
                </Layout>
            </div>

        </div>
    )
};

export default Home;
