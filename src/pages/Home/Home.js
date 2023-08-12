import React, {useState} from 'react';
import {Button, InputNumber, Layout} from 'antd';
import SearchComponent from "../../components/Search/SearchComponent";
import Products from "../Product/Products";
import CategoryTree from "../../components/CategoryTree/CategoryTree";
import SelectComponent from "../../components/Select/Select";
import { SearchOutlined } from '@ant-design/icons';
import SidebarComponent from "../../components/Select/SidebarComponent";
import Header from "../../components/Header/Header";

const {Footer, Sider, Content} = Layout;

const contentStyle = {
    textAlign: 'center'
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#2b2b49',
};

const Home = () => {
    const [contentHeight, setContentHeight] = useState('calc(100vh - 116.2px)'); // Initial value


    return (
        <div style={{minHeight: contentHeight}}>
            <SearchComponent/>
            <Layout style={{height: "100%"}}>
                <Sider breakpoint='lg' collapsedWidth='0' style={{textAlign: 'center',
                    backgroundColor: ' #e6e6e6',width: '500px !important'}}>
                    <SidebarComponent/>

                </Sider>
                <Layout>
                    <Content>
                        <Products/>
                    </Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    )
};

export default Home;
