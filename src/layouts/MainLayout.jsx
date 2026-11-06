import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer"
import AnnouncementBar from "../components/shared/AnnouncementBar";
import { Outlet } from "react-router-dom";
function MainLayout() {
    return ( 
        <>
            <AnnouncementBar/>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
     );
}

export default MainLayout;