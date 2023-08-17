import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {logout} from './redux/features/userSlice';
import PrivateRoutes from './utils/PrivateRoutes';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ActivationAccount from './pages/ActivationAccount/ActivationAccount';
import MyProfile from './pages/MyProfile/MyProfile';
import NotFound from './pages/NotFound/NotFound';
import ViewProduct from "./pages/ViewProduct/ViewProduct";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            const token = sessionStorage.getItem('access');
            if (!token) {
                clearInterval(interval);
                dispatch(logout());
            } else {
                try {
                    const decodedToken = jwtDecode(token);
                    if (decodedToken.exp * 1000 < Date.now()) {
                        clearInterval(interval);
                        dispatch(logout());
                    }
                } catch (error) {
                    clearInterval(interval);
                    dispatch(logout());
                }
            }
        }, 1000 * 60);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route path="/profile" element={<MyProfile/>}/>
                </Route>
                <Route path="/:id" element={<ViewProduct/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/activate" element={<ActivationAccount/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
