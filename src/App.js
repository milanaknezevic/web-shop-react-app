import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import PrivateRoutes from './utils/PrivateRoutes'
import Product from './pages/Product/Products'
import Header from "./components/Header/Header";
import React from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
    return (
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route element={<PrivateRoutes/>}>

                    <Route element={<Product/>} path="/products" exact/>
                </Route>
                <Route element={<Home/>} path="/"/>
                <Route element={<Login/>} path="/login" exact/>
                <Route element={<Register/>} path="/register" exact/>
            </Routes>


        </BrowserRouter>
    );
}

export default App;
