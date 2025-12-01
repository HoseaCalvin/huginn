import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/AuthContext.jsx";

import Sidebar from "../components/Sidebar.jsx";
import FooterBar from "../components/FooterBar.jsx";

function PrivateRoute() {
    const { isAuthenticated, loading } = useAuth();

    if(loading) {
        return (
            <div>

            </div>
        )
    }

    if(!isAuthenticated) {
        return(
            <Navigate to='/login'/>
        );
    }

    return (
        <div className="flex-col flex w-screen h-screen md:flex-row">
            <Sidebar/>
            <div className="flex-1"> 
                <Outlet/>
            </div>
            <FooterBar/>
        </div>
    );
}

export default PrivateRoute;