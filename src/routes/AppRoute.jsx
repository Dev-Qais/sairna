import {  Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/home/HomePage";
function AppRoute() {
    return (
        
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    {/* <Route path="/profile" element={}/> */}
                </Route>
            </Routes>
        
    );
}

export default AppRoute;