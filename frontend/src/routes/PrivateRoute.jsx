import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/AuthContext.jsx";

import Sidebar from "../components/Sidebar.jsx";

function PrivateRoute() {
    const { isAuthenticated, loading } = useAuth();

    if(loading) {
        return (
            <div>

            </div>
        )
    }

    if(!isAuthenticated) {
        return <Navigate to='/login'/>;
    }

    return (
        <div className="flex-col md:flex-row flex w-screen h-screen">
            <Sidebar/>
            <div className="flex-1"> 
                <Outlet/>
            </div>
        </div>
    );
}

export default PrivateRoute;