import React, {useState} from 'react';
import {Layout} from 'antd';
import SearchComponent from "../components/Search/SearchComponent";
import { Pagination } from 'antd'
const { Footer, Sider, Content} = Layout;

const contentStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#108ee9',
};
const siderStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#3ba0e9',
};
const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#2b2b49',
};
const Login = () => {
    const [contentHeight, setContentHeight] = useState('calc(100vh - 116.2px)'); // Initial value
    return (
        <div style={{height: contentHeight}}>
            <SearchComponent/>
            <Layout style={{height: "100%"}}>
                <Sider style={siderStyle}>Sider</Sider>
                <Layout>
                    <Content style={contentStyle}>Content</Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    )
};
export default Login;