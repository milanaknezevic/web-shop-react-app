import {Outlet, Navigate} from 'react-router-dom'
import {useEffect} from "react";

const PrivateRoutes = () => {
const token = sessionStorage.getItem('access');
    useEffect(()=>{
        console.log("token storage" + sessionStorage.getItem('access'));
        console.log("token " + token );
    },[])
    return (
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;