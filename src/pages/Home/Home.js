import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, Layout, Pagination} from 'antd';
import SearchComponent from "../../components/Search/SearchComponent";
import Products from "../Product/Products";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts, removeProduct, searchProducts} from "../../redux/features/productSlice";
import classes from './Home.module.css';
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux/features/userSlice";
import {getCategories, getCategory, removeCategory} from "../../redux/features/categorySlice";
import {SearchOutlined} from "@ant-design/icons";


const {Footer, Content} = Layout;


const Home = () => {
    const [choosedCategory, setChoosedCategpry] = useState(null);
    const [attributeValues, setAttributeValues] = useState({});
    const [current, setCurrent] = useState(1);
    const [location, setLocation] = useState("");
    const [priceTo, setPriceTo] = useState(0);
    const [priceFrom, setPriceFrom] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(current - 1);
    const [filterClicked, setFilterClicked] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Dodato stanje za praćenje učitavanja
    const [naslov, setNaslov] = useState("");
    const dispatch = useDispatch();
    const {oneCategory} = useSelector((state) => state.categories);
    const {products,oneProduct} = useSelector((state) => state.products);
    const [stanjeProizvoda, setStanjeProizvoda] = useState("");


    useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));
        }
        dispatch(getCategories({}));
    }, []);
    const handleSaveUpdate = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

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
        try {
            if(oneProduct !== null)
            {
                dispatch(removeProduct());
            }
            if (!filterClicked) {
                setIsLoading(true);
                dispatch(getAllProducts({pageNumber, pageSize, naslov}));
                setIsLoading(true);
            } else if (filterClicked) {
                const response = dispatch(searchProducts({
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    searchData: searchData
                }));
                if (response.error) {
                    setFilterClicked(false);
                } else {
                    if (!filterClicked) {
                        setFilterClicked(true);
                        setCurrent(1);
                        setPageNumber(0);
                    }
                }
            }
        } catch (error) {
            setIsLoading(true);
            console.error("Greška:", error);
        } finally {
            setIsLoading(false);
        }
    }, [pageSize, pageNumber, refreshKey, filterClicked, current, naslov]);

    const onChange = (newPage) => {
        setCurrent(newPage);
        setPageNumber(newPage - 1);
    };
    const onShowSizeChange = (current, pageSize) => {
        setPageSize(pageSize);
    };
    const onSearch = (value) => {
        setNaslov(value);
    };
    const handleCategorySelect = (selectedKeys) => {
        setChoosedCategpry(selectedKeys[0]);

    };


    const handleClearFilters = () => {
        console.log("Obrisi filter ");
        clearAllFilters();
    };
    const handleSelectStatus = (value) => {
        //used 1, a new 0
        setStanjeProizvoda(value);
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
            dispatch(getCategory({id: choosedCategory}));

        } else {
            dispatch(removeCategory());

        }

    }, [choosedCategory])

    const atributi = Object.values(attributeValues).map(attrData => {
        return {
            atribut: {
                id: attrData.id,
                naziv: attrData.name,
                tip: attrData.type
            },
            vrijednost: attrData.value
        };
    });


    let searchData = {
        naslov: naslov === "" ? null : naslov,
        imeKategorije: oneCategory && typeof choosedCategory === 'number' ? oneCategory.naziv : null,
        lokacija: location !== "" ? location : null,
        stanjeProizvoda: stanjeProizvoda !== "" ? (stanjeProizvoda === 1 ? true : false) : null,
        cijenaOd: priceFrom !== 0 ? priceFrom : null,
        cijenaDo: priceTo !== 0 ? priceTo : null,
        proizvodAtributi: atributi.length > 0 ? atributi : null
    };
    const handleSaveObrisi = () => {
        console.log("u obrisi proizvod sam home");
        setRefreshKey((prevKey) => prevKey + 1);
    };
    const clearAllFilters = () => {
        setStanjeProizvoda("");
        setChoosedCategpry(null);
        setLocation("");
        setPriceFrom(0);
        setPriceTo(0);
        setAttributeValues({});
        setCurrent(1);
        setPageNumber(0);
        setFilterClicked(false);
    };


    const handleFilterSearch = () => {
        console.log("On search ");
        console.log("searchData " + JSON.stringify(searchData));
        handleSaveUpdate();
        setFilterClicked(true);

    };

    return (
        <div className={classes.nesto}>
            <SearchComponent onSearch={onSearch}/>

            <div className={classes.container}>


                <div className={classes.left}>
                    <div className={classes.innerLeft}>
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
                                                        name: attribute.naziv,
                                                        type: attribute.tip,
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
                                                                 name: attribute.naziv,
                                                                 type: attribute.tip,
                                                                 value: value
                                                             },
                                                         }))}/>}
                                    </div>
                                ))}
                            </div>)
                        }
                        <div style={{textAlign: 'center',}}>
                            <Button onClick={handleFilterSearch} className={classes.dugme} type="primary"
                                    icon={<SearchOutlined/>}
                                    style={{whiteSpace: 'normal',marginBottom:'10px',marginTop:'5px'}}>Search</Button>
                        </div>
                        <div style={{textAlign: 'center',}}>
                            <Button className={classes.dugme} type="primary"
                                    onClick={handleClearFilters}>Clear</Button>
                        </div>
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
                                products && products.length === 0 ? (
                                    <p style={{
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}>No data.</p>
                                ) : (
                                    <Products products={products} handleSaveObrisi={handleSaveObrisi}/>
                                )
                            )}
                        </Content>

                        {products && products.totalElements && (
                            <Pagination style={{textAlign: "right", padding: '0.4rem'}}
                                        showSizeChanger
                                        onShowSizeChange={onShowSizeChange}
                                        onChange={onChange}
                                        current={current}
                                        total={products.totalElements}
                            />
                        )}
                        <Footer className={classes.footerStyle}>
                            <p className={classes.rightAlignedParagraph}> Email: <a
                                href="mailto:webshopip2@gmail.com">webshopip2@gmail.com</a></p>
                        </Footer>
                    </Layout>
                </Layout>
            </div>

        </div>
    )
};

export default Home;
