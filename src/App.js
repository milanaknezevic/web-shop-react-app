import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import PrivateRoutes from './utils/PrivateRoutes'
import Product from './pages/Product/Products'
import Header from "./components/Header/Header";
import React from "react";

function App() {
    return (
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route element={<PrivateRoutes/>}>

                    <Route element={<Product/>} path="/products" exact/>
                </Route>
                <Route element={<Home/>} path="/"/>
            </Routes>


        </BrowserRouter>
    );
}

export default App;
