import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import PrivateRoutes from './utils/PrivateRoutes'
import Product from './pages/Product/Products'
import Header from "./components/Header/Header";
import React from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ActivationAccount from "./pages/ActivationAccount/ActivationAccount";
import MyProfile from "./pages/MyProfile/MyProfile";

function App() {
    return (
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route element={<PrivateRoutes/>}>


                </Route>
                <Route element={<MyProfile/>} path="/profile" exact/>
                <Route element={<Home/>} path="/"/>
                <Route element={<Login/>} path="/login" exact/>
                <Route element={<Register/>} path="/register" exact/>
                <Route element={<ActivationAccount/>} path="/activate" exact/>
            </Routes>


        </BrowserRouter>
    );
}

export default App;
