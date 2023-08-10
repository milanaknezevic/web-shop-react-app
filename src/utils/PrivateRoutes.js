import {Outlet, Navigate} from 'react-router-dom'

const token = sessionStorage.getItem('access');
const PrivateRoutes = () => {
    //kad s eloginuje poslati token

    return (
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes