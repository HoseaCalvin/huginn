import { Outlet } from "react-router-dom";

import Navbar from "../components/Sidebar.jsx";

function MainLayout() {
    return(
        <>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default MainLayout;