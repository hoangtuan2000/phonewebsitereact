import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux'

function ProtectRoutes() {
    const userLogin = useSelector((state) => state.userLogin.infoUser)
    if(Object.entries(userLogin).length !== 0){
        return <Outlet /> 
    }else{
        return <Navigate to='/' />
    }
}

export default ProtectRoutes